import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import FormSection from 'components/shared/FormSection';
import { getInventoryCheckDetail, createInventoryCheck, updateInventoryCheck } from './services/call-api';
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import Status from './components/add/Status';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { urlToList } from 'utils';

const RoomAssetAddPage = ({ location }) => {
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
  const isView = useMemo(() => pathname.includes('/detail') || pathname.includes('/view'), [pathname]);
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);
  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      let label;
      if (id) {
        await createInventoryCheck(payload);
        label = 'Chỉnh sửa';
      } else {
        await createInventoryCheck(payload);
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
    if (id || '812a3500-3151-41cc-8326-921cc771b7f6') {
      setLoading(true);
      getInventoryCheckDetail(id || '812a3500-3151-41cc-8326-921cc771b7f6')
        .then((value) => {
          methods.reset(value.data);
          methods.setValue('room_id', value.data?.room?.id);
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
      if (roomId) {
        methods.setValue('room_id', roomId);
      }
    }
  }, [id, methods]);

  useEffect(loadData, [loadData]);
  const path = urlToList(useLocation().pathname)[0];

  const goToEditPath = (e) => {
    e.preventDefault();
    history.push(`${path}/edit/${id}`);
  };
  const actions = useMemo(() => {
    if (isView) {
      return [
        {
          globalAction: true,
          icon: 'fi fi-rr-settings',
          type: 'success',
          content: 'Chỉnh sửa',
          onClick: (event) => goToEditPath(event),
        },
      ];
    } else if (isAdd || isEdit) {
      return [
        {
          globalAction: true,
          icon: 'fi fi-rr-check',
          type: 'success',
          content: ` ${isEdit ? 'Hoàn tất chỉnh sửa' : 'Tạo yêu cầu'}`,
          onClick: async () => await onSubmit(methods.watch()),
        },
      ];
    }
  }, [methods.watch()]);
  const detailForm = [
    {
      title: 'Thông tin cấu hình',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['content'],
    },
    {
      title: 'Trạng thái',
      isRequired: true,
      id: 'status',
      component: Status,
      fieldActive: ['is_active'],
    },
  ];

  return (
    <FormProvider {...methods}>
      <FormSection
        hiddenCloseBtn={true}
        actions={actions}
        loading={loading}
        disabled={disabled}
        detailForm={detailForm}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default RoomAssetAddPage;
