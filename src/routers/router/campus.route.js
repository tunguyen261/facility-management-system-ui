import React from 'react';

const CampusPage = React.lazy(() => import('pages/Campus/CampusPage'));
const CampusAddPage = React.lazy(() => import('pages/Campus/CampusAddPage'));

const Campus = [
  {
    path: '/campus',
    exact: true,
    name: 'Danh sách campus',
    component: CampusPage,
  },
  {
    path: '/campus/add',
    exact: true,
    name: 'Thêm mới campus',
    component: CampusAddPage,
  },
  {
    path: '/campus/edit/:id',
    exact: true,
    name: 'Chỉnh sửa campus',
    component: CampusAddPage,
  },
  {
    path: '/campus/detail/:id',
    exact: true,
    name: 'Chi tiết campus',
    component: CampusAddPage,
  },
];

export default Campus;
