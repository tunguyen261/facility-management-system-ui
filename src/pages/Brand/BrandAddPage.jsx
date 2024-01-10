import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import FormSection from 'components/shared/FormSection';
import { getBrandDetail , createBrand, updateBrand} from './services/call-api'
import { showToast, uploadFile } from 'utils/helpers';
import Information from './components/add/Information';

const BrandAddPage = () => {
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
      // const file = payload?.image_file[0];
      //   const url = await uploadFile(file);
      //   payload.image_url = url;
      let label;
      if (id) {
        await updateBrand(payload);
        label = 'Chỉnh sửa';
      } else {
        await createBrand(payload);
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
      getBrandDetail(id)
        .then((value) => {
          value.data.image_url = Array.isArray( value?.data?.image_url) ?  value?.data?.image_url : [ value?.data?.image_url]
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
      title: 'Thông tin nhãn hiệu',
      isRequired: true,
      id: 'information',
      component: Information,
      fieldActive: ['description',],
    },
  ];

  return (
    <FormProvider {...methods}>
      <FormSection loading={loading} disabled={disabled} detailForm={detailForm} onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default BrandAddPage;
