import React from 'react';

const DashboardPage = React.lazy(() => import('pages/DashBoard/DashBoardPage'));

const Dashboard = [
  {
    path: '/',
    exact: true,
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    component: DashboardPage,
  },
];

export default Dashboard;
