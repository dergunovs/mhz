import { URL_SHIPMENT } from '@/shipment/constants';

export const shipmentRoutes = [
  {
    path: URL_SHIPMENT,
    name: 'ShipmentList',
    component: () => import('@/shipment/pages/ShipmentListPage.vue'),
  },
  {
    path: `${URL_SHIPMENT}/:id`,
    name: 'Shipment',
    component: () => import('@/shipment/pages/ShipmentPage.vue'),
  },
];
