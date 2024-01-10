import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, statusTypesOption } from 'utils/helpers';
import FormDateRange from 'components/shared/CAFormControl/FormDateRange'
const Filter = ({ onChange }) => {
  const methods = useForm();

  useEffect(() => {
    methods.reset({
      is_active: 1,
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
            company_id: undefined,
          })
        }
        actions={[
          {
            title: 'Từ khóa',
            component: <FormInput placeholder={'Tên tòa nhà'} field='keyword' />,
          },
          // {
          //   title: 'Ngày tạo',
          //   component: (
          //     <FormDateRange
          //       allowClear={true}
          //       fieldStart={'create_at_from'}
          //       fieldEnd={'create_at_to'}
          //       placeholder={['Từ ngày', 'Đến ngày']}
          //       format={'DD/MM/YYYY'}
          //     />
          //   ),
          // },       
          // {
          //   title: 'Trạng thái',
          //   component: <FormSelect field='is_active' list={statusTypesOption} />,
          // },
        ]}
        colSize={4}
      />
    </FormProvider>
  );
};

export default Filter;
