import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { getRoomAssetDetail , createRoomAsset, updateRoomAsset} from './service/call-api'
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const RoomAssetAddPage = ({location}) => {
  const methods = useForm({
    defaultValues: {
      is_active: 1,
    },
  });
  const { pathname } = useLocation();
  const { id } = useParams();
  const roomId = location?.state?.roomId;
  const disabled = useMemo(() => pathname.includes('/detail'), [pathname]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      let label;
      if (id) {
        await updateRoomAsset(payload);
        label = 'Chỉnh sửa';
      } else {
        await createRoomAsset(payload);
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
      getRoomAssetDetail(id)
        .then((value) => {
          methods.reset(value.data);
          methods.setValue('room_id',value.data?.room?.id);
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
      if(roomId){
        methods.setValue('room_id',roomId);
      }
    }
  }, [id, methods]);

  useEffect(loadData, [loadData]);


  const detailForm = [
    {
      title: 'Thông tin trang thiết bị trong phòng',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['asset_id',],
    },
  ];

  return (
    <FormProvider {...methods}>
      <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} customerClose={()=>history.goBack()}/>
    </FormProvider>
  );
};

export default RoomAssetAddPage;
