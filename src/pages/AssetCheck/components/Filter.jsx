import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, statusTypesOption } from 'utils/helpers';
import FormDateRange from 'components/shared/CAFormControl/FormDateRange'
import { PRIORRITY_OPTIONS, REQUEST_STATUS, REQUEST_STATUS_OPTIONS } from 'utils/constants';
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
            priority: undefined,
            status: undefined,
          })
        }
        actions={[
          {
            title: 'Từ khóa',
            component: <FormInput placeholder={'Mã phiếu'} field='keyword' />,
          },
          {
            title: 'Độ ưu tiên',
            component: <FormSelect field='priority' list={PRIORRITY_OPTIONS} />,
          },
          {
            title: 'Trạng thái',
            component: <FormSelect field='status' list={REQUEST_STATUS_OPTIONS} />,
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
        ]}
        colSize={4}
      />
    </FormProvider>
  );
};

export default Filter;
