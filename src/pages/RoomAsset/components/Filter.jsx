import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, statusTypesOption } from 'utils/helpers';
import FormDateRange from 'components/shared/CAFormControl/FormDateRange'
import { ASSET_STATUS_OPTIONS } from 'utils/constants';
const Filter = ({ onChange }) => {
  const methods = useForm();

  useEffect(() => {
    methods.reset({
      is_active: 1,
      is_in_current: true
    });
  }, [methods]);


  return (
    <FormProvider {...methods}>
      <FilterSearchBar
        title='Tìm kiếm'
        onSubmit={onChange}
        onClear={() =>
          onChange({
            keyword: undefined,
            is_active: 1,
            created_date_from: undefined,
            created_date_to: undefined,
          })
        }
        actions={[
          {
            title: 'Từ khóa',
            component: <FormInput placeholder={'Tên trang thiết bị, tên phòng'} field='keyword' />,
          },  
          {
            title: 'Trạng thái',
            component: (
              <FormSelect
                list={mapDataOptions4Select(ASSET_STATUS_OPTIONS,'value','name')}
                field='status'
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
