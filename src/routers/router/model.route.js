import React from 'react';

const ModelPage = React.lazy(() => import('pages/Model/ModelPage'));
const ModelAddPage = React.lazy(() => import('pages/Model/ModelAddPage'));

const model = [
  {
    path: '/model',
    exact: true,
    name: 'Danh sách dòng sản phẩm',
    component: ModelPage,
  },
  {
    path: '/model/add',
    exact: true,
    name: 'Thêm mới dòng sản phẩm',
    component: ModelAddPage,
  },
  {
    path: '/model/edit/:id',
    exact: true,
    name: 'Chỉnh sửa dòng sản phẩm',
    component: ModelAddPage,
  },
  {
    path: '/model/detail/:id',
    exact: true,
    name: 'Chi tiết dòng sản phẩm',
    component: ModelAddPage,
  },
];

export default model;
