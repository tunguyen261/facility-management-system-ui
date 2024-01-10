import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import {
  getMaintenanceDetail,
  createMaintenance,
  updateMaintenance,
  updateStatusRequest,
  createMaintenanceMulti,
} from './services/call-api';
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import { REQUEST_STATUS } from 'utils/constants';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { urlToList } from 'utils';
import { getAssetDetail } from 'pages/Asset/services/call-api';
import Report from './components/Report/Report';
import InformationMulti from './components/add/InformationMulti';
import RejectModal from 'components/shared/RejectModal';

const MaintenanceAddPage = ({ location }) => {
  const asset_id = location?.state?.asset_id;
  const data_list = location?.state?.data_list;
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
  const [detailFrom, setDetailForm] = useState([]);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);
  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      let label;
      if (id) {
        await updateMaintenance(payload);
        label = 'Chỉnh sửa';
      } else {
        if (payload?.form_mutil?.length > 0) {
          await createMaintenanceMulti(payload?.form_mutil);
          label = 'Thêm mới';
        } else {
          await createMaintenance(payload);
          label = 'Thêm mới';
        }
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
      getMaintenanceDetail(id)
        .then((value) => {
          setReportedData(value?.data?.reports);
          methods.reset(value.data);
          methods.setValue('category_id', value.data.category.id);
          methods.setValue('type_id', value.data.asset_type.id);
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

  const loadAssetData = useCallback(() => {
    if (asset_id) {
      setLoading(true);
      getAssetDetail(asset_id)
        .then((value) => {
          methods.reset(value.data);
          setReportedData(value?.data?.media_file);
          methods.setValue('category_id', value?.data?.category?.id);
          methods.setValue('type_id', value?.data?.asset_type?.id);
          methods.setValue('asset_id', value?.data?.id);
          methods.setValue('status', 1);
          methods.setValue('priority', 3);
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
      const _data_list = data_list?.map((item) => ({
        ...item,
        category_id: item?.category?.id,
        asset_id: item?.id,
        status: 1,
        description: null,
        priority: 3,
        status: 1,
      }));
      methods.setValue('form_list', data_list);
      methods.setValue('form_mutil', _data_list);
    }
  }, [id, methods]);

  useEffect(loadAssetData, [loadAssetData]);

  const path = urlToList(useLocation().pathname)[0];

  const goToEditPath = (e) => {
    e.preventDefault();
    history.push(`${path}/edit/${id}`);
  };

  const initialDetailForm = [
    {
      title: 'Thông tin phiếu yêu cầu',
      isRequired: true,
      id: 'information',
      hidden: data_list?.length > 0,
      component: Information,
      fieldActive: ['description'],
    },
    {
      title: 'Thông tin phiếu yêu cầu',
      isRequired: true,
      hidden: !data_list?.length,
      id: 'information',
      component: InformationMulti,
      fieldActive: ['description'],
    },
    // {
    //   title: 'Báo cáo',
    //   id: 'report',
    //   hidden: isAdd,
    //   component: Report,
    //   reporterdData: reportedData,
    // },
  ];

  const handleDetailForm = () => {
    const newDetailForm = [...initialDetailForm];

    reportedData?.forEach((item, idx) =>
      newDetailForm.push({
        title: `Báo cáo lần thứ ${reportedData.length - idx}`,
        id: `report`,
        hidden: isAdd,
        component: Report,
        reporterdData: item,
      }),
    );

    setDetailForm(newDetailForm);
  };

  useEffect(handleDetailForm, [reportedData]);

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
            setIsOpenRejectModal(true);
            // const res = updateStatusRequest(methods.watch('id'),{ status : REQUEST_STATUS.Cancelled});
            // loadData();
            // showToast.success(res.message)
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
        actions={actions}
        loading={loading}
        disabled={disabled}
        detailForm={detailFrom}
        onSubmit={onSubmit}
      />
      {isOpenRejectModal && (
        <RejectModal
          id={methods.watch('id')}
          handleReject={updateStatusRequest}
          title={'Lý do từ chối'}
          confirmText={'Từ chối'}
          rejectText={'Yêu cầu báo cáo lại'}
          onClose={() => setIsOpenRejectModal(false)}
        />
      )}
    </FormProvider>
  );
};

export default MaintenanceAddPage;
