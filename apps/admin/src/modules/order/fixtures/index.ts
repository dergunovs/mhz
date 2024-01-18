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
      status: 'paid',
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
