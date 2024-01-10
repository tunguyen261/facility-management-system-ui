import React from 'react';

const CategoryPage = React.lazy(() => import('pages/Category/CategoryPage'));
const CategoryAddPage = React.lazy(() => import('pages/Category/CategoryAddPage'));

const Category = [
  {
    path: '/category',
    exact: true,
    name: 'Danh sách nhóm trang thiết bị',
    component: CategoryPage,
  },
  {
    path: '/category/add',
    exact: true,
    name: 'Thêm mới nhóm trang thiết bị',
    component: CategoryAddPage,
  },
  {
    path: '/category/edit/:id',
    exact: true,
    name: 'Chỉnh sửa nhóm trang thiết bị',
    component: CategoryAddPage,
  },
  {
    path: '/category/detail/:id',
    exact: true,
    name: 'Chi tiết nhóm trang thiết bị',
    component: CategoryAddPage,
  },
];

export default Category;
