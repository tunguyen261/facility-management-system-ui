import React from 'react';
import Information from '../../components/add/Information';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import FormSection from 'components/shared/FormSection';
import Status from 'pages/Users/components/add/Status';

function InformationTab({ methods, disabled, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const detailForm = [
    {
      title: 'Thông tin nhân viên',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['address'],
    },
    {
      title: 'Trạng thái',
      isRequired: true,
      id: 'status',
      component: Status,
      fieldActive: ['status'],
    },
  ];
  return (
    <FormProvider {...methods}>
      <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} />
    </FormProvider>
  );
}

export default InformationTab;
