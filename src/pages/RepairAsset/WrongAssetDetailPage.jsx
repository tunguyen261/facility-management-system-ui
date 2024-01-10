import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { createAsset, getAssetDetail, updateAsset } from './services/call-api';
import { showToast, uploadFile } from 'utils/helpers';
import Information from './components/add/Information';
import InformationTab from './tabs/InformationTab/InformationTab';
import RepairtationHistoryTab from './tabs/RepairtationHistoryTab/RepairtationHistoryTab';
import Panel from 'components/shared/Panel/index';
import HistoryTab from './tabs/MaintenanceTab';
import ReplaceHistoryTab from './tabs/ReplacementTab';
import TransportationTab from './tabs/TransportationTab';

const AssetAddPage = () => {
  const methods = useForm({
    defaultValues: {
      is_active: 1,
    },
  });
  const { pathname } = useLocation();
  const {  id  } = useParams();
  const disabled = useMemo(() => pathname.includes('/detail'), [pathname]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload) => {
    try {
      const is_movable = payload?.is_movable;
      payload.is_movable = (is_movable === 1);
      const file = payload?.image_file[0];
        const url = await uploadFile(file);
        payload.image_url = url;
      
      setLoading(true);
      let label;
      if (id) {
        await updateAsset(payload);
        label = 'Chỉnh sửa';
      } else {
        await createAsset(payload);
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
      getAssetDetail(id)
        .then((value) => {
          value.data.image_url = [value.data.image_url];
          methods.reset({...value?.data});
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
      label: 'Lịch sử sửa chữa',
      component: RepairtationHistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'maintenance',
      label: 'Lịch sử bảo trì',
      component: HistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'replacement',
      label: 'Lịch sử thay thế',
      component: ReplaceHistoryTab,
      // disabled: !isEdit,
      disabled:disabled,
      id:id,
      onSubmit,
    },
    {
      key: 'transporation',
      label: 'Lịch sử vận chuyển',
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

export default AssetAddPage;
