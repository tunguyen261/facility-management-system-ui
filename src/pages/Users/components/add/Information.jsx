import React, { useCallback, useEffect, useMemo, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { getBase64, mapDataOptions4Select, showToast } from 'utils/helpers';
import { USERROLE_OPTIONS } from 'pages/Users/utils/constants';
import ErrorMessage from 'components/shared/CAFormControl/ErrorMessage';
import { useFormContext } from 'react-hook-form';
import { GENDER_OPTIONS } from 'utils/constants';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
// import { getCampusList } from 'services/campus.service';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });
  const methods = useFormContext();
  const { watch, setError, setValue, register } = methods;
  const { pathname } = useLocation();
  const isEdit = useMemo(() => pathname.toLowerCase().includes('/edit'));
  const handleFileUpload = async (_) => {
    if (_) {
      const avatar = _.target.files[0];
      const { size } = avatar;
      if (size / 1000 > 500) {
        setError('avatar', { type: 'custom', message: 'Dung lượng ảnh vượt quá 500kb.' });
        return;
      }
      const getFile = await getBase64(avatar);
      methods.clearErrors('avatar');
      setValue('default_file', _.target.files[0]);
      setValue('avatar', getFile);
    }
  };

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <div className='ca_col_4'>
            <div className='ca_load_image ca_mb_2 ca_text_center'>
              <label className='ca_choose_image'>
                <input
                  type='file'
                  field='avatar'
                  name='avatar'
                  accept='image/*'
                  onChange={(_) => handleFileUpload(_, 'avatar')}
                  disabled={disabled}
                />
                {watch('avatar')?.length ? (
                  <img style={{ width: '100%' }} src={watch('avatar') ?? ''}></img>
                ) : (
                  <span className='fi fi-rr-picture' />
                )}
              </label>
              <p>Kích thước ảnh: 500px*500px.</p>
              <p>Dung lượng tối đa: 500kb</p>
              {methods.formState.errors['avatar'] && (
                <ErrorMessage message={methods.formState.errors['avatar']?.message} />
              )}
            </div>
          </div>
          <FormItem className='ca_col_4' label='Mã nhân viên' isRequired disabled={disabled || isEdit}>
            <FormInput
              type='text'
              field='user_code'
              placeholder='Nhập mã nhân viên'
              validation={{
                required: 'Mã nhân viên là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Tên nhân viên' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='fullname'
              placeholder='Nhập tên nhân viên'
              validation={{
                required: 'Tên nhân viên là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Chức vụ' isRequired disabled={disabled}>
            <FormSelect
              field='role'
              list={mapDataOptions4Select(USERROLE_OPTIONS, 'value', 'label')}
              validation={{
                required: 'Chức vụ là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Email' isRequired disabled={disabled || isEdit}>
            <FormInput
              type='text'
              field='email'
              placeholder='Nhập email nhân viên'
              validation={{
                required: 'Email nhân viên là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Số điện thoại' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='phone_number'
              placeholder='Nhập số điện thoại nhân viên'
              validation={{
                required: 'Số điện thoại nhân viên là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Giới tính' isRequired disabled={disabled}>
            <FormSelect
              field='gender'
              list={mapDataOptions4Select(GENDER_OPTIONS, 'value', 'label')}
              onChange={(value) => {
                setValue('gender', value);
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='CMND/CCCD' disabled={disabled}>
            <FormInput type='text' field='personal_identify_number' placeholder='Nhập số điện thoại nhân viên' />
          </FormItem>
          <FormItem className='ca_col_4' label='Ngày sinh' disabled={disabled}>
            <FormDatePicker disabled={disabled} type='text' field='dob' placeholder='Nhập ngày sinh của nhân viên' />
          </FormItem>
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Địa chỉ'>
            <FormTextArea field='address' rows={3} placeholder='Nhập địa chỉ' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
