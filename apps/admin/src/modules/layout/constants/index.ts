import { URL_MAIN } from '@/common/constants';
import { URL_MANAGER } from '@/manager/constants';
import { URL_SHIPMENT } from '@/shipment/constants';
import { URL_ORDER } from '@/order/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';
import { URL_CUSTOMER } from '@/customer/constants';

import { INavItem } from '@/layout/interface';

import IconNavProducts from '@/layout/icons/nav-products.svg?component';

export const NAV_ITEMS: INavItem[] = [
  { _id: 1, url: URL_MAIN, title: 'Главная', icon: IconNavProducts },
  { _id: 2, url: URL_MANAGER, title: 'Менеджеры', icon: IconNavProducts },
  { _id: 3, url: URL_SHIPMENT, title: 'Доставка', icon: IconNavProducts },
  { _id: 4, url: URL_ORDER, title: 'Заказы', icon: IconNavProducts },
  { _id: 5, url: URL_CATEGORY, title: 'Категории', icon: IconNavProducts },
  { _id: 6, url: URL_PRODUCT, title: 'Товары', icon: IconNavProducts },
  { _id: 7, url: URL_MANUFACTURER, title: 'Производители', icon: IconNavProducts },
  { _id: 8, url: URL_CUSTOMER, title: 'Покупатели', icon: IconNavProducts },
];
