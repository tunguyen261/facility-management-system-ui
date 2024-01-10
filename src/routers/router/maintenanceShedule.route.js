import React from 'react';

const MaintenanceShedulePage = React.lazy(() => import('pages/MaintenanceSchedule/MaintenanceShedulePage'));
const MaintenanceSheduleAddPage = React.lazy(() => import('pages/MaintenanceSchedule/MaintenanceSheduleAddPage'));

const MaintenanceShedule = [
  {
    path: '/maintenance-schedule',
    exact: true,
    name: 'Danh sách phiếu lập lịch',
    component: MaintenanceShedulePage,
  },
  {
    path: '/maintenance-schedule/add',
    exact: true,
    name: 'Thêm mới phiếu lập lịch',
    component: MaintenanceSheduleAddPage,
  },
  {
    path: '/maintenance-schedule/edit/:id',
    exact: true,
    name: 'Chỉnh sửa phiếu lập lịch',
    component: MaintenanceSheduleAddPage,
  },
  {
    path: '/maintenance-schedule/detail/:id',
    exact: true,
    name: 'Chi tiết phiếu lập lịch',
    component: MaintenanceSheduleAddPage,
  },
];

export default MaintenanceShedule;
