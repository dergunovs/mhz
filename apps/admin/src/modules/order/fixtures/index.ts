import { IOrder } from 'mhz-contracts';

export const ORDERS: { data: IOrder[]; total: number } = {
  data: [
    {
      _id: '65940c82cc2989495f96d911',
      dateCreated: '2024-01-02T13:15:46.625Z',
      dateUpdated: '2024-01-02T13:17:53.201Z',
      price: 352000,
      customer: {
        _id: '64fdd1910e0355e88d03bdb6',
        email: 'dergunovs@mail.ru',
        firstName: 'Alexandr',
        lastName: 'Dergunov',
      },
      status: 'new',
      products: [
        {
          _id: '65940bf4cc2989495f96d8f9',
          product: {
            _id: '64dddadbeb94d9f7131a40d0',
            title: 'ASUS ROG Azoth',
            price: 29900,
            thumbUrls: ['thumb-resized-1692261082629-3.jpg.webp'],
            category: { _id: '64d63066a635811931410ec7', title: 'Keyboard' },
          },
          count: 11,
        },
        {
          _id: '658fbaac054f0dbc740eea56',
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
    },
    {
      _id: '6587ec081614096a5773abdb',
      dateCreated: '2023-12-24T08:30:00.146Z',
      dateUpdated: '2023-12-30T06:19:35.657Z',
      price: 29900,
      customer: {
        _id: '64fdd1910e0355e88d03bdb6',
        email: 'dergunovs@mail.ru',
        firstName: 'Alexandr',
        lastName: 'Dergunov',
      },
      status: 'completed',
    },
  ],
  total: 1,
};
