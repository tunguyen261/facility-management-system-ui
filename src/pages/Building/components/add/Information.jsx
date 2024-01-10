import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getCampusList } from 'services/campus.service';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });

  const [campusOptionsList, setCampusOptionsList] = useState();

  const [loading, setLoading] = useState(true);
  const loadCampusOption = useCallback(() => {
    setLoading(true);
    getCampusList(params)
      .then((res) => {
        setCampusOptionsList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadCampusOption, [loadCampusOption]);
  // useEffect(()=>{
  //   setCampusOptionsList(mapDataOptions4Select(campusOptions?.items,'id','campus_name'))
  // },[loadCampusOption,campusOptionsList])
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Mã tòa nhà' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='building_code'
              placeholder='Nhập mã tòa nhà'
              validation={{
                required: 'Mã tòa nhà là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Tên tòa nhà' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='building_name'
              placeholder='Nhập tên tòa nhà'
              validation={{
                required: 'Tên tòa nhà là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Campus' isRequired disabled={disabled}>
            <FormSelect
              field='campus_id'
              list={mapDataOptions4Select(campusOptionsList, 'id', 'campus_name')}
              validation={{
                required: 'Campus là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
