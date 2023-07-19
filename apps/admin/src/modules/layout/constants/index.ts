import { URL_MAIN } from '@/common/constants';
import { URL_USER } from '@/user/constants';
import { URL_SHIPMENT } from '@/shipment/constants';
import { URL_ORDER } from '@/order/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

import { INavItem } from '@/layout/interface';

export const NAV_ITEMS: INavItem[] = [
  { _id: 1, url: URL_MAIN, title: 'Главная' },
  { _id: 2, url: URL_USER, title: 'Пользователи' },
  { _id: 3, url: URL_SHIPMENT, title: 'Доставка' },
  { _id: 4, url: URL_ORDER, title: 'Заказы' },
  { _id: 5, url: URL_CATEGORY, title: 'Категории' },
  { _id: 6, url: URL_PRODUCT, title: 'Товары' },
  { _id: 7, url: URL_MANUFACTURER, title: 'Производители' },
];
