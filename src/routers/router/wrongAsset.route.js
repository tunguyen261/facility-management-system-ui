import React from 'react';

const AssetPage = React.lazy(() => import('pages/WrongAsset/WrongAssetPage'));
const AssetDetailPage = React.lazy(() => import('pages/WrongAsset/WrongAssetDetailPage'));

const wrongAsset = [
  {
    path: '/wrong-asset',
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
//     path: '/wrong-asset/edit/:id',
//     exact: true,
//     name: 'Chỉnh sửa trang thiết bị',
//     component: AssetAddPage,
//   },
  {
    path: '/wrong-asset/detail/:id',
    exact: true,
    name: 'Chi tiết trang thiết bị',
    component: AssetDetailPage,
  },
];

export default wrongAsset;
