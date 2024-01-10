import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { createFloor, getFloorDetail, updateFloor } from 'services/floor.service';
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import {
  createInventoryCheck,
  getInventoryCheckDetail,
  updateInventoryCheck,
  updateStatusRequest,
} from './services/call-api';
import RoomImport from './components/add/RoomList/RoomImport';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { REQUEST_STATUS } from 'utils/constants';
import Report from './components/Report/Report';
import { urlToList } from 'utils';
const InventoryCheckAddPage = () => {
  const methods = useForm({
    defaultValues: {
      is_active: 1,
    },
  });
  const { pathname } = useLocation();
  const { id } = useParams();
  const [reportedData, setReportedData] = useState();
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
        await updateInventoryCheck(payload);
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
    if (id) {
      setLoading(true);
      getInventoryCheckDetail(id)
        .then((value) => {
          setReportedData(value?.data?.media_file);
          value.data.rooms = value.data.rooms.map((item) => ({ ...item, room_status: item.status.status_name }));
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
        is_internal: true,
        priority: 3,
        status: 1,
      });
    }
  }, [id, methods]);

  useEffect(loadData, [loadData]);

  const detailForm = [
    {
      title: 'Thông tin phiếu',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['description'],
    },
    {
      id: 'rooms',
      title: 'Danh sách các phòng trong đợt kiểm kê',
      component: RoomImport,
      fieldActive: ['rooms[0]'],
    },
    // {
    //   title: 'Báo cáo',
    //   id: 'report',
    //   hidden: isAdd,
    //   component: Report,
    //   reporterdData: reportedData,
    // },
  ];
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
          hidden: methods.watch('status') != REQUEST_STATUS.NotStart,
          content: 'Chỉnh sửa',
          onClick: (event) => goToEditPath(event),
        },
        {
          globalAction: true,
          icon: 'fi fi-rr-check',
          type: 'warning',
          hidden: methods.watch('status') !== REQUEST_STATUS.Reported,
          content: 'Chấp nhận',
          onClick: async () => {
            const res = await updateStatusRequest(methods.watch('id'), { status: REQUEST_STATUS.Done });
            loadData();
            showToast.success(res.message);
          },
        },
        {
          globalAction: true,
          icon: 'fi fi-rr-receipt',
          type: 'warning',
          hidden: methods.watch('status') !== REQUEST_STATUS.Reported,
          content: 'Từ chối',
          onClick: async () => {
            const res = updateStatusRequest(methods.watch('id'), { status: REQUEST_STATUS.Cancelled });
            loadData();
            showToast.success(res.message);
          },
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
  }, [pathname, methods.watch('status'), methods.watch('id')]);

  return (
    <FormProvider {...methods}>
      <FormSection
        loading={loading}
        disabled={disabled}
        detailForm={detailForm}
        onSubmit={onSubmit}
        actions={actions}
      />
    </FormProvider>
  );
};

export default InventoryCheckAddPage;
