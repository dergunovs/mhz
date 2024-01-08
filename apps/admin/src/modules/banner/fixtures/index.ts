import { IBanner } from 'mhz-contracts';

export const BANNERS: {
  data: IBanner[];
  total: number;
} = {
  data: [
    {
      _id: '6517b90000009354ff5e5a2a',
      dateCreated: '2023-09-30T05:58:24.298Z',
      isActive: true,
      text: 'Too fast! It will exceed your expectations!',
      product: {
        _id: '64de340eb9d96f9e20bef523',
        title: 'Samsung 500 GB 980 PRO',
        price: 6400,
        thumbUrls: ['thumb-resized-1692283917239-1.jpg.webp'],
        category: {
          _id: '64d62ea8a635811931410eae',
          title: 'SSD',
        },
      },
      imageUrl: '1696053502949-980.png',
      color: '#FFEFDB',
    },
    {
      _id: '6517b8b800009354ff5e5a16',
      dateCreated: '2023-09-30T05:57:12.316Z',
      dateUpdated: '2023-09-30T11:18:01.782Z',
      isActive: true,
      text: 'Innovative, multifunctional and personalized case.',
      product: {
        _id: '64db484612c2a6bb8fe14a07',
        title: 'MSI MPG SEKIRA 500X',
        price: 22600,
        thumbUrls: ['thumb-resized-1692092485318-8-1.jpg.webp', 'thumb-resized-1692092485347-8-2.jpg.webp'],
        category: {
          _id: '64d62fa7a635811931410ebd',
          title: 'Case',
        },
      },
      imageUrl: '1696053430933-msi.png',
      color: '#F7F4FF',
    },
    {
      _id: '6517b77c00009354ff5e5997',
      dateCreated: '2023-09-30T05:51:56.181Z',
      isActive: true,
      text: "World's first gaming monitor with kvm function.",
      product: {
        _id: '64ddce43d0ec1c69e26765e9',
        title: 'GIGABYTE M32U',
        price: 74500,
        thumbUrls: ['thumb-resized-1692257858249-5.jpg.webp'],
        category: {
          _id: '64d63016a635811931410ec2',
          title: 'Monitor',
        },
      },
      imageUrl: '1696053114860-pic.png',
      color: '#F9F8F8',
    },
  ],
  total: 1,
};
