import React from 'react';

const BrandPage = React.lazy(() => import('pages/Brand/BrandPage'));
const BrandAddPage = React.lazy(() => import('pages/Brand/BrandAddPage'));

const brand = [
  {
    path: '/brand',
    exact: true,
    name: 'Danh sách nhãn hiệu',
    component: BrandPage,
  },
  {
    path: '/brand/add',
    exact: true,
    name: 'Thêm mới nhãn hiệu',
    component: BrandAddPage,
  },
  {
    path: '/brand/edit/:id',
    exact: true,
    name: 'Chỉnh sửa nhãn hiệu',
    component: BrandAddPage,
  },
  {
    path: '/brand/detail/:id',
    exact: true,
    name: 'Chi tiết nhãn hiệu',
    component: BrandAddPage,
  },
];

export default brand;
