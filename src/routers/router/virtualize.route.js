import React from 'react';

const VirtualizePage = React.lazy(() => import('pages/Virtualize/VirtualizePage'));


const Virtualize = [
  {
    path: '/virtualize',
    exact: true,
    name: 'Thông tin chung',
    component: VirtualizePage,
  },

];

export default Virtualize;
