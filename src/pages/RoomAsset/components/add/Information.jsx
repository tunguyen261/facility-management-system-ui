import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { useFormContext } from 'react-hook-form';

import { getAssetList } from 'pages/Asset/services/call-api';
import { getRoomList } from 'services/room.service';


const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const methods = useFormContext();
  const { watch, setValue } = methods;
  const [assetList , setAssetList ] = useState([]);
  const [roomList , setRoomList ] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadAssetOpts = useCallback ( () =>{
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
  }, [params])

  useEffect(loadAssetOpts, [loadAssetOpts]);

  const loadRoomOpts = useCallback ( () =>{
    {
      getRoomList(params)
      .then((res) => {
          setRoomList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [params])

  useEffect(loadRoomOpts, [loadRoomOpts]);

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
        <FormItem className='ca_col_4' label='Phòng' isRequired disabled={disabled}>
            <FormSelect
                list={mapDataOptions4Select(roomList, 'id', 'room_name')}
                field='room_id'
                disabled={disabled}
                />
          </FormItem> 
          <FormItem className='ca_col_4' label='Thiết bị' isRequired disabled={disabled}>
            <FormSelect
                list={mapDataOptions4Select(assetList, 'id', 'asset_code')}
                field='asset_id'
                disabled={disabled}
                />
          </FormItem>
          <FormItem className='ca_col_4' label='Số lượng' isRequired disabled={disabled}>
            <FormInput
                field='quantity'
                disabled={disabled}
                />
          </FormItem>   
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
