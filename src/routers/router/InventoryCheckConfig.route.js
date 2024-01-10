import React from 'react';

const InventoryCheckConfigPage = React.lazy(() => import('pages/InventoryCheckConfig/InventoryCheckConfigPage'));
const InventoryCheckConfigAddPage = React.lazy(() => import('pages/InventoryCheckConfig/InventoryCheckConfigAddPage'));

const InventoryCheckcf = [
  {
    path: '/inventory-check-config',
    exact: true,
    name: 'Danh sách cấu hình',
    component: InventoryCheckConfigAddPage,
  },
  {
    path: '/inventory-check-config/add',
    exact: true,
    name: 'Thêm mới cấu hình',
    component: InventoryCheckConfigAddPage,
  },
  {
    path: '/inventory-check-config/edit/:id',
    exact: true,
    name: 'Chỉnh sửa cấu hình',
    component: InventoryCheckConfigAddPage,
  },
  {
    path: '/inventory-check-config/detail/:id',
    exact: true,
    name: 'Chi tiết cấu hình',
    component: InventoryCheckConfigAddPage,
  },
];

export default InventoryCheckcf;
