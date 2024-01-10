import React from 'react';

const UserPage = React.lazy(() => import('pages/Users/UsersPage'));
const UserAddPage = React.lazy(() => import('pages/Users/UsersAddPage'));

const user = [
  {
    path: '/users',
    exact: true,
    name: 'Danh sách nhân viên',
    component: UserPage,
  },
  {
    path: '/users/add',
    exact: true,
    name: 'Thêm mới nhân viên',
    component: UserAddPage,
  },
  {
    path: '/users/edit/:id',
    exact: true,
    name: 'Chỉnh sửa thông tin nhân viên',
    component: UserAddPage,
  },
  {
    path: '/users/detail/:id',
    exact: true,
    name: 'Chi tiết thông tin nhân viên',
    component: UserAddPage,
  },
];

export default user;
