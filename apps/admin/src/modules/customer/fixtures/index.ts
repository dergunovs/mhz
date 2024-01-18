import { ICustomer } from 'mhz-contracts';

export const CUSTOMERS: { data: ICustomer[]; total: number } = {
  data: [
    {
      _id: '64fdd1910e0355e88d03bdb1',
      dateCreated: '2023-09-10T14:24:17.314Z',
      dateUpdated: '2023-09-11T17:30:40.878Z',
      email: 'a@b.ru',
      firstName: 'Alexandr',
      lastName: 'Ivanot',
      cart: [
        {
          _id: '65a8d20c4817b038f660ef5c',
          product: {
            _id: '64dd11c52f1f47a62b1cc0e2',
            title: 'ASUS ROG Strix Impact II Electro Punk',
            price: 2150,
            thumbUrls: ['thumb-resized-1692209604185-1-1.jpg.webp', 'thumb-resized-1692209604282-1-2.jpg.webp'],
            category: { _id: '64d630cea635811931410ecc', title: 'Mouse' },
          },
          count: 2,
        },
        {
          _id: '65a8d20e4817b038f660ef90',
          product: {
            _id: '64df860a7ac901ef3e27319c',
            title: 'Thermaltake TOUGHRAM 2x8 GB DDR4 4400',
            price: 7700,
            thumbUrls: ['thumb-resized-1692370441643-1.jpg.webp'],
            category: { _id: '64d62e42a635811931410ea9', title: 'RAM' },
          },
          count: 3,
        },
      ],
      favouriteProducts: [
        {
          _id: '64dde049eb94d9f7131a41c9',
          title: 'Razer BlackWidow V3 Mini',
          price: 13600,
          thumbUrls: ['thumb-resized-1692262472141-3.jpg.webp'],
          category: { _id: '64d63066a635811931410ec7', title: 'Keyboard' },
        },
        {
          _id: '64dd13d52f1f47a62b1cc18a',
          title: 'ASUS ROG Gladius II Core',
          price: 3500,
          thumbUrls: ['thumb-resized-1692210128768-1-1.png.webp', 'thumb-resized-1692210128931-1-2.jpg.webp'],
          category: { _id: '64d630cea635811931410ecc', title: 'Mouse' },
        },
        {
          _id: '64dd11c52f1f47a62b1cc0e2',
          title: 'ASUS ROG Strix Impact II Electro Punk',
          price: 2150,
          thumbUrls: ['thumb-resized-1692209604185-1-1.jpg.webp', 'thumb-resized-1692209604282-1-2.jpg.webp'],
          category: { _id: '64d630cea635811931410ecc', title: 'Mouse' },
        },
      ],
      watchedProducts: [
        {
          _id: '65159deb51fbb4806b51a23b',
          dateCreated: '2023-09-28T15:38:19.702Z',
          product: {
            _id: '64dddadbeb94d9f7131a40d0',
            title: 'ASUS ROG Azoth',
            price: 29900,
            thumbUrls: ['thumb-resized-1692261082629-3.jpg.webp'],
            category: { _id: '64d63066a635811931410ec7', title: 'Keyboard' },
          },
        },
        {
          _id: '65192ab8e91212d5998cf05c',
          dateCreated: '2023-10-01T08:15:52.268Z',
          product: {
            _id: '64dd11c52f1f47a62b1cc0e2',
            title: 'ASUS ROG Strix Impact II Electro Punk',
            price: 2150,
            thumbUrls: ['thumb-resized-1692209604185-1-1.jpg.webp', 'thumb-resized-1692209604282-1-2.jpg.webp'],
            category: { _id: '64d630cea635811931410ecc', title: 'Mouse' },
          },
        },
      ],
    },
    {
      _id: '64fdd1910e0355e88d03bdb7',
      dateCreated: '2023-02-11T14:24:17.315Z',
      dateUpdated: '2023-02-12T17:30:40.879Z',
      email: 'test@mail.ru',
      firstName: 'Alex',
      lastName: 'Petrov',
    },
  ],
  total: 1,
};
