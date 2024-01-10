import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { getMaintenanceScheduleDetail , createMaintenanceSchedule, updateMaintenanceSchedule} from './services/call-api'
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import AssetList from './components/AssetList/AssetList';

const MaintenanceScheduleAddPage = () => {
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
      setLoading(true);
      let label;
      if (id) {
        await updateMaintenanceSchedule(payload);
        label = 'Chỉnh sửa';
      } else {
        await createMaintenanceSchedule(payload);
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
      getMaintenanceScheduleDetail(id)
        .then((value) => {
          value.data.asset_ids = value?.data?.assets;
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


  const detailForm = [
    {
      title: 'Thông tin maintenanceschedule',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['description',],
    },
    {
        title: 'Danh sách trang thiết bị',
        isRequired: true,
        id: 'ca_asset_list',
        disabled: disabled,
        component: AssetList,
        fieldActive: ['asset_ids',],
      },
  ];

  return (
    <FormProvider {...methods}>
      <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default MaintenanceScheduleAddPage;
