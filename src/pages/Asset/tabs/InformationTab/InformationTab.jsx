import React from 'react'
import Information from '../../components/add/Information';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import FormSection from 'components/shared/FormSection';
import Images from './Images';
function InformationTab({methods, disabled, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const detailForm = [
        {
          title: 'Thông tin trang thiết bị',
          isRequired: true,
          id: 'information',
          component: Information,
          fieldActive: ['asset_name'],
        },
        // {
        //   title: 'Ảnh trang thiết bị',
        //   isRequired: true,
        //   id: 'image',
        //   component: Images,
        //   fieldActive: ['image_url'],
        // },
      ]; 
  return (
    <FormProvider {...methods}>
    <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} />
  </FormProvider>
  )
}

export default InformationTab