import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getRoomList } from 'services/room.service';
import { getFloorList } from 'services/floor.service';
import { getRoomTypeList } from 'services/room-type.service';
const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });

  const [floorsList, setFloorsList] = useState();
  const [roomType, setRoomType] = useState([])
  const [loading, setLoading] = useState(true);
  const loadFloorOptions = useCallback(() => {
    setLoading(true);
    getFloorList(params)
      .then((res) => {
        setFloorsList(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadFloorOptions, [loadFloorOptions]);

  const loadRoomTypeOpts = useCallback ( () =>{
    getRoomTypeList(params)
    .then((res) => {
      setRoomType(res?.data);
    })
    .catch((err) => {
      showToast.error(err?.message ?? 'Có lỗi xảy ra');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [params])

  useEffect(loadRoomTypeOpts, [loadRoomTypeOpts]);

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Mã phòng' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='room_code'
              placeholder='Nhập mã phòng'
              validation={{
                required: 'Mã phòng là bắt buộc',
              }}
            />
          </FormItem>

          <FormItem className='ca_col_4' label='Tên phòng' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='room_name'
              placeholder='Nhập tên phòng'
              validation={{
                required: 'Tên phòng là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Diện tích' isRequired disabled={disabled}>
            <FormInput
              field='area'
              validation={{
                required: 'Diện tích là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Sức chứa' isRequired disabled={disabled}>
            <FormInput
              field='capacity'
              validation={{
                required: 'Sức chứa là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          {/* <FormItem className='ca_col_4' label='Path room' disabled={disabled}>
            <FormInput field='path_room' disabled={disabled} />
          </FormItem> */}
          <FormItem className='ca_col_4' label='Loại phòng' disabled={disabled}>
            <FormSelect
            list={mapDataOptions4Select(roomType, 'id', 'type_name')}
            field='room_type_id' disabled={disabled} />
          </FormItem>
          <FormItem className='ca_col_4' label='Thuộc tầng' disabled={disabled}>
            <FormSelect
              list={mapDataOptions4Select(floorsList, 'id', 'floor_name')}
              field='floor_id'
              disabled={disabled}
            />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
