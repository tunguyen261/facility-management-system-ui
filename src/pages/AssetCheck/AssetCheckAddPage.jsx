import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { getAssetCheckDetail, createAssetCheck, updateAssetCheck, updateStatusRequest } from './services/call-api';
import { showToast } from 'utils/helpers';
import Information from './components/add/Information';
import { urlToList } from 'utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { REQUEST_STATUS } from 'utils/constants';
import { getAssetDetail } from 'pages/Asset/services/call-api';
import Report from './components/Report/Report';

const AssetCheckAddPage = ({ location }) => {
  const asset_id = location?.state?.asset_id;
  const methods = useForm({
    defaultValues: {
      is_active: 1,
      is_internal: true,
    },
  });
  const { pathname } = useLocation();
  const { id } = useParams();
  const [detailForm, setDetailForm] = useState([]);
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
        await updateAssetCheck(payload);
        label = 'Chỉnh sửa';
      } else {
        await createAssetCheck(payload);
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
      getAssetCheckDetail(id)
        .then((value) => {
          setReportedData(value?.data?.reports);
          methods.reset(value.data);
          methods.setValue('category_id', value?.data?.category?.id);
          methods.setValue('type_id', value?.data?.asset?.type_id);
          methods.setValue('request_date', value?.data?.created_at);
          methods.setValue('room_id', value?.data?.location?.id);
        })
        .catch((error) => {
          //   showToast.error(error?.message ?? 'Có lỗi xảy ra');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      methods.reset({
        is_active: 1,
        is_internal: true,
        priority: 3,
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
      component: Information,
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
        title: `Báo cáo`,
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
          hidden: methods.watch('status') !== REQUEST_STATUS.NotStart,
          content: 'Chỉnh sửa',
          onClick: (event) => goToEditPath(event),
        },
        // {
        //   globalAction: true,
        //   icon: 'fi fi-rr-check',
        //   type: 'warning',
        //   hidden: methods.watch('status') !== REQUEST_STATUS.Reported,
        //   content: 'Chấp nhận',
        //   onClick: async() => {
        //     const res = await updateStatusRequest(methods.watch('id'),{ status : REQUEST_STATUS.Done});
        //     loadData();
        //     showToast.success(res.message)
        //   },
        // },
        // {
        //   globalAction: true,
        //   icon: 'fi fi-rr-receipt',
        //   type: 'warning',
        //   hidden: methods.watch('status') !== REQUEST_STATUS.Reported,
        //   content: 'Từ chối',
        //   onClick: async() => {
        //     const res = updateStatusRequest(methods.watch('id'),{ status : REQUEST_STATUS.Cancelled});
        //     loadData();
        //     showToast.success(res.message)
        //   },
        // },
      ];
    } else if (isAdd || isEdit) {
      return [
        {
          globalAction: true,
          icon: 'fi fi-rr-check',
          type: 'success',
          content: `Hoàn tất ${isEdit ? 'chỉnh sửa' : 'Khai báo'}`,
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

export default AssetCheckAddPage;
