export const URL_CONFIGURATION = '/configurations';

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
  Motherboard: ['Format', 'Socket', 'RAM type'],
  CPU: ['TDP', 'Socket', 'Cores'],
  Cooler: ['Height', 'Dissipated power', 'Heat pipes'],
  Case: ['Format', 'Max cooler height', 'Color'],
  GPU: ['Memory', 'Recommended power supply'],
  PSU: ['Power', 'Certificate 80 plus'],
  RAM: ['Size', 'Type'],
  SSD: ['Sequential read', 'Sequential write'],
  Monitor: ['Resolution', 'Panel type'],
  Keyboard: ['Keys type', 'Wireless'],
  Mouse: ['Sensitivity', 'Wireless'],
  Mousepad: ['Width', 'Length'],
};
