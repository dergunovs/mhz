import type { IOrder, TOrderStatus, IQuery, IUserToken, IBaseService } from 'mhz-contracts';

import Order from '../models/order.js';
import Customer from '../models/customer.js';

import { decodeToken, paginate } from '../helpers/index.js';

export const orderService: IBaseService = {
  getMany: async (query: IQuery, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = user?.role === 'customer' ? { customer: user._id } : {};

    const { data, total } = await paginate(Order, {
      ...query,
      ...filter,
      populate: [{ path: 'customer', select: 'firstName lastName' }],
      select: '-products',
    });

    return { data, total };
  },

  getOne: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const order: IOrder | null = await Order.findOne({ _id })
      .populate([
        { path: 'customer', select: 'firstName lastName' },
        { path: 'products.product', select: '_id title' },
      ])
      .lean()
      .exec();

    const isOrderNotBelongToCustomer = user?.role === 'customer' && order?.customer?._id?.toString() !== user?._id;

    return { order, isOrderNotBelongToCustomer };
  },

  update: async (_id: string, status: TOrderStatus, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const order = await Order.findOne({ _id }).exec();

    const isOrderNotBelongToCustomer =
      user?.role === 'customer' && order?.customer?._id?.toString() !== user?._id && status !== 'cancelled';

    const isAlreadyPaid = order?.status === 'paid' && status === 'paid';

    if (!isOrderNotBelongToCustomer || !isAlreadyPaid) {
      await Order.updateOne({ _id }, { status, dateUpdated: new Date() });
      await order?.save();
    }

    return { isOrderNotBelongToCustomer, isAlreadyPaid };
  },

  create: async (decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer = await Customer.findOne({ _id: user?._id })
      .populate([{ path: 'cart.product', select: '_id price' }])
      .exec();

    const isCustomerExists = !!customer;

    if (!isCustomerExists) {
      return { id: '', isCustomerExists: false };
    }

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

    return { id, isCustomerExists: true };
  },

  delete: async (_id: string) => {
    const order = await Order.findOne({ _id });

    await order?.deleteOne();
  },
};
