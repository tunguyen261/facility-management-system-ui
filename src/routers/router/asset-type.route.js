import React from 'react';

const AssetTypePage = React.lazy(() => import('pages/AssetType/AssetTypePage'));
const AssetTypeAddPage = React.lazy(() => import('pages/AssetType/AssetTypeAddPage'));

const assetType = [
  {
    path: '/asset-type',
    exact: true,
    name: 'Danh sách loại trang thiết bị',
    component: AssetTypePage,
  },
  {
    path: '/asset-type/add',
    exact: true,
    name: 'Thêm mới loại trang thiết bị',
    component: AssetTypeAddPage,
  },
  {
    path: '/asset-type/edit/:id',
    exact: true,
    name: 'Chỉnh sửa loại trang thiết bị',
    component: AssetTypeAddPage,
  },
  {
    path: '/asset-type/detail/:id',
    exact: true,
    name: 'Chi tiết loại trang thiết bị',
    component: AssetTypeAddPage,
  },
];

export default assetType;
