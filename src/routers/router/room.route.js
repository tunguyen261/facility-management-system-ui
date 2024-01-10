import React from 'react';

const RoomPage = React.lazy(() => import('pages/Rooms/RoomPage'));
const RoomAddPage = React.lazy(() => import('pages/Rooms/RoomAddPage'));

const room = [
  {
    path: '/room',
    exact: true,
    name: 'Danh sách phòng',
    component: RoomPage,
  },
  {
    path: '/room/add',
    exact: true,
    name: 'Thêm mới phòng',
    component: RoomAddPage,
  },
  {
    path: '/room/edit/:id',
    exact: true,
    name: 'Chỉnh sửa phòng',
    component: RoomAddPage,
  },
  {
    path: '/room/detail/:id',
    exact: true,
    name: 'Chi tiết phòng',
    component: RoomAddPage,
  },
];

export default room;
