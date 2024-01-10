import React from 'react';

const TransportationPage = React.lazy(() => import('pages/Transportation/TransportationPage'));
const TransportationAddPage = React.lazy(() => import('pages/Transportation/TransportationAddPage'));

const transportation = [
  {
    path: '/transportation',
    exact: true,
    name: 'Danh sách yêu cầu vận chuyển',
    component: TransportationPage,
  },
  {
    path: '/transportation/add',
    exact: true,
    name: 'Thêm mới yêu cầu vận chuyển',
    component: TransportationAddPage,
  },
  {
    path: '/transportation/edit/:id',
    exact: true,
    name: 'Chỉnh sửa yêu cầu vận chuyển',
    component: TransportationAddPage,
  },
  {
    path: '/transportation/detail/:id',
    exact: true,
    name: 'Chi tiết yêu cầu vận chuyển',
    component: TransportationAddPage,
  },
];

export default transportation;
