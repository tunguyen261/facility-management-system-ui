import React from 'react'
import Information from '../components/add/Information';
import Status from '../components/add/Status';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import FormSection from 'components/shared/FormSection';

function InfomationTab({methods, disabled, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const detailForm = [
        {
          title: 'Thông tin phòng',
          isRequired: true,
          id: 'information',
          component: Information,
          fieldActive: ['room_name'],
        },
        {
          title: 'Trạng thái phòng',
          isRequired: true,
          id: 'status',
          component: Status,
          fieldActive: ['status_id'],
        },
      ]; 
  return (
    <FormProvider {...methods}>
    <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} />
  </FormProvider>
  )
}

export default InfomationTab