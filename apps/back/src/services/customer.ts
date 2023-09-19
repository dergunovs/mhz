import bcrypt from 'bcryptjs';
import type { ICartItem, ICustomer, ICustomerService, IProduct, IQuery, IUserToken } from 'mhz-contracts';

import Customer from '../models/customer.js';
import Product from '../models/product.js';

import { decodeToken, paginate } from '../helpers/index.js';

export const customerService: ICustomerService = {
  getMany: async <T>(query?: IQuery) => {
    const { data, total } = await paginate(Customer, {
      ...query,
      select: 'dateCreated dateUpdated email firstName lastName',
    });

    return { data: data as T[], total };
  },

  getOne: async <T>(_id: string) => {
    const customer: ICustomer | null = await Customer.findOne({ _id })
      .populate([
        { path: 'cart.product', select: '_id title' },
        { path: 'favouriteProducts', select: '_id title' },
        { path: 'watchedProducts.product', select: '_id title' },
      ])
      .select('-password -orders')
      .lean()
      .exec();

    return { data: customer as T };
  },

  getCurrent: async (decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer: ICustomer | null = await Customer.findOne({ _id: user?._id })
      .populate([
        { path: 'favouriteProducts', select: '_id title' },
        { path: 'watchedProducts.product', select: '_id title' },
      ])
      .select('-password -orders -cart')
      .lean()
      .exec();

    return customer;
  },

  getCart: async (decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer = await Customer.findOne({ _id: user?._id })
      .lean()
      .exec();

    const productIds = customer?.cart?.map((item) => item.product._id);

    const products: IProduct[] = await Product.find({ _id: { $in: productIds } })
      .select('thumbUrls title price category')
      .populate({ path: 'category', select: '_id title' })
      .lean()
      .exec();

    const cart: ICartItem[] = products.map((product) => {
      return {
        _id: `${product._id}`,
        product,
        count: customer?.cart?.find((item) => item.product._id?.toString() === product._id?.toString())?.count || 0,
      };
    });

    return cart;
  },

  getWatchedProducts: async (decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer = await Customer.findOne({ _id: user?._id })
      .lean()
      .exec();

    const customerProducts = customer?.watchedProducts
      ?.sort((a, b) => Number(b.dateCreated) - Number(a.dateCreated))
      .map((item) => item.product._id);

    const products: IProduct[] = await Product.aggregate([
      { $match: { _id: { $in: customerProducts } } },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          thumbUrls: 1,
          title: 1,
          price: 1,
          category: { _id: '$category._id' },
          index: { $indexOfArray: [customerProducts, '$_id'] },
        },
      },
      { $sort: { index: 1 } },
    ]);

    return products;
  },

  getFavouriteProducts: async (decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const customer = await Customer.findOne({ _id: user?._id })
      .lean()
      .exec();

    const products: IProduct[] = await Product.find({ _id: { $in: customer?.favouriteProducts } })
      .select('thumbUrls title price category')
      .populate({ path: 'category', select: '_id' })
      .lean()
      .exec();

    return products;
  },

  update: async <T>(itemToUpdate: T, _id?: string, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    await Customer.findOneAndUpdate({ _id: user?._id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  updateCart: async (_id: string, count: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = { _id: user?._id };

    const currentCustomer = await Customer.findOne(filter).exec();

    const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
    const currentCart = currentCustomer?.cart || [];

    if (currentItems?.includes(_id)) {
      await Customer.updateOne(filter, {
        cart: currentCart.map((item) => {
          return item.product._id?.toString() === _id ? { product: item.product, count } : item;
        }),
      });

      await currentCustomer?.save();

      return true;
    } else {
      return false;
    }
  },

  create: async <T>(customerToCreate: T) => {
    const customer = new Customer(customerToCreate);

    customer.password = await bcrypt.hash(customer.password, 10);

    await customer.save();
  },

  createFavourite: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const limit = 8;

    const user = decodeToken(decode, token);

    const filter = { _id: user?._id };

    const currentCustomer = await Customer.findOne(filter).exec();

    const currentFavourites = currentCustomer?.favouriteProducts?.map((product) => product.toString()) || [];

    if (currentFavourites.length === limit) {
      return { isReachedLimit: true, isAlreadyExists: false };
    } else if (currentFavourites.includes(_id)) {
      return { isReachedLimit: false, isAlreadyExists: true };
    } else {
      await Customer.updateOne(filter, { $push: { favouriteProducts: _id } });
      await currentCustomer?.save();

      return { isReachedLimit: false, isAlreadyExists: false };
    }
  },

  addToCart: async (_id: string | string[], decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = { _id: user?._id };

    const currentCustomer = await Customer.findOne(filter).exec();

    const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
    const currentCart = currentCustomer?.cart || [];

    if (typeof _id === 'string') {
      currentItems?.includes(_id)
        ? await Customer.updateOne(filter, {
            cart: currentCart.map((item) => {
              return item.product._id?.toString() === _id ? { product: item.product, count: item.count + 1 } : item;
            }),
          })
        : await Customer.updateOne(filter, {
            $push: { cart: { product: _id, count: 1 } },
          });
    } else {
      const productsToUpdateCount: string[] = [];
      const productsToAdd: string[] = [];

      for (const productId of _id) {
        currentItems?.includes(productId) ? productsToUpdateCount.push(productId) : productsToAdd.push(productId);
      }

      if (productsToUpdateCount.length) {
        await Customer.updateOne(filter, {
          cart: currentCart.map((item) => {
            const isExists = productsToUpdateCount.some((productId) => item.product._id?.toString() === productId);

            return isExists ? { product: item.product, count: item.count + 1 } : item;
          }),
        });
      }

      if (productsToAdd.length) {
        for (const productId of productsToAdd) {
          await Customer.updateOne(filter, {
            $push: { cart: { product: productId, count: 1 } },
          });
        }
      }
    }

    await currentCustomer?.save();
  },

  delete: async (_id?: string, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    await Customer.findOneAndDelete({ _id: user?._id });
  },

  deleteFromCart: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = { _id: user?._id };

    const currentCustomer = await Customer.findOne(filter).exec();

    const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
    const currentCart = currentCustomer?.cart || [];

    if (currentItems?.includes(_id)) {
      await Customer.updateOne(filter, {
        cart: currentCart.filter((item) => item.product._id?.toString() !== _id),
      });

      await currentCustomer?.save();

      return true;
    } else {
      return false;
    }
  },

  deleteFavourite: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = { _id: user?._id };

    const currentCustomer = await Customer.findOne(filter).exec();

    const currentFavourites = currentCustomer?.favouriteProducts?.map((product) => product.toString()) || [];

    if (currentFavourites.includes(_id) && currentCustomer?.favouriteProducts) {
      await Customer.updateOne(filter, {
        favouriteProducts: currentFavourites.filter((product) => product !== _id),
      });

      await currentCustomer.save();

      return true;
    } else {
      return false;
    }
  },
};
