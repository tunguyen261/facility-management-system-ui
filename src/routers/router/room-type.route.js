import React from 'react';

const RoomTypePage = React.lazy(() => import('pages/RoomType/RoomTypePage'));
const RoomTypeAddPage = React.lazy(() => import('pages/RoomType/RoomTypeAddPage'));

const roomType = [
  {
    path: '/room-type',
    exact: true,
    name: 'Danh sách loại phòng',
    component: RoomTypePage,
  },
  {
    path: '/room-type/add',
    exact: true,
    name: 'Thêm mới loại phòng',
    component: RoomTypeAddPage,
  },
  {
    path: '/room-type/edit/:id',
    exact: true,
    name: 'Chỉnh sửa loại phòng',
    component: RoomTypeAddPage,
  },
  {
    path: '/room-type/detail/:id',
    exact: true,
    name: 'Chi tiết loại phòng',
    component: RoomTypeAddPage,
  },
];

export default roomType;
