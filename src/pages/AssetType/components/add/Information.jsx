import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import {UnitOptions} from '../../utils/constants'
import { getCategoryList } from 'pages/Category/services/call-api';
import { INDENTIFY_OPTIONS } from 'utils/constants';
import { useFormContext } from 'react-hook-form';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const [categoryList, setCategoryList] = useState();
  const methods = useFormContext();
  const loadCategory = useCallback(()=>{
      getCategoryList(params)
      .then(res=>setCategoryList(res?.data))
      .catch(err=>showToast(err.message||'Có lỗi xảy ra'))
  },[params])
  

  useEffect(loadCategory,[loadCategory]);

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Mã loại trang thiết bị' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='type_code'
              placeholder='Nhập mã loại trang thiết bị'
              validation={{
                required: 'Mã loại trang thiết bị là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Tên loại trang thiết bị' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='type_name'
              placeholder='Nhập tên loại trang thiết bị'
              validation={{
                required: 'Tên loại trang thiết bị là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='ĐVT' isRequired disabled={disabled}>
            <FormSelect
              field='unit'
              list={mapDataOptions4Select(UnitOptions, 'id', 'unit_name')}
              validation={{
                required: 'ĐVT là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Nhóm trang thiết bị' isRequired disabled={disabled}>
            <FormSelect
              field='category_id'
              list={mapDataOptions4Select(categoryList, 'id', 'category_name')}
              validation={{
                required: 'Nhóm trang thiết bị là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Nhóm trang thiết bị định danh' isRequired disabled={disabled}>
              <label className='ca_checkbox'>
                  <FormInput 
                  disabled={disabled} 
                  type='checkbox'
                  field='is_identified' 
                  onChange ={(ev) => {methods.setValue('is_identified',ev.target.checked)}}
                  />
                  <span />
                  Định danh
                </label>
          </FormItem>
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Mô tả'>
            <FormTextArea field='description' rows={3} placeholder='Mô tả' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
