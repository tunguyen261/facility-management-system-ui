import React from 'react';

const AssetPage = React.lazy(() => import('pages/Asset/AssetPage'));
const AssetAddPage = React.lazy(() => import('pages/Asset/AssetAddPage'));

const asset = [
  {
    path: '/asset',
    exact: true,
    name: 'Danh sách trang thiết bị',
    component: AssetPage,
  },
  {
    path: '/asset/add',
    exact: true,
    name: 'Thêm mới trang thiết bị',
    component: AssetAddPage,
  },
  {
    path: '/asset/edit/:id',
    exact: true,
    name: 'Chỉnh sửa trang thiết bị',
    component: AssetAddPage,
  },
  {
    path: '/asset/detail/:id',
    exact: true,
    name: 'Chi tiết trang thiết bị',
    component: AssetAddPage,
  },
];

export default asset;
