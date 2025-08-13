import type { IOrder, TOrderStatus, IQuery, IUserToken } from 'mhz-contracts';

import Order from '../models/order.js';
import Customer from '../models/customer.js';

import { decodeToken, paginate } from '../helpers/index.js';
import { IBaseService } from '../interface/index.js';

export const orderService: IBaseService = {
  getMany: async <T>(query?: IQuery, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = user?.role === 'customer' ? { customer: user._id } : {};

    const { data, total } = await paginate(Order, {
      ...query,
      ...filter,
      populate: [{ path: 'customer', select: 'firstName lastName email' }],
      select: '-products',
    });

    return { data: data as T[], total };
  },

  getOne: async <T>(_id: string, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const order: IOrder | null = await Order.findOne({ _id })
      .populate([
        { path: 'customer', select: 'firstName lastName email' },
        {
          path: 'products.product',
          select: 'title price thumbUrls category',
          populate: { path: 'category', select: 'title' },
        },
      ])
      .lean()
      .exec();

    const isOrderNotBelongToCustomer = user?.role === 'customer' && order?.customer?._id?.toString() !== user?._id;

    return { data: order as T, isOrderNotBelongToCustomer };
  },

  update: async <T>(
    _itemToUpdate?: T,
    _id?: string,
    decode?: (token: string) => IUserToken | null,
    token?: string,
    status?: TOrderStatus
  ) => {
    const user = decodeToken(decode, token);

    const order = await Order.findOne({ _id }).exec();

    const isOrderNotBelongToCustomer =
      user?.role === 'customer' && order?.customer?._id?.toString() !== user?._id && status !== 'cancelled';

    const isPayError = order?.status === 'paid' && status === 'paid';

    if (!isOrderNotBelongToCustomer || !isPayError) {
      await Order.updateOne({ _id }, { status, dateUpdated: new Date() });
      await order?.save();
    }

    return isPayError || isOrderNotBelongToCustomer;
  },

  create: async <T>(_itemToCreate?: T, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer = await Customer.findOne({ _id: user?._id })
      .populate([{ path: 'cart.product', select: 'price' }])
      .exec();

    if (!customer) return;

    const order = new Order({
      products: customer.cart,
      customer: { _id: customer._id },
      price: customer.cart?.reduce((acc, item) => acc + item.count * item.product.price, 0),
    });

    const newOrder = await order.save();

    const id = newOrder._id.toString();

    customer.cart = [];
    customer.orders?.push(order);

    await customer.save();

    return id;
  },

  delete: async (_id?: string) => {
    const order = await Order.findOne({ _id });

    await order?.deleteOne();
  },
};
