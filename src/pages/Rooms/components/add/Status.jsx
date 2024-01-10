import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { getRoomList } from 'services/room.service';
import { getRoomStatus } from 'pages/Rooms/utils/call.api';

const Status = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });

  const [roomStatus, setRoomStatus] = useState();

  const [loading, setLoading] = useState(true);
  const loadRoomStatus = useCallback(() => {
    setLoading(true);
    getRoomStatus(params)
      .then((res) => {
        setRoomStatus(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadRoomStatus, [loadRoomStatus]);

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Trạng thái phòng' isRequired disabled={disabled}>
            <FormSelect
              type='text'
              field='status_id'
              placeholder='Nhập trạng thái phòng'
              list={mapDataOptions4Select(roomStatus, 'id', 'status_name')}
              validation={{
                required: 'Trạng thái phòng là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Dung tích phòng' disabled={disabled}>
            <FormInput field='capacity' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Status;
