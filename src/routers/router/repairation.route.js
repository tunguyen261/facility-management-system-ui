import React from 'react';

const RepairationPage = React.lazy(() => import('pages/Repairation/RepairationPage'));
const RepairationAddPage = React.lazy(() => import('pages/Repairation/RepairationAddPage'));

const repairation = [
  {
    path: '/repairation',
    exact: true,
    name: 'Danh sách yêu cầu sửa chữa',
    component: RepairationPage,
  },
  {
    path: '/repairation/add',
    exact: true,
    name: 'Thêm mới yêu cầu sửa chữa',
    component: RepairationAddPage,
  },
  {
    path: '/repairation/edit/:id',
    exact: true,
    name: 'Chỉnh sửa yêu cầu sửa chữa',
    component: RepairationAddPage,
  },
  {
    path: '/repairation/detail/:id',
    exact: true,
    name: 'Chi tiết yêu cầu sửa chữa',
    component: RepairationAddPage,
  },
];

export default repairation;
