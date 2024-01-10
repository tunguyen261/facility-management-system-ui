import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterSearchBar from 'components/shared/FilterSearchBar/index';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import FormInput from 'components/shared/CAFormControl/FormInput';
import { mapDataOptions4Select, statusTypesOption } from 'utils/helpers';
import FormDateRange from 'components/shared/CAFormControl/FormDateRange';
import { getBuildingList } from 'services/building.service';
import { getCampusList } from 'services/campus.service';
const Filter = ({ onChange }) => {
  const methods = useForm();
  const [buildingList, setBuildingList] = useState([]);
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  useEffect(() => {
    methods.reset({
      is_active: 1,
    });
  }, [methods]);
  const loadBuildingOptions = useCallback(() => {
    setLoading(true);
    getBuildingList(params)
      .then((res) => {
        setBuildingList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadBuildingOptions, [loadBuildingOptions]);

  const loadCampusOptions = useCallback(() => {
    setLoading(true);
    getCampusList(params)
      .then((res) => {
        setCampusList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadCampusOptions, [loadCampusOptions]);

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
            component: <FormInput placeholder={'Tên tầng'} field='keyword' />,
          },
          {
            title: 'Campus',
            component: <FormSelect field='campus_id' list={mapDataOptions4Select(campusList, 'id', 'campus_name')} />,
          },
          {
            title: 'Tóa',
            component: (
              <FormSelect field='building_id' list={mapDataOptions4Select(buildingList, 'id', 'building_name')} />
            ),
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
