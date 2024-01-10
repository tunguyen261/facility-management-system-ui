import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import RoomItem from './RoomItem';
import AssetTable from '../Assets/AssetTable';

function Rooms({ disabled, setTabActive }) {
  const methods = useFormContext();
  const { watch, setValue, formState, control, clearErrors } = methods;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const handelAddRowRooms = async () => {
    if (disabled) return;
    let value = watch('rooms') ?? [];
    value.push({});
    clearErrors('rooms');
    setValue('rooms', value);
  };
  const handelRemoveRooms = (index) => {
    let value = watch('rooms');
    value.splice(index, 1);
    setValue('rooms', value);
  };
  const { fields } = useFieldArray({
    control,
    name: 'rooms',
  });
  const handleExpand = (idx) => {
    setIsOpenModal(!isOpenModal);
    setSelectedRoom(watch(`rooms.${idx}`));
  };
  return (
    <React.Fragment>
      <div className='ca_tab_items ca_no_pt ca_mt_2 ca_active' id='ca_cate'>
        <div className='ca_btn_group ca_btn_grp ca_flex ca_align_items_center ca_justify_content_right'>
          {/* <a
          data-href='#ca_importExcel'
          className='ca_btn_outline ca_btn_outline_success ca_open_modal '
          onClick={() => setOpenModalImport(true)}>
          <span className='fi fi-rr-inbox-in' /> Import
        </a> */}
          <a data-href className='ca_btn ca_btn_success' onClick={handelAddRowRooms} disabled={disabled}>
            <span className='fi fi-rr-plus' /> Thêm
          </a>
        </div>
        <div id='rooms_list'>
          <div className='ca_table_responsive ca_mt_2'>
            <table className='ca_table'>
              <thead>
                <tr>
                  <th className='ca_sticky ca_check_sticky ca_text_center'>STT</th>
                  <th className='ca_text_center' style={{ width: '100px' }}>
                    Mã phòng
                  </th>
                  <th className='ca_text_center'>Tên phòng</th>
                  <th className='ca_text_center'>Trạng thái phòng</th>
                  <th className='ca_sticky ca_action_table ca_text_center'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {fields && fields.length > 0 ? (
                  fields.map((item, index) => {
                    return (
                      item && (
                        <>
                          <RoomItem
                            key={index}
                            keyRoom={`rooms.${index}`}
                            index={index}
                            disabled={disabled}
                            setTabActive={setTabActive}
                            handelRemoveRooms={handelRemoveRooms}
                            handleExpand={handleExpand}
                          />
                        </>
                      )
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12} className='ca_text_center'>
                      Chưa thêm phòng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <AssetTable
          data={selectedRoom?.assets}
          totalPages={1}
          itemsPerPage={selectedRoom?.assets.length}
          page={1}
          onClose={setIsOpenModal}
          totalItems={selectedRoom?.assets.length}
        />
      )}
    </React.Fragment>
  );
}

export default Rooms;
