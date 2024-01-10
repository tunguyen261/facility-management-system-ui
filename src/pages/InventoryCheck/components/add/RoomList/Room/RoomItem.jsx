import FormDebouneSelect from 'components/shared/CAFormControl/FormDebouneSelect';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { getRoomList, getRoomOptionsCBX } from 'services/room.service';
import { getRoomInRoom } from 'pages/Rooms/utils/call.api';
import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { mapDataOptions4Select, mapDataOptions4SelectC, mapDataOptions4SelectCustom, showToast } from 'utils/helpers';
import AssetTable from '../Assets/AssetTable';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

function RoomItem({ keyRoom, index, disabled, handelRemoveRooms, setTabActive, handleExpand }) {
  const methods = useFormContext();
  const { pathname } = useLocation();
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);

  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });
  const { watch, setValue, clearErrors } = methods;
  const roomSelected = watch('rooms') || [];
  const getOptionsRoomCode = async (value) => {
    const data = await getRoomOptionsCBX({ ...params, keyword: value });
    return mapDataOptions4Select(data?.data, 'id', 'room_code');
  };

  const getOptionsRoomName = async (value) => {
    const data = await getRoomOptionsCBX({ ...params, keyword: value });
    return mapDataOptions4Select(data?.data, 'id', 'room_name');
  };

  return (
    <React.Fragment>
      <tr>
        <td style={{ zIndex: 1 }} className='ca_sticky ca_check_sticky'>
          {index + 1}
        </td>
        <td style={{ width: '100px' }}>
          <FormDebouneSelect
            bordered
            fieldDisplay='room_code'
            field={`${keyRoom}.room_code`}
            disabled={disabled}
            placeholder='Nhập mã phòng'
            fetchOptions={getOptionsRoomCode}
            onChange={(_, q) => {
              try {
                clearErrors('rooms');
                setValue(`${keyRoom}.room_id`, q?.id);
                setValue(`${keyRoom}.room_code`, q?.room_code);
                setValue(`${keyRoom}.room_name`, q?.room_name);
                setValue(`${keyRoom}.room_status`, q?.status?.status_name);
              } catch (error) {}
            }}
          />
        </td>
        <td>
          <FormDebouneSelect
            field={`${keyRoom}.room_name`}
            bordered
            fieldDisplay='room_name'
            disabled={disabled}
            placeholder='Nhập tên phòng'
            fetchOptions={getOptionsRoomName}
            onChange={(_, q) => {
              clearErrors('rooms');
              setValue(`${keyRoom}.room_id`, q?.id);
              setValue(`${keyRoom}.room_code`, q?.room_code);
              setValue(`${keyRoom}.room_name`, q?.room_name);
              setValue(`${keyRoom}.room_status`, q?.status?.status_name);
            }}
          />
        </td>
        <td>
          <>{watch(`${keyRoom}`)?.room_status}</>
        </td>
        <td className='ca_sticky ca_action_table ca_text_center'>
          {disabled ? null : (
            <a className='ca_btn_table ca_delete ca_red' onClick={() => handelRemoveRooms(index)}>
              <i className='fi fi-rr-trash' />
            </a>
          )}
          {!(isAdd || isEdit) && (
            <a className='ca_btn_table ca_blue' onClick={() => handleExpand(index)}>
              <i className='fi fi-rr-eye' />
            </a>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default RoomItem;
