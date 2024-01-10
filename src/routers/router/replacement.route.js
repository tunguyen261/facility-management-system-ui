import React from 'react';

const ReplacementPage = React.lazy(() => import('pages/Replacement/ReplacementPage'));
const ReplacementAddPage = React.lazy(() => import('pages/Replacement/ReplacementAddPage'));

const replacement = [
  {
    path: '/replacement',
    exact: true,
    name: 'Danh sách yêu cầu thay thế',
    component: ReplacementPage,
  },
  {
    path: '/replacement/add',
    exact: true,
    name: 'Thêm mới yêu cầu thay thế',
    component: ReplacementAddPage,
  },
  {
    path: '/replacement/edit/:id',
    exact: true,
    name: 'Chỉnh sửa yêu cầu thay thế',
    component: ReplacementAddPage,
  },
  {
    path: '/replacement/detail/:id',
    exact: true,
    name: 'Chi tiết yêu cầu thay thế',
    component: ReplacementAddPage,
  },
];

export default replacement;
