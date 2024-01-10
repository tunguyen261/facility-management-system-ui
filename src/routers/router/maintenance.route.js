import React from 'react';

const MaintenancePage = React.lazy(() => import('pages/Maintenance/MaintenancePage'));
const MaintenanceAddPage = React.lazy(() => import('pages/Maintenance/MaintenanceAddPage'));

const Maintenance = [
  {
    path: '/maintenance',
    exact: true,
    name: 'Danh sách yêu cầu bảo trì',
    component: MaintenancePage,
  },
  {
    path: '/maintenance/add',
    exact: true,
    name: 'Thêm mới yêu cầu bảo trì',
    component: MaintenanceAddPage,
  },
  {
    path: '/maintenance/edit/:id',
    exact: true,
    name: 'Chỉnh sửa yêu cầu bảo trì',
    component: MaintenanceAddPage,
  },
  {
    path: '/maintenance/detail/:id',
    exact: true,
    name: 'Chi tiết yêu cầu bảo trì',
    component: MaintenanceAddPage,
  },
];

export default Maintenance;
