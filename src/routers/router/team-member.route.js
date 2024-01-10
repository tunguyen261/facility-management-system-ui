import React from 'react';

const TeamMemberPage = React.lazy(() => import('pages/TeamMember/TeamMemberPage'));
const TeamMemberAddPage = React.lazy(() => import('pages/TeamMember/TeamMemberAddPage'));

const TeamMember = [
  {
    path: '/team-member',
    exact: true,
    name: 'Danh sách thành viên nhóm',
    component: TeamMemberPage,
  },
  {
    path: '/team-member/add',
    exact: true,
    name: 'Thêm mới thành viên nhóm',
    component: TeamMemberAddPage,
  },
  {
    path: '/team-member/edit/:id',
    exact: true,
    name: 'Chỉnh sửa thành viên nhóm',
    component: TeamMemberAddPage,
  },
  {
    path: '/team-member/detail/:id',
    exact: true,
    name: 'Chi tiết thành viên nhóm',
    component: TeamMemberAddPage,
  },
];

export default TeamMember;
