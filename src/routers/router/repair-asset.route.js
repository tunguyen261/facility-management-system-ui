import React from 'react';

const RepairAssetPage = React.lazy(() => import('pages/RepairAsset/WrongAssetPage'));
// const RepairAssetAddPage = React.lazy(() => import('pages/RepairAsset/RepairAssetAddPage'));

const repairasset = [
  {
    path: '/maintenance-asset',
    exact: true,
    name: 'Danh sách trang thiết bị cần bảo trì',
    component: RepairAssetPage,
  },
  // {
  //   path: '/repairasset/add',
  //   exact: true,
  //   name: 'Thêm mới yêu cầu sửa chữa',
  //   component: RepairAssetAddPage,
  // },
  // {
  //   path: '/repairasset/edit/:id',
  //   exact: true,
  //   name: 'Chỉnh sửa yêu cầu sửa chữa',
  //   component: RepairAssetAddPage,
  // },
  // {
  //   path: '/repairasset/detail/:id',
  //   exact: true,
  //   name: 'Chi tiết yêu cầu sửa chữa',
  //   component: RepairAssetAddPage,
  // },
];

export default repairasset;
