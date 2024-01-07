import { IFilterData, IProduct } from 'mhz-contracts';

export const PRODUCTS: {
  data: IProduct[];
  total: number;
  filters: IFilterData;
} = {
  data: [
    {
      _id: '64df8a7d7ac901ef3e273343',
      dateCreated: '2023-08-18T15:13:01.342Z',
      dateUpdated: '2023-12-21T16:01:18.787Z',
      title: 'G.Skill Trident Z5 Neo RGB 2x32 GB DDR5 6000',
      price: 31200,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371580194-12.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3abe099f3329e334f459a',
        title: 'G.Skill',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '32',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '6000',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR5',
        },
      ],
      views: 24,
    },
    {
      _id: '64df89e67ac901ef3e2732d8',
      dateCreated: '2023-08-18T15:10:30.009Z',
      dateUpdated: '2023-08-18T15:10:40.599Z',
      title: 'G.Skill Flare X5 2x16 GB DDR5 5600',
      price: 12200,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371428891-11.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3abe099f3329e334f459a',
        title: 'G.Skill',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '32',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '5600',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR5',
        },
      ],
      views: 3,
    },
    {
      _id: '64df89a87ac901ef3e273298',
      dateCreated: '2023-08-18T15:09:28.904Z',
      dateUpdated: '2023-08-18T15:09:40.928Z',
      title: 'G.Skill TRIDENT Z5 2x16 GB DDR5 5600',
      price: 11700,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371367718-10.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3abe099f3329e334f459a',
        title: 'G.Skill',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '32',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '5600',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR5',
        },
      ],
      views: 2,
    },
    {
      _id: '64df89747ac901ef3e27327a',
      dateCreated: '2023-08-18T15:08:36.185Z',
      title: 'AMD Radeon R9 Gamer Series 1x8 GB DDR4 3200',
      price: 1700,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371315012-9.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3aa9a99f3329e334f458a',
        title: 'AMD',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '8',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '1',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 4,
    },
    {
      _id: '64df893f7ac901ef3e27325c',
      dateCreated: '2023-08-18T15:07:43.661Z',
      title: 'AMD Radeon R9 Gamer Series 1x16 GB DDR4 3200',
      price: 3300,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371261913-8.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3aa9a99f3329e334f458a',
        title: 'AMD',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '16',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '1',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 3,
    },
    {
      _id: '64df88e97ac901ef3e273209',
      dateCreated: '2023-08-18T15:06:17.697Z',
      dateUpdated: '2023-08-18T15:06:35.942Z',
      title: 'AMD Radeon R9 Gamer Series 2x8 GB DDR4 3600',
      price: 3800,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371176714-7.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3aa9a99f3329e334f458a',
        title: 'AMD',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '16',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3600',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 9,
    },
    {
      _id: '64df88a07ac901ef3e2731dd',
      dateCreated: '2023-08-18T15:05:04.194Z',
      title: 'AMD Radeon R9 Gamer Series 2x16 GB DDR4 3200',
      price: 6600,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371102779-6.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64d3aa9a99f3329e334f458a',
        title: 'AMD',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '32',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
    },
    {
      _id: '64df883a7ac901ef3e2731d0',
      dateCreated: '2023-08-18T15:03:22.398Z',
      dateUpdated: '2023-08-18T15:06:44.674Z',
      title: 'Samsung M378A4G43AB2 1x32 GB DDR4 3200',
      price: 7200,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692371000991-5.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64dd1907f8fd2bdaa35cc711',
        title: 'Samsung',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '32',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '1',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 3,
    },
    {
      _id: '64df87f77ac901ef3e2731ba',
      dateCreated: '2023-08-18T15:02:15.349Z',
      dateUpdated: '2023-08-18T15:05:17.124Z',
      title: 'Samsung M378A2K43EB1 1x16 GB DDR4 3200',
      price: 3800,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692370934248-4.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64dd1907f8fd2bdaa35cc711',
        title: 'Samsung',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '16',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '1',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
    },
    {
      _id: '64df87c27ac901ef3e2731b2',
      dateCreated: '2023-08-18T15:01:22.509Z',
      title: 'Samsung M378A1G44AB0 1x8 GB DDR4 3200',
      price: 2650,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692370881172-3.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64dd1907f8fd2bdaa35cc711',
        title: 'Samsung',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '8',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '1',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 3,
    },
    {
      _id: '64df86477ac901ef3e2731a6',
      dateCreated: '2023-08-18T14:55:03.074Z',
      title: 'Thermaltake H-ONE 2x8 GB DDR4 3200',
      price: 4400,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692370501723-2.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64da41c2631f006be30afc2e',
        title: 'Thermaltake',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '16',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '3200',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 6,
    },
    {
      _id: '64df860a7ac901ef3e27319c',
      dateCreated: '2023-08-18T14:54:02.800Z',
      title: 'Thermaltake TOUGHRAM 2x8 GB DDR4 4400',
      price: 7700,
      isInStock: true,
      thumbUrls: ['thumb-resized-1692370441643-1.jpg.webp'],
      category: {
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      manufacturer: {
        _id: '64da41c2631f006be30afc2e',
        title: 'Thermaltake',
      },
      fields: [
        {
          title: 'Size',
          fieldType: 'number',
          fieldValue: '16',
          fieldUnits: 'Gb',
        },
        {
          title: 'Modules',
          fieldType: 'number',
          fieldValue: '2',
          fieldUnits: 'pcs',
        },
        {
          title: 'Clock',
          fieldType: 'number',
          fieldValue: '4400',
          fieldUnits: 'MHz',
        },
        {
          title: 'Type',
          fieldType: 'string',
          fieldValue: 'DDR4',
        },
      ],
      views: 7,
    },
  ],
  total: 17,
  filters: {
    category: [
      {
        count: 16,
        _id: '64d62fa7a635811931410ebd',
        title: 'Case',
      },
      {
        count: 12,
        _id: '64d62da6a635811931410ea4',
        title: 'Cooler',
      },
      {
        count: 15,
        _id: '64d4dc15f93f056da17ceff8',
        title: 'CPU',
      },
      {
        count: 20,
        _id: '64d62f06a635811931410eb3',
        title: 'GPU',
      },
      {
        count: 16,
        _id: '64d63066a635811931410ec7',
        title: 'Keyboard',
      },
      {
        count: 20,
        _id: '64d63016a635811931410ec2',
        title: 'Monitor',
      },
      {
        count: 20,
        _id: '64d626e88cde96b53dd37ff2',
        title: 'Motherboard',
      },
      {
        count: 13,
        _id: '64d630cea635811931410ecc',
        title: 'Mouse',
      },
      {
        count: 13,
        _id: '64d63106a635811931410ed1',
        title: 'Mousepad',
      },
      {
        count: 15,
        _id: '64d62f6ca635811931410eb8',
        title: 'PSU',
      },
      {
        count: 20,
        _id: '64d62e42a635811931410ea9',
        title: 'RAM',
      },
      {
        count: 20,
        _id: '64d62ea8a635811931410eae',
        title: 'SSD',
      },
    ],
    manufacturer: [
      {
        count: 11,
        _id: '64d3aa9a99f3329e334f458a',
        title: 'AMD',
      },
      {
        count: 8,
        _id: '64dd1a67f8fd2bdaa35cc735',
        title: 'Apacer',
      },
      {
        count: 4,
        _id: '64da0d350b005b8b2e2a02a9',
        title: 'ASRock',
      },
      {
        count: 24,
        _id: '64da0bff0b005b8b2e2a02a1',
        title: 'ASUS',
      },
      {
        count: 6,
        _id: '64da4173631f006be30afc26',
        title: 'be quiet!',
      },
      {
        count: 12,
        _id: '64d3ab0499f3329e334f458e',
        title: 'Deepcool',
      },
      {
        count: 3,
        _id: '64da69656369da9c4c41cb61',
        title: 'Fractal Design',
      },
      {
        count: 7,
        _id: '64d3abe099f3329e334f459a',
        title: 'G.Skill',
      },
      {
        count: 27,
        _id: '64da0c900b005b8b2e2a02a5',
        title: 'GIGABYTE',
      },
      {
        count: 7,
        _id: '64dd0dda2f1f47a62b1cbdfa',
        title: 'HyperX',
      },
      {
        count: 8,
        _id: '64d38b8da2f01fe2ea5ac16c',
        title: 'Intel',
      },
      {
        count: 2,
        _id: '64da6aa46369da9c4c41cb65',
        title: 'Lian Li',
      },
      {
        count: 13,
        _id: '64dcbe28e3ca93fe992a7951',
        title: 'Logitech',
      },
      {
        count: 18,
        _id: '64da0ba90b005b8b2e2a029c',
        title: 'MSI',
      },
      {
        count: 5,
        _id: '64dd1999f8fd2bdaa35cc723',
        title: 'Palit',
      },
      {
        count: 9,
        _id: '64dcbc71e3ca93fe992a791b',
        title: 'Razer',
      },
      {
        count: 12,
        _id: '64dd1907f8fd2bdaa35cc711',
        title: 'Samsung',
      },
      {
        count: 13,
        _id: '64da41c2631f006be30afc2e',
        title: 'Thermaltake',
      },
      {
        count: 4,
        _id: '64d3ac4599f3329e334f459e',
        title: 'Western Digital',
      },
      {
        count: 7,
        _id: '64da420d631f006be30afc32',
        title: 'Zalman',
      },
    ],
    fields: {
      Backlight: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 3,
          },
          {
            value: true,
            count: 13,
          },
        ],
      },
      'Base clock': {
        fieldUnits: 'GHz',
        fieldValues: [
          {
            value: '2',
            count: 1,
          },
          {
            value: '2.4',
            count: 1,
          },
          {
            value: '2.5',
            count: 2,
          },
          {
            value: '3',
            count: 1,
          },
          {
            value: '3.4',
            count: 3,
          },
          {
            value: '3.6',
            count: 1,
          },
          {
            value: '3.7',
            count: 1,
          },
          {
            value: '3.8',
            count: 2,
          },
          {
            value: '4.5',
            count: 2,
          },
          {
            value: '4.7',
            count: 1,
          },
        ],
      },
      'Certificate 80 plus': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'Bronze',
            count: 2,
          },
          {
            value: 'Gold',
            count: 6,
          },
          {
            value: 'Platinum',
            count: 5,
          },
          {
            value: 'Standard',
            count: 2,
          },
        ],
      },
      Chipset: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'AMD B450',
            count: 2,
          },
          {
            value: 'AMD B550',
            count: 2,
          },
          {
            value: 'AMD B650',
            count: 4,
          },
          {
            value: 'AMD X570',
            count: 1,
          },
          {
            value: 'AMD X670',
            count: 2,
          },
          {
            value: 'GeForce RTX 3050',
            count: 4,
          },
          {
            value: 'GeForce RTX 4060',
            count: 2,
          },
          {
            value: 'GeForce RTX 4060 Ti',
            count: 2,
          },
          {
            value: 'GeForce RTX 4070',
            count: 3,
          },
          {
            value: 'GeForce RTX 4070 Ti',
            count: 2,
          },
          {
            value: 'GeForce RTX 4080',
            count: 3,
          },
          {
            value: 'Intel B760',
            count: 5,
          },
          {
            value: 'Intel H610',
            count: 1,
          },
          {
            value: 'Intel Z690',
            count: 1,
          },
          {
            value: 'Intel Z790',
            count: 2,
          },
          {
            value: 'Radeon RX 570',
            count: 1,
          },
          {
            value: 'Radeon RX 6600',
            count: 1,
          },
          {
            value: 'Radeon RX 6650 XT',
            count: 1,
          },
          {
            value: 'Radeon RX 6700 XT',
            count: 1,
          },
        ],
      },
      Clock: {
        fieldUnits: 'MHz',
        fieldValues: [
          {
            value: '3200',
            count: 9,
          },
          {
            value: '3600',
            count: 3,
          },
          {
            value: '4400',
            count: 1,
          },
          {
            value: '5200',
            count: 1,
          },
          {
            value: '5600',
            count: 4,
          },
          {
            value: '6000',
            count: 2,
          },
        ],
      },
      Color: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'Black',
            count: 14,
          },
          {
            value: 'White',
            count: 2,
          },
        ],
      },
      Cores: {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '4',
            count: 1,
          },
          {
            value: '6',
            count: 2,
          },
          {
            value: '8',
            count: 4,
          },
          {
            value: '10',
            count: 1,
          },
          {
            value: '12',
            count: 2,
          },
          {
            value: '16',
            count: 3,
          },
          {
            value: '24',
            count: 2,
          },
        ],
      },
      Diagonal: {
        fieldUnits: 'inch',
        fieldValues: [
          {
            value: '23.8',
            count: 5,
          },
          {
            value: '27',
            count: 6,
          },
          {
            value: '31.5',
            count: 7,
          },
          {
            value: '34',
            count: 2,
          },
        ],
      },
      DisplayPort: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 6,
          },
          {
            value: true,
            count: 34,
          },
        ],
      },
      'Dissipated power': {
        fieldUnits: 'W',
        fieldValues: [
          {
            value: '130',
            count: 2,
          },
          {
            value: '150',
            count: 1,
          },
          {
            value: '170',
            count: 1,
          },
          {
            value: '180',
            count: 3,
          },
          {
            value: '220',
            count: 1,
          },
          {
            value: '240',
            count: 1,
          },
          {
            value: '250',
            count: 1,
          },
          {
            value: '260',
            count: 1,
          },
          {
            value: '280',
            count: 1,
          },
        ],
      },
      Fans: {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '1',
            count: 8,
          },
          {
            value: '2',
            count: 4,
          },
        ],
      },
      Format: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'Micro-ATX',
            count: 15,
          },
          {
            value: 'Mini-ITX',
            count: 7,
          },
          {
            value: 'Standard-ATX',
            count: 14,
          },
        ],
      },
      HDMI: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: true,
            count: 40,
          },
        ],
      },
      'Heat pipes': {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '3',
            count: 1,
          },
          {
            value: '4',
            count: 7,
          },
          {
            value: '5',
            count: 1,
          },
          {
            value: '6',
            count: 1,
          },
          {
            value: '7',
            count: 2,
          },
        ],
      },
      Height: {
        fieldUnits: 'mm',
        fieldValues: [
          {
            value: '75',
            count: 1,
          },
          {
            value: '135',
            count: 1,
          },
          {
            value: '155',
            count: 4,
          },
          {
            value: '158',
            count: 1,
          },
          {
            value: '159',
            count: 2,
          },
          {
            value: '160',
            count: 1,
          },
          {
            value: '163',
            count: 1,
          },
          {
            value: '167',
            count: 1,
          },
        ],
      },
      Interface: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'PCI-E 3.x x4',
            count: 6,
          },
          {
            value: 'PCI-E 4.0 x4',
            count: 12,
          },
          {
            value: 'PCI-E 5.0 x4',
            count: 2,
          },
          {
            value: 'USB Type-A',
            count: 12,
          },
          {
            value: 'USB Type-C',
            count: 1,
          },
        ],
      },
      Keys: {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '61',
            count: 1,
          },
          {
            value: '68',
            count: 3,
          },
          {
            value: '81',
            count: 1,
          },
          {
            value: '101',
            count: 2,
          },
          {
            value: '104',
            count: 7,
          },
          {
            value: '107',
            count: 1,
          },
          {
            value: '114',
            count: 1,
          },
        ],
      },
      'Keys type': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'Mechanical',
            count: 9,
          },
          {
            value: 'Membrane',
            count: 5,
          },
          {
            value: 'Scissors',
            count: 2,
          },
        ],
      },
      Length: {
        fieldUnits: 'mm',
        fieldValues: [
          {
            value: '230',
            count: 1,
          },
          {
            value: '270',
            count: 1,
          },
          {
            value: '340',
            count: 2,
          },
          {
            value: '355',
            count: 1,
          },
          {
            value: '360',
            count: 4,
          },
          {
            value: '700',
            count: 1,
          },
          {
            value: '900',
            count: 2,
          },
          {
            value: '1600',
            count: 1,
          },
        ],
      },
      Material: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'Fabric',
            count: 12,
          },
          {
            value: 'Plastic',
            count: 1,
          },
        ],
      },
      'Max cooler height': {
        fieldUnits: 'mm',
        fieldValues: [
          {
            value: '140',
            count: 1,
          },
          {
            value: '151',
            count: 1,
          },
          {
            value: '155',
            count: 2,
          },
          {
            value: '156',
            count: 1,
          },
          {
            value: '160',
            count: 2,
          },
          {
            value: '162',
            count: 1,
          },
          {
            value: '165',
            count: 3,
          },
          {
            value: '166',
            count: 1,
          },
          {
            value: '167',
            count: 1,
          },
          {
            value: '169',
            count: 1,
          },
          {
            value: '170',
            count: 1,
          },
          {
            value: '175',
            count: 1,
          },
        ],
      },
      Memory: {
        fieldUnits: 'Gb',
        fieldValues: [
          {
            value: '8',
            count: 12,
          },
          {
            value: '12',
            count: 5,
          },
          {
            value: '16',
            count: 3,
          },
        ],
      },
      'Memory bus width': {
        fieldUnits: 'bit',
        fieldValues: [
          {
            value: '128',
            count: 9,
          },
          {
            value: '192',
            count: 6,
          },
          {
            value: '256',
            count: 5,
          },
        ],
      },
      'Memory type': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'GDDR5',
            count: 1,
          },
          {
            value: 'GDDR6',
            count: 11,
          },
          {
            value: 'GDDR6X',
            count: 8,
          },
        ],
      },
      'Modular cables': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 5,
          },
          {
            value: true,
            count: 10,
          },
        ],
      },
      Modules: {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '1',
            count: 8,
          },
          {
            value: '2',
            count: 12,
          },
        ],
      },
      'Onboard graphics': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 8,
          },
          {
            value: true,
            count: 7,
          },
        ],
      },
      'Panel type': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'IPS',
            count: 10,
          },
          {
            value: 'VA',
            count: 10,
          },
        ],
      },
      Power: {
        fieldUnits: 'W',
        fieldValues: [
          {
            value: '500',
            count: 1,
          },
          {
            value: '550',
            count: 2,
          },
          {
            value: '600',
            count: 1,
          },
          {
            value: '650',
            count: 1,
          },
          {
            value: '750',
            count: 5,
          },
          {
            value: '850',
            count: 1,
          },
          {
            value: '1000',
            count: 2,
          },
          {
            value: '1200',
            count: 2,
          },
        ],
      },
      'RAM slots': {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '2',
            count: 8,
          },
          {
            value: '4',
            count: 12,
          },
        ],
      },
      'RAM type': {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'DDR4',
            count: 13,
          },
          {
            value: 'DDR5',
            count: 7,
          },
        ],
      },
      'Recommended power supply': {
        fieldUnits: 'W',
        fieldValues: [
          {
            value: '450',
            count: 3,
          },
          {
            value: '500',
            count: 3,
          },
          {
            value: '550',
            count: 3,
          },
          {
            value: '600',
            count: 1,
          },
          {
            value: '650',
            count: 4,
          },
          {
            value: '750',
            count: 4,
          },
          {
            value: '850',
            count: 2,
          },
        ],
      },
      'Refresh rate': {
        fieldUnits: 'hz',
        fieldValues: [
          {
            value: '60',
            count: 2,
          },
          {
            value: '75',
            count: 9,
          },
          {
            value: '144',
            count: 4,
          },
          {
            value: '165',
            count: 5,
          },
        ],
      },
      Resolution: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: '1920x1080',
            count: 10,
          },
          {
            value: '2560x1440',
            count: 6,
          },
          {
            value: '3440x1440',
            count: 2,
          },
          {
            value: '3840x2160',
            count: 2,
          },
        ],
      },
      Sensitivity: {
        fieldUnits: 'dpi',
        fieldValues: [
          {
            value: '800',
            count: 1,
          },
          {
            value: '1000',
            count: 1,
          },
          {
            value: '6200',
            count: 3,
          },
          {
            value: '8000',
            count: 1,
          },
          {
            value: '12000',
            count: 1,
          },
          {
            value: '16000',
            count: 4,
          },
          {
            value: '20000',
            count: 1,
          },
          {
            value: '25600',
            count: 1,
          },
        ],
      },
      'Sequential read': {
        fieldUnits: 'MB/s',
        fieldValues: [
          {
            value: '2300',
            count: 1,
          },
          {
            value: '2400',
            count: 2,
          },
          {
            value: '3500',
            count: 3,
          },
          {
            value: '3600',
            count: 2,
          },
          {
            value: '4900',
            count: 1,
          },
          {
            value: '5000',
            count: 4,
          },
          {
            value: '6900',
            count: 1,
          },
          {
            value: '7000',
            count: 1,
          },
          {
            value: '7300',
            count: 1,
          },
          {
            value: '7450',
            count: 2,
          },
          {
            value: '10000',
            count: 2,
          },
        ],
      },
      'Sequential write': {
        fieldUnits: 'MB/s',
        fieldValues: [
          {
            value: '1500',
            count: 1,
          },
          {
            value: '1650',
            count: 1,
          },
          {
            value: '1750',
            count: 1,
          },
          {
            value: '2000',
            count: 1,
          },
          {
            value: '2300',
            count: 2,
          },
          {
            value: '2500',
            count: 1,
          },
          {
            value: '3000',
            count: 1,
          },
          {
            value: '3200',
            count: 1,
          },
          {
            value: '3800',
            count: 2,
          },
          {
            value: '4100',
            count: 1,
          },
          {
            value: '4400',
            count: 2,
          },
          {
            value: '5000',
            count: 1,
          },
          {
            value: '6300',
            count: 1,
          },
          {
            value: '6900',
            count: 2,
          },
          {
            value: '9500',
            count: 1,
          },
          {
            value: '10000',
            count: 1,
          },
        ],
      },
      Size: {
        fieldUnits: 'Gb',
        fieldValues: [
          {
            value: '8',
            count: 4,
          },
          {
            value: '16',
            count: 7,
          },
          {
            value: '32',
            count: 7,
          },
          {
            value: '64',
            count: 2,
          },
          {
            value: '480',
            count: 1,
          },
          {
            value: '500',
            count: 8,
          },
          {
            value: '512',
            count: 1,
          },
          {
            value: '1000',
            count: 5,
          },
          {
            value: '2000',
            count: 4,
          },
          {
            value: '2048',
            count: 1,
          },
        ],
      },
      Socket: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'AM4',
            count: 9,
          },
          {
            value: 'AM5',
            count: 9,
          },
          {
            value: 'LGA 1700',
            count: 17,
          },
        ],
      },
      TDP: {
        fieldUnits: 'W',
        fieldValues: [
          {
            value: '65',
            count: 1,
          },
          {
            value: '89',
            count: 1,
          },
          {
            value: '105',
            count: 5,
          },
          {
            value: '117',
            count: 1,
          },
          {
            value: '154',
            count: 1,
          },
          {
            value: '170',
            count: 1,
          },
          {
            value: '190',
            count: 1,
          },
          {
            value: '202',
            count: 1,
          },
          {
            value: '219',
            count: 1,
          },
          {
            value: '253',
            count: 2,
          },
        ],
      },
      Technology: {
        fieldUnits: 'nm',
        fieldValues: [
          {
            value: '5',
            count: 15,
          },
          {
            value: '7',
            count: 7,
          },
          {
            value: '8',
            count: 4,
          },
          {
            value: '10',
            count: 8,
          },
          {
            value: '14',
            count: 1,
          },
        ],
      },
      Threads: {
        fieldUnits: 'pcs',
        fieldValues: [
          {
            value: '8',
            count: 1,
          },
          {
            value: '12',
            count: 2,
          },
          {
            value: '16',
            count: 5,
          },
          {
            value: '20',
            count: 1,
          },
          {
            value: '24',
            count: 3,
          },
          {
            value: '32',
            count: 3,
          },
        ],
      },
      Type: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: 'DDR4',
            count: 13,
          },
          {
            value: 'DDR5',
            count: 7,
          },
        ],
      },
      Width: {
        fieldUnits: 'mm',
        fieldValues: [
          {
            value: '200',
            count: 1,
          },
          {
            value: '215',
            count: 1,
          },
          {
            value: '255',
            count: 1,
          },
          {
            value: '260',
            count: 2,
          },
          {
            value: '275',
            count: 1,
          },
          {
            value: '280',
            count: 2,
          },
          {
            value: '300',
            count: 2,
          },
          {
            value: '400',
            count: 1,
          },
          {
            value: '440',
            count: 1,
          },
          {
            value: '800',
            count: 1,
          },
        ],
      },
      Window: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 2,
          },
          {
            value: true,
            count: 13,
          },
          {
            value: 'true',
            count: 1,
          },
        ],
      },
      Wireless: {
        fieldUnits: undefined,
        fieldValues: [
          {
            value: false,
            count: 18,
          },
          {
            value: true,
            count: 11,
          },
        ],
      },
    },
  },
};
