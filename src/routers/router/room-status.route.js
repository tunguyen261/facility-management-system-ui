import React from 'react';

const RoomStatusPage = React.lazy(() => import('pages/RoomStatus/RoomStatusPage'));
const RoomStatusAddPage = React.lazy(() => import('pages/RoomStatus/RoomStatusAddPage'));

const roomstatus = [
  {
    path: '/room-status',
    exact: true,
    name: 'Danh sách trạng thái phòng',
    component: RoomStatusPage,
  },
  {
    path: '/room-status/add',
    exact: true,
    name: 'Thêm mới trạng thái phòng',
    component: RoomStatusAddPage,
  },
  {
    path: '/room-status/edit/:id',
    exact: true,
    name: 'Chỉnh sửa trạng thái phòng',
    component: RoomStatusAddPage,
  },
  {
    path: '/room-status/detail/:id',
    exact: true,
    name: 'Chi tiết trạng thái phòng',
    component: RoomStatusAddPage,
  },
];

export default roomstatus;
