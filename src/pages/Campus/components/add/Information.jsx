import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select } from 'utils/helpers';

const Information = ({ disabled, title }) => {
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Mã campus' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='campus_code'
              placeholder='Nhập mã campus'
              validation={{
                required: 'Mã campus là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Tên campus' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='campus_name'
              placeholder='Nhập tên campus'
              validation={{
                required: 'Tên campus là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Phone number' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='telephone'
              placeholder='Nhập phone number'
            />
          </FormItem>
          <FormItem className='ca_col_12' label='Địa chỉ' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='address'
              placeholder='Nhập địa chỉ'
              validation={{
                required: 'Địa chỉ là bắt buộc',
              }}
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
