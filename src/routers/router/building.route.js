import React from 'react';

const BuildingPage = React.lazy(() => import('pages/Building/BuildingPage'));
const BuildingAddPage = React.lazy(() => import('pages/Building/BuildingAddPage'));

const building = [
  {
    path: '/building',
    exact: true,
    name: 'Danh sách tòa nhà',
    component: BuildingPage,
  },
  {
    path: '/building/add',
    exact: true,
    name: 'Thêm mới tòa nhà',
    component: BuildingAddPage,
  },
  {
    path: '/building/edit/:id',
    exact: true,
    name: 'Chỉnh sửa tòa nhà',
    component: BuildingAddPage,
  },
  {
    path: '/building/detail/:id',
    exact: true,
    name: 'Chi tiết tòa nhà',
    component: BuildingAddPage,
  },
];

export default building;
