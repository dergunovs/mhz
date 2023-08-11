import { URL_MAIN } from '@/common/constants';
import { URL_MANAGER } from '@/manager/constants';
import { URL_SHIPMENT } from '@/shipment/constants';
import { URL_ORDER } from '@/order/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_PRODUCT } from '@/product/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';
import { URL_CUSTOMER } from '@/customer/constants';

import { INavItem } from '@/layout/interface';

import IconNavMain from '@/layout/icons/nav-main.svg?component';
import IconNavProduct from '@/layout/icons/nav-product.svg?component';
import IconNavCategory from '@/layout/icons/nav-category.svg?component';
import IconNavManufacturer from '@/layout/icons/nav-manufacturer.svg?component';
import IconNavOrder from '@/layout/icons/nav-order.svg?component';
import IconNavShipment from '@/layout/icons/nav-shipment.svg?component';
import IconNavManager from '@/layout/icons/nav-manager.svg?component';
import IconNavCustomer from '@/layout/icons/nav-customer.svg?component';

export const NAV_ITEMS: INavItem[] = [
  { _id: '1', url: URL_MAIN, title: 'Main', icon: IconNavMain },
  { _id: '2', url: URL_PRODUCT, title: 'Products', icon: IconNavProduct },
  { _id: '3', url: URL_CATEGORY, title: 'Categories', icon: IconNavCategory },
  { _id: '4', url: URL_MANUFACTURER, title: 'Manufacturers', icon: IconNavManufacturer },
  { _id: '5', url: URL_ORDER, title: 'Orders', icon: IconNavOrder },
  { _id: '6', url: URL_SHIPMENT, title: 'Shipments', icon: IconNavShipment },
  { _id: '7', url: URL_MANAGER, title: 'Managers', icon: IconNavManager },
  { _id: '8', url: URL_CUSTOMER, title: 'Customers', icon: IconNavCustomer },
];
