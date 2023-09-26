import { URL_MAIN } from '@/common/constants';
import { URL_ORDER } from '@/order/constants';
import { URL_CUSTOMER } from '@/customer/constants';
import { URL_MANAGER, URL_MANAGER_EDIT } from '@/manager/constants';
import { URL_CATEGORY, URL_CATEGORY_EDIT } from '@/category/constants';
import { URL_PRODUCT, URL_PRODUCT_EDIT } from '@/product/constants';
import { URL_MANUFACTURER, URL_MANUFACTURER_EDIT } from '@/manufacturer/constants';

import { INavItem } from '@/layout/interface';

import IconNavMain from '@/layout/icons/nav-main.svg?component';
import IconNavProduct from '@/layout/icons/nav-product.svg?component';
import IconNavCategory from '@/layout/icons/nav-category.svg?component';
import IconNavManufacturer from '@/layout/icons/nav-manufacturer.svg?component';
import IconNavOrder from '@/layout/icons/nav-order.svg?component';
import IconNavManager from '@/layout/icons/nav-manager.svg?component';
import IconNavCustomer from '@/layout/icons/nav-customer.svg?component';

export const NAV_ITEMS: INavItem[] = [
  { _id: '1', url: URL_MAIN, title: 'Main', icon: IconNavMain },
  { _id: '2', url: URL_PRODUCT, title: 'Products', icon: IconNavProduct },
  { _id: '3', url: URL_CATEGORY, title: 'Categories', icon: IconNavCategory },
  { _id: '4', url: URL_MANUFACTURER, title: 'Manufacturers', icon: IconNavManufacturer },
  { _id: '5', url: URL_ORDER, title: 'Orders', icon: IconNavOrder },
  { _id: '6', url: URL_MANAGER, title: 'Managers', icon: IconNavManager },
  { _id: '7', url: URL_CUSTOMER, title: 'Customers', icon: IconNavCustomer },
];

export const SEARCH_SCHEME = [
  { type: 'products', labels: ['title'], url: URL_PRODUCT_EDIT },
  { type: 'categories', labels: ['title'], url: URL_CATEGORY_EDIT },
  { type: 'manufacturers', labels: ['title'], url: URL_MANUFACTURER_EDIT },
  { type: 'managers', labels: ['firstName', 'lastName'], url: URL_MANAGER_EDIT },
  { type: 'customers', labels: ['firstName', 'lastName'], url: URL_CUSTOMER },
  { type: 'orders', labels: ['_id'], url: URL_ORDER },
];
