import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { createRoom, getRoomDetail, updateRoom } from 'services/room.service';
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import Status from './components/add/Status';
import Panel from 'components/shared/Panel/index';
import InfomationTab from './tabs/InfomationTab';
import AssetInRoom from './tabs/AssetInRoomTab/AssetInRoom';


const RoomAddPage = () => {
  const methods = useForm({
    defaultValues: {
      is_active: 1,
    },
  });
  const { pathname } = useLocation();
  const { id } = useParams();

  const disabled = useMemo(() => pathname.includes('/detail'), [pathname]);
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      let label;
      if (id) {
        await updateRoom(payload);
        label = 'Chỉnh sửa';
      } else {
        await createRoom(payload);
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
      getRoomDetail(id)
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
      component: InfomationTab,
      disabled: disabled,
      // disabled: !isEdit,
      methods:methods,
      onSubmit,
    },
    {
      key: 'products',
      label: 'Danh sách trang thiết bị',
      component: AssetInRoom,
      disabled:disabled,
      hidden: isAdd,
      // disabled: !isEdit,
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

export default RoomAddPage;
