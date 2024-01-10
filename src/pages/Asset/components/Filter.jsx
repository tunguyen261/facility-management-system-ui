import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, showToast, statusTypesOption } from 'utils/helpers';
import FormDateRange from 'components/shared/CAFormControl/FormDateRange'
import { ASSET_STATUS_OPTIONS, MOVABLE_OPTION } from 'utils/constants';
import { getAssetTypeOpts } from '../services/call-api';
const Filter = ({ onChange }) => {
  const methods = useForm();
  const [assetType, setAssetType] = useState([]);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 100,
    is_movable: undefined,
    status: undefined,
    type_id: undefined,
  });
  const loadAssetTypeOtps = useCallback(()=>{
    getAssetTypeOpts(params)
    .then((res) => setAssetType(res?.data))
    .catch(err => showToast(err?.message || 'Có lỗi xảy ra'))
  },[params])
  useEffect(loadAssetTypeOtps,[loadAssetTypeOtps])
  useEffect(() => {
    methods.reset({
      is_active: 1,
    });
  }, [methods]);


  return (
    <FormProvider {...methods}>
      <FilterSearchBar
        // expanded={false}
        title='Tìm kiếm'
        onSubmit={onChange}
        onClear={() =>
          onChange({
            keyword: undefined,
            is_active: 1,
            is_movable: undefined,
            status: undefined,
            type_id: undefined,
            create_at_from: undefined,
            create_at_to: undefined,
          })
        }
        actions={[
          {
            title: 'Từ khóa',
            component: <FormInput placeholder={'Tên loại trang thiết bị'} field='keyword' />,
          },
          {
            title: 'Trạng thái',
            component: (
              <FormSelect
                list={ASSET_STATUS_OPTIONS}
                field='status'
              />
            ),
          }, 
          {
            title: 'Di dời',
            component: (
              <FormSelect
                list={mapDataOptions4Select(MOVABLE_OPTION,'value','name')}
                field='is_movable'
              />
            ),
          },{
            title: 'Loại trang thiết bị',
            component: (
              <FormSelect
                list={mapDataOptions4Select(assetType,'value','type_name')}
                field='type_id'
              />
            ),
          }, 
          {
            title: 'Ngày tạo',
            component: (
              <FormDateRange
                allowClear={true}
                fieldStart={'create_at_from'}
                fieldEnd={'create_at_to'}
                placeholder={['Từ ngày', 'Đến ngày']}
                format={'DD/MM/YYYY'}
              />
            ),
          },       
        ]}
        colSize={4}
      />
    </FormProvider>
  );
};

export default Filter;
