import React from 'react';

const RoomAssetPage = React.lazy(() => import('pages/RoomAsset/RoomAssetPage'));
const RoomAssetAddPage = React.lazy(() => import('pages/RoomAsset/RoomAssetAddPage'));

const asset = [
  {
    path: '/room-asset',
    exact: true,
    name: 'Danh sách định vị trang thiết bị',
    component: RoomAssetPage,
  },
  {
    path: '/room-asset/add',
    exact: true,
    name: 'Thêm mới trang thiết bị',
    component: RoomAssetAddPage,
  },
  {
    path: '/room-asset/edit/:id',
    exact: true,
    name: 'Chỉnh sửa trang thiết bị',
    component: RoomAssetAddPage,
  },
  {
    path: '/room-asset/detail/:id',
    exact: true,
    name: 'Chi tiết trang thiết bị',
    component: RoomAssetAddPage,
  },
];

export default asset;
