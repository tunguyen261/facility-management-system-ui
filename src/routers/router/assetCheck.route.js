import React from 'react';

const AssetCheckPage = React.lazy(() => import('pages/AssetCheck/AssetCheckPage'));
const AssetCheckAddPage = React.lazy(() => import('pages/AssetCheck/AssetCheckAddPage'));

const assetcheck = [
  {
    path: '/asset-check',
    exact: true,
    name: 'Danh sách yêu cầu kiểm tra',
    component: AssetCheckPage,
  },
  {
    path: '/asset-check/add',
    exact: true,
    name: 'Thêm mới yêu cầu kiểm tra',
    component: AssetCheckAddPage,
  },
  {
    path: '/asset-check/edit/:id',
    exact: true,
    name: 'Chỉnh sửa yêu cầu kiểm tra',
    component: AssetCheckAddPage,
  },
  {
    path: '/asset-check/detail/:id',
    exact: true,
    name: 'Chi tiết yêu cầu kiểm tra',
    component: AssetCheckAddPage,
  },
];

export default assetcheck;
