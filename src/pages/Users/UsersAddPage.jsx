import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { createUser, getUserDetail, updateUser } from './services/call-api';
import { showToast, uploadFile } from 'utils/helpers';
import Information from './components/add/Information';
import Panel from 'components/shared/Panel';
import InformationTab from './tabs/InformationTab/InformationTab';
import RepairtationHistoryTab from './tabs/RepairtationHistoryTab/RepairtationHistoryTab';
import HistoryTab from './tabs/MaintenanceTab';
import ReplaceHistoryTab from './tabs/ReplacementTab';
import TransportationTab from './tabs/TransportationTab';

const FloorAddPage = () => {
  const methods = useForm({
    defaultValues: {
      is_active: 1,
    },
  });
  const { pathname } = useLocation();
  const { id } = useParams();

  const disabled = useMemo(() => pathname.includes('/detail'), [pathname]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload) => {
    try {
        const file = payload?.default_file;
        const url = await uploadFile(file);
        payload.avatar = url;
      setLoading(true);
      let label;
      if (id) {
        await updateUser(payload);
        label = 'Chỉnh sửa';
      } else {
        await createUser(payload);
        label = 'Khai báo';
      }
      showToast.success(`${label} thành công`);
    } catch (error) {
      showToast.error(error?.message ?? 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const loadData = useCallback(() => {
    if (id) {
      setLoading(true);
      getUserDetail(id)
        .then((value) => {
          methods.reset(value.data);
        })
        .catch((error) => {
          showToast.error(error?.message ?? 'Có lỗi xảy ra');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      methods.reset({
        is_active: 1,
      });
    }
  }, [id, methods]);

  useEffect(loadData, [loadData]);

  const panel = [
    {
      key: 'information',
      label: 'Thông tin chung',
      component: InformationTab,
      // disabled: !isEdit,
      disabled: disabled,
      methods:methods,
      onSubmit,
    },
    {
      key: 'repairtation',
      label: 'Task lịch sử sửa chữa',
      component: RepairtationHistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'maintenance',
      label: 'Task lịch sử bảo trì',
      component: HistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'replacement',
      label: 'Task lịch sử thay thế',
      component: ReplaceHistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'transporation',
      label: 'Task lịch sử vận chuyển',
      component: TransportationTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className='ca_main_wrapp'>
        <Panel panes={panel} />
      </div>
    </FormProvider>
  );
};

export default FloorAddPage;
