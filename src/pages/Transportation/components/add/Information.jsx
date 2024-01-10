import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getCategoryList } from 'pages/Category/services/call-api';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { REQUEST_STATUS } from 'pages/Maintenance/utils/constants';
import { useFormContext } from 'react-hook-form';
import { getAssetTypeList } from 'pages/AssetType/services/call-api';
import { getAssetList } from 'pages/Asset/services/call-api';
import { getListUser, getListUserByCategory } from 'pages/Users/services/call-api';
import { getRoomList, getRoomOptionsCBX } from 'services/room.service';
import { REQUEST_TYPE } from 'pages/Transportation/utils/constants';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useMemo } from 'react';
import { PRIORRITY_OPTIONS } from 'utils/constants';
import Attachments from 'pages/Repairation/components/add/Attachment';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const [assetTypeList, setAssetTypeList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const { pathname } = useLocation();
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const isView = useMemo(() => pathname.includes('/detail'), [pathname]);

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
    getAssetList({ type_id: watch('type_id') })
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
    getListUser(params)
      .then((res) => {
        const list = res?.data;
        const _ = list.filter((item) => item?.role === 3);
        setUserList(_);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadUserOpts, [loadUserOpts]);

  const loadRoom = useCallback(() => {
    setLoading(true);
    getRoomOptionsCBX(params)
      .then((res) => {
        setRoomList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadRoom, [loadRoom]);

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          {!isAdd && (
            <FormItem className='ca_col_4' label='Mã yêu cầu' disabled={true}>
              <FormInput type='text' field='request_code' placeholder='Nhập mã yêu cầu' />
            </FormItem>
          )}
          <FormItem className='ca_col_4' label='Phạm vi thực hiện' isRequired disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(REQUEST_TYPE, 'value', 'label')}
              field='is_internal'
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Di dời từ' isRequired disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(roomList, 'id', 'room_name')}
              field='from_room_id'
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Di dời đến' isRequired disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(
                roomList.filter((item) => item?.id != watch('from_room_id')),
                'id',
                'room_name',
              )}
              field='to_room_id'
              disabled={disabled}
            />
          </FormItem>
          <FormItem
            className='ca_col_4'
            label='Chịu trách nhiệm'
            isRequired
            disabled={disabled || !watch('from_room_id')}>
            <FormSelect
              list={mapDataOptions4Select(userList, 'id', 'fullname')}
              field='assigned_to'
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Trạng thái' isRequired disabled={true || watch('is_internal')}>
            <FormSelect
              list={mapDataOptions4Select(REQUEST_STATUS, 'value', 'label')}
              field='status'
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Độ ưu tiên' isRequired disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(PRIORRITY_OPTIONS, 'value', 'label')}
              field='priority'
              disabled={disabled}
            />
          </FormItem>
          {isView && (
            <FormItem className='ca_col_4' label='Ngày yêu cầu' isRequired disabled={disabled || true}>
              <FormDatePicker disabled={disabled} type='text' field='request_date' placeholder='Ngày yêu cầu' />
            </FormItem>
          )}
          {isView && (
            <FormItem className='ca_col_4' label='Ngày thực hiện' isRequired disabled={disabled || true}>
              <FormDatePicker disabled={disabled} type='text' field='checkin' placeholder='Ngày thực hiện' />
            </FormItem>
          )}
          {isView && (
            <FormItem className='ca_col_4' label='Ngày báo cáo' isRequired disabled={disabled || true}>
              <FormDatePicker disabled={disabled} type='text' field='checkout' placeholder='Ngày báo cáo' />
            </FormItem>
          )}
          {isView && (
            <FormItem className='ca_col_4' label='Ngày hoàn thành' isRequired disabled={disabled || true}>
              <FormDatePicker
                disabled={disabled}
                type='text'
                field='completion_date'
                placeholder='Nhập ngày hoàn thành'
              />
            </FormItem>
          )}
          {/* <FormItem className='ca_col_4' label='Ngày yêu cầu' isRequired disabled={disabled}>
          <FormDatePicker
              type='text'
              field='request_date'
              placeholder='Nhập ngày yêu cầu'
            />
          </FormItem> */}
        </div>
        <Attachments disabled={disabled} />
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
