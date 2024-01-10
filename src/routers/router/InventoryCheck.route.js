import React from 'react';

const InventoryCheckPage = React.lazy(() => import('pages/InventoryCheck/InventoryCheckPage'));
const InventoryCheckAddPage = React.lazy(() => import('pages/InventoryCheck/InventoryCheckAddPage'));

const InventoryCheckcf = [
  {
    path: '/inventory-check',
    exact: true,
    name: 'Danh sách phiếu kiểm kê',
    component: InventoryCheckPage,
  },
  {
    path: '/inventory-check/add',
    exact: true,
    name: 'Thêm mới phiếu kiểm kê',
    component: InventoryCheckAddPage,
  },
  {
    path: '/inventory-check/edit/:id',
    exact: true,
    name: 'Chỉnh sửa phiếu kiểm kê',
    component: InventoryCheckAddPage,
  },
  {
    path: '/inventory-check/detail/:id',
    exact: true,
    name: 'Chi tiết phiếu kiểm kê',
    component: InventoryCheckAddPage,
  },
];

export default InventoryCheckcf;
