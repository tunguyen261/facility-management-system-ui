import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, mapDataOptions4SelectMoreField, showToast } from 'utils/helpers';
import { getCategoryList } from 'pages/Category/services/call-api';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { REQUEST_STATUS } from 'pages/Maintenance/utils/constants';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { getAssetTypeList } from 'pages/AssetType/services/call-api';
import { getAssetList } from 'pages/Asset/services/call-api';
import { getListUser, getListUserByCategory } from 'pages/Users/services/call-api';
import { REQUEST_TYPE } from 'pages/Repairation/utils/constants';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useMemo } from 'react';

const InformationMulti = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const [categoryList, setcategoryList] = useState([]);
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const loadCategory = useCallback(() => {
    setLoading(true);
    getCategoryList(params)
      .then((res) => {
        setcategoryList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadCategory, [loadCategory]);

  const loadAssetTypeOpts = useCallback(() => {
    getAssetTypeList({ category_id: watch('category_id') })
      .then((res) => {
        setAssetTypeList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadAssetTypeOpts, [loadAssetTypeOpts, watch('category_id')]);

  const loadAssetOpts = useCallback(() => {
    getAssetList(params)
      .then((res) => {
        setAssetList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadAssetOpts, [loadAssetOpts, watch('type_id')]);

  const loadUserOpts = useCallback(() => {
    getListUser()
      .then((res) => {
        const _user = res?.data.filter((i) => i?.role === 3);
        setUserList(_user);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadUserOpts, [loadUserOpts]);
  const { control } = methods;
  const { fields } = useFieldArray({
    control,
    name: 'form_mutil',
  });
  return (
    <>
      {(watch('form_list') || [{}]).map((item, idx) => {
        return (
          <CAAccordion title={title} key={idx}>
            <div className='ca_col_12'>
              <div className='ca_row'>
                {!isAdd && (
                  <FormItem className='ca_col_4' label='Mã yêu cầu' disabled={true}>
                    <FormInput type='text' field={`form_mutil.${idx}.request_code`} placeholder='Nhập mã yêu cầu' />
                  </FormItem>
                )}
                <FormItem className='ca_col_4' label='Phạm vi thực hiện' isRequired disabled={disabled}>
                  <FormSelect
                    list={mapDataOptions4Select(REQUEST_TYPE, 'value', 'label')}
                    field={`form_mutil.${idx}.is_internal`}
                    disabled={disabled}
                  />
                </FormItem>
                <FormItem className='ca_col_4' label='Nhóm trang thiết bị' isRequired disabled={disabled}>
                  <FormSelect
                    list={mapDataOptions4Select(categoryList, 'id', 'category_name')}
                    field={`form_mutil.${idx}.category_id`}
                    disabled={disabled}
                    onChange={(value) => {
                      setValue(`form_mutil.${idx}.category_id`, value);
                      setValue(`form_mutil.${idx}.type_id`, null);
                      setValue(`form_mutil.${idx}.asset_id`, null);
                    }}
                  />
                </FormItem>
                <FormItem
                  className='ca_col_4'
                  label='Loại trang thiết bị'
                  isRequired
                  disabled={disabled || !watch(`form_mutil.${idx}.category_id`)}>
                  <FormSelect
                    field={`form_mutil.${idx}.type_id`}
                    list={mapDataOptions4Select(assetTypeList, 'id', 'type_name')}
                    disabled={disabled}
                  />
                </FormItem>
                <FormItem
                  className='ca_col_4'
                  label='Thiết bị'
                  isRequired
                  disabled={disabled || !watch(`form_mutil.${idx}.type_id`)}>
                  <FormSelect
                    list={mapDataOptions4SelectMoreField(assetList, 'id', 'asset_name', 'asset_code')}
                    field={`form_mutil.${idx}.asset_id`}
                    disabled={disabled}
                  />
                </FormItem>
                <FormItem className='ca_col_4' label='Nhân viên sửa chữa' isRequired disabled={false}>
                  <FormSelect
                    field={`form_mutil.${idx}.assigned_to`}
                    list={mapDataOptions4Select(userList, 'id', 'fullname')}
                    disabled={disabled}
                  />
                </FormItem>
                <FormItem
                  className='ca_col_4'
                  label='Trạng thái'
                  isRequired
                  disabled={true || watch(`form_mutil.${idx}.is_internal`)}>
                  <FormSelect
                    field={`form_mutil.${idx}.status`}
                    list={mapDataOptions4Select(REQUEST_STATUS, 'value', 'label')}
                    disabled={disabled}
                  />
                </FormItem>
                {/* <FormItem className='ca_col_4' label='Ngày yêu cầu' isRequired disabled={disabled}>
          <FormDatePicker
              disabled={disabled}
              type='text'
              field='request_date'
              placeholder='Nhập ngày yêu cầu'
            />
          </FormItem> */}
              </div>
              <div className='ca_row'>
                <FormItem className='ca_col_12' label='Mô tả'>
                  <FormTextArea
                    field={`form_mutil.${idx}.description`}
                    rows={3}
                    placeholder='Mô tả'
                    disabled={disabled}
                  />
                </FormItem>
              </div>
            </div>
          </CAAccordion>
        );
      })}
    </>
  );
};
export default InformationMulti;
