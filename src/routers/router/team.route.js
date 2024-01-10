import React from 'react';

const TeamPage = React.lazy(() => import('pages/Team/TeamPage'));
const TeamAddPage = React.lazy(() => import('pages/Team/TeamAddPage'));

const team = [
  {
    path: '/team',
    exact: true,
    name: 'Danh sách team',
    component: TeamPage,
  },
  {
    path: '/team/add',
    exact: true,
    name: 'Thêm mới team',
    component: TeamAddPage,
  },
  {
    path: '/team/edit/:id',
    exact: true,
    name: 'Chỉnh sửa thông tin team',
    component: TeamAddPage,
  },
  {
    path: '/team/detail/:id',
    exact: true,
    name: 'Chi tiết thông tin team',
    component: TeamAddPage,
  },
];

export default team;
