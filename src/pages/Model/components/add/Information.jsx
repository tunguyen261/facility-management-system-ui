import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { MOVABLE_OPTION, UnitOptions } from 'utils/constants';
import { getAssetTypeOpts } from 'pages/Asset/services/call-api';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { useFormContext } from 'react-hook-form';
import Images from './Images';
import { getBrandList } from 'pages/Brand/services/call-api';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });

  const [brandOpts, setBranhdOpts] = useState([]);

  const loadBrand = useCallback(() => {
    getBrandList(params)
      .then((res) => setBranhdOpts(res?.data))
      .catch((e) => {});
  }, []);
  useEffect(loadBrand, [loadBrand]);
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <Images disabled={disabled} title={'Ảnh dòng sản phẩm'} className='ca_row' />
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='“Mã dòng sản phẩm' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='model_code'
              placeholder='Nhập mã dòng sản phẩm'
              validation={{
                required: 'Mã dòng sản phẩm là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Tên dòng sản phẩm' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='model_name'
              placeholder='Nhập tên dòng sản phẩm'
              validation={{
                required: 'Tên dòng sản phẩm là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Nhãn hiệu' isRequired disabled={disabled}>
            <FormSelect
              field='brand_id'
              list={mapDataOptions4Select(brandOpts, 'id', 'brand_name')}
              validation={{
                required: 'Nhãn hiệu là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Chu kỳ bảo trì (Tháng)' disabled={disabled}>
            <FormInput min={0} type='number' field='maintenance_period_time' placeholder='Nhập chu kỳ bảo trì' />
          </FormItem>
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Mô tả' isRequired>
            <FormTextArea field='description' rows={3} placeholder='Mô tả' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
