import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { ASSET_STATUS_OPTIONS, MOVABLE_OPTION, RENTED_OPTIONS, UnitOptions } from 'utils/constants';
import { getAssetTypeOpts, getModelOpts } from 'pages/Asset/services/call-api';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { useFormContext } from 'react-hook-form';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom';
import Images from 'pages/Asset/tabs/InformationTab/Images';
import { QRCode, Space, Button } from 'antd';

const Information = ({ disabled, title }) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [modelList, setModelList] = useState([]);
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const [assetType, setAssetType] = useState([]);
  const methods = useFormContext();
  const { setValue, watch } = methods;
  const loadAssetTypeOtps = useCallback(() => {
    getAssetTypeOpts(params)
      .then((res) => setAssetType(res?.data))
      .catch((err) => showToast(err?.message || 'Có lỗi xảy ra'));
  }, [params]);

  useEffect(loadAssetTypeOtps, [loadAssetTypeOtps]);

  const loadModelOtps = useCallback(() => {
    getModelOpts(params)
      .then((res) => setModelList(res?.data))
      .catch((err) => showToast(err?.message || 'Có lỗi xảy ra'));
  }, [params]);

  useEffect(loadModelOtps, [loadModelOtps]);

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        {!isAdd && (
          <div className='ca_row'>
            <Images disabled={disabled} title={'Ảnh trang thiết bị'} className='ca_col_4' />
            <Space direction='vertical' align='center' className='ca_col_4' style={{ marginTop: '34px' }}>
              <div id='myqrcode'>
                <QRCode value={id || '-'} style={{ display: 'none' }} />
              </div>
              <Button type='primary' onClick={downloadQRCode}>
                Xuất mã QR
              </Button>
            </Space>
          </div>
        )}
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
              onChange={(value) => {
                setValue('type_id', value);
                const selectedItem = assetType.find((i) => i?.id == value);
                if (selectedItem?.unit_obj?.value == 1) {
                  setValue('quantity', 1);
                  setIsDisabled(true);
                } else {
                  setIsDisabled(false);
                }
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Trạng thái' isRequired disabled={disabled}>
            <FormSelect
              field='status'
              list={ASSET_STATUS_OPTIONS}
              validation={{
                required: 'Trạng thái là bắt buộc',
              }}
              onChange={(value) => {
                if (isEdit) {
                  showToast.warning('Trạng thái trang thiết bị thay đổi có thể ảnh hưởng tới các luồng công việc!');
                }
                setValue('status', value);
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Thời gian bắt đầu sử dụng' disabled={disabled}>
            <FormDatePicker
              disabled={disabled}
              type='text'
              field='start_date_of_use'
              placeholder='Nhập thời gian sử dụng'
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Lần kiểm tra gần nhất' disabled={true}>
            <FormDatePicker
              disabled={true}
              type='text'
              field='last_checked_date'
              placeholder='Nhập lần kiểm tra gần nhất'
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Lần bảo trì gần nhất' disabled={true}>
            <FormDatePicker
              disabled={true}
              type='text'
              field='last_maintenance_time'
              placeholder='Nhập lần bảo trì gần nhất'
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
            <FormInput type='number' field='manufacturing_year' placeholder={'Năm'} />
          </FormItem>
          <FormItem className='ca_col_4' label='Số series' disabled={disabled || isEdit}>
            <FormInput field='serial_number' placeholder={'Series'} />
          </FormItem>
          <FormItem className='ca_col_4' label='Số lượng' disabled={disabled || isEdit || isDisabled}>
            <FormNumber field='quantity' placeholder={'Số lượng'} min={0} />
          </FormItem>
          <FormItem className='ca_col_4' label='Thuê từ bên ngoài' isRequired disabled={disabled}>
            <FormSelect list={RENTED_OPTIONS} field='is_rented' disabled={disabled} />
          </FormItem>
          <FormItem className='ca_col_4' label='Dòng sản phẩm' isRequired disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(modelList, 'id', 'model_name')}
              field='model_id'
              disabled={disabled}
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
