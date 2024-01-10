import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, showToast, statusTypesOption } from 'utils/helpers';
import { getFloorList } from 'services/floor.service';

const Filter = ({ onChange }) => {
  const methods = useForm();
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const [floorsList, setFloorsList] = useState();
  useEffect(() => {
    methods.reset({
      is_active: 1,
    });
  }, [methods]);
  const loadFloorOptions = useCallback(() => {
    setLoading(true);
    getFloorList(params)
      .then((res) => {
        setFloorsList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadFloorOptions, [loadFloorOptions]);

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
            component: <FormInput placeholder={'Tên phòng'} field='keyword' />,
          },       
          {
            title: 'Tầng',
            component: <FormSelect field='floor_id' list={mapDataOptions4Select(floorsList, 'id', 'floor_name')} />,
          },
        ]}
        colSize={4}
      />
    </FormProvider>
  );
};

export default Filter;
