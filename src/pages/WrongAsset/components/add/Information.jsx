import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import {MOVABLE_OPTION, UnitOptions} from 'utils/constants'
import { getAssetTypeOpts } from 'pages/Asset/services/call-api';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { useFormContext } from 'react-hook-form';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const Information = ({ disabled, title }) => {
  const { pathname } = useLocation();
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });
  const [assetType, setAssetType] = useState([]);
  const methods = useFormContext();
  const { setValue ,watch} = methods;
  const loadAssetTypeOtps = useCallback(()=>{
    getAssetTypeOpts(params)
    .then((res) => setAssetType(res?.data))
    .catch(err => showToast(err?.message || 'Có lỗi xảy ra'))
  },[params])

  useEffect(loadAssetTypeOtps,[loadAssetTypeOtps])

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Mã trang thiết bị' isRequired disabled={disabled || isEdit}>
            <FormInput
              type='text'
              field='asset_code'
              placeholder='Nhập mã trang thiết bị'
              validation={{
                required: 'Mã trang thiết bị là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Tên trang thiết bị' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='asset_name'
              placeholder='Nhập tên trang thiết bị'
              validation={{
                required: 'Tên trang thiết bị là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Loại trang thiết bị' isRequired disabled={disabled}>
            <FormSelect
              field='type_id'
              list={mapDataOptions4Select(assetType, 'id', 'type_name')}
              validation={{
                required: 'loại trang thiết bị là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          {/* <FormItem className='ca_col_4' label='ĐVT' isRequired disabled={disabled}>
            <FormSelect
              field='unit'
              list={mapDataOptions4Select(UnitOptions, 'id', 'unit_name')}
              validation={{
                required: 'ĐVT là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem> */}
          <FormItem className='ca_col_4' label='Thời gian bắt đầu sử dụng' disabled={disabled}>
          <FormDatePicker
              disabled={disabled}
              type='text'
              field='start_date_of_use'
              placeholder='Nhập thời gian sử dụng'
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Lần gần nhất kiểm tra' disabled={disabled}>
          <FormDatePicker
              disabled={disabled}
              type='text'
              field='last_checked_date'
              placeholder='Nhập lần gần nhất kiểm tra'
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Có thể di dời' disabled={disabled}>
            <FormSelect
              field='is_movable'
              list={mapDataOptions4Select(MOVABLE_OPTION, 'value', 'name')}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Năm sản xuất' disabled={disabled}>
            <FormInput
                type='number'
                field='manufacturing_year'
                placeholder={'Năm'}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Số series' disabled={disabled || isEdit}>
            <FormInput
                field='serial_number'
                placeholder={'Series'}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Số lượng' disabled={disabled || isEdit}>
            <FormNumber
                field='quantity'
                placeholder={'Số lượng'}
                min={0}
            />
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
