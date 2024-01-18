import { IManufacturer } from 'mhz-contracts';

export const MANUFACTURERS: { data: IManufacturer[]; total: number } = {
  data: [
    {
      _id: '64dd1a67f8fd2bdaa35cc735',
      dateCreated: '2023-08-16T18:50:15.242Z',
      dateUpdated: '2023-09-11T16:26:24.516Z',
      title: 'Apacer',
      country: 'China',
      logoUrl: 'resized-1692211814147-Apacer.png',
      views: 15,
    },
    {
      _id: '64dd1999f8fd2bdaa35cc723',
      dateCreated: '2023-08-16T18:46:49.184Z',
      title: 'Palit',
      country: 'China',
      logoUrl: 'resized-1692211607919-Palit_logo.png',
      views: 2,
    },
    {
      _id: '64dd1907f8fd2bdaa35cc711',
      dateCreated: '2023-08-16T18:44:23.306Z',
      title: 'Samsung',
      country: 'Korea',
      logoUrl: 'resized-1692211461686-samsung.png',
      views: 1,
    },
  ],
  total: 1,
};
