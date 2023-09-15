export const URL_CONFIGURATION = '/configurations';

export const API_CONFIGURATION = 'configuration';

export const CONFIGURATION_CATEGORIES_ORDER = [
  'Motherboard',
  'CPU',
  'Cooler',
  'Case',
  'GPU',
  'PSU',
  'RAM',
  'SSD',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Mousepad',
];

export const CONFIGURATION_PRODUCT_FIELDS: { [key: string]: string[] } = {
  CPU: ['TDP', 'Socket'],
  Case: ['Format', 'Max cooler height'],
  Cooler: ['Height', 'Dissipated power'],
  GPU: ['Recommended power supply'],
  Motherboard: ['Format', 'Socket', 'RAM type'],
  PSU: ['Power'],
  RAM: ['Type'],
};
