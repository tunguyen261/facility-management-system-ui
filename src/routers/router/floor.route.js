import React from 'react';

const FloorPage = React.lazy(() => import('pages/Floor/FloorPage'));
const FloorAddPage = React.lazy(() => import('pages/Floor/FloorAddPage'));

const Floor = [
  {
    path: '/floor',
    exact: true,
    name: 'Danh sách tầng',
    component: FloorPage,
  },
  {
    path: '/floor/add',
    exact: true,
    name: 'Thêm mới tầng',
    component: FloorAddPage,
  },
  {
    path: '/floor/edit/:id',
    exact: true,
    name: 'Chỉnh sửa tầng',
    component: FloorAddPage,
  },
  {
    path: '/floor/detail/:id',
    exact: true,
    name: 'Chi tiết tầng',
    component: FloorAddPage,
  },
];

export default Floor;
