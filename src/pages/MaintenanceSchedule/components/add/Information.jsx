import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, mapDataOptions4SelectMoreField, showToast } from 'utils/helpers';
import { getCategoryList } from 'pages/Category/services/call-api';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { REQUEST_STATUS, REQUEST_TYPE } from 'pages/Maintenance/utils/constants';
import { useFormContext } from 'react-hook-form';
import { getAssetTypeList } from 'pages/AssetType/services/call-api';
import { getAssetList } from 'pages/Asset/services/call-api';
import { getListUserByCategory } from 'pages/Users/services/call-api';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useMemo } from 'react';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const methods = useFormContext();
  const { watch, setValue } = methods;


  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);



  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          {!isAdd && <FormItem className='ca_col_4' label='Mã yêu cầu' disabled={disabled}>
            <FormInput
            disabled={disabled}
              type='text'
              field='request_code'
              placeholder='Nhập mã yêu cầu'
            />
          </FormItem>}
          <FormItem className='ca_col_4' label='Khoảng thời gian' disabled={disabled}>
            <FormInput
            disabled={disabled}
              min={0}
              type='number'
              field='repeat_interval_in_months'
              placeholder='Nhập khoảng thời gian'
            />
          </FormItem>


          {/* <FormItem className='ca_col_4' label='Ngày yêu cầu' disabled={disabled}>
          <FormDatePicker
              type='text'
              field='request_date'
              placeholder='Nhập ngày yêu cầu'
            />
          </FormItem> */}
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Mô tả' disabled={disabled}>
            <FormTextArea field='description' rows={3} placeholder='Mô tả' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
