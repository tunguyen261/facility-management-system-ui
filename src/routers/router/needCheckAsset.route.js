import React from 'react';

const AssetPage = React.lazy(() => import('pages/NeedCheckAsset/NeedCheckAssetPage'));
const AssetAddPage = React.lazy(() => import('pages/Asset/AssetAddPage'));

const needcheckAsset = [
  {
    path: '/need-check-asset',
    exact: true,
    name: 'Danh sách trang thiết bị',
    component: AssetPage,
  },
//   {
//     path: '/asset/add',
//     exact: true,
//     name: 'Thêm mới trang thiết bị',
//     component: AssetAddPage,
//   },
//   {
//     path: '/needcheck-asset/edit/:id',
//     exact: true,
//     name: 'Chỉnh sửa trang thiết bị',
//     component: AssetAddPage,
//   },
  {
    path: '/asset/detail/:id',
    exact: true,
    name: 'Chi tiết trang thiết bị',
    component: AssetAddPage,
  },
];

export default needcheckAsset;
