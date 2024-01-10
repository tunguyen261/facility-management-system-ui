import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MapBoard from './components/MapBoard';
import { useCallback } from 'react';
import { getSummary } from './services/call-api';
import { getFloorDetail, getFloorList, getRoomByFloorId, getRoomStatus } from './services/call-api';
function VirtualizePage() {
  const history = useHistory();
  const [isShowDetailRoom, setIsShowDetailRoom] = useState(false);
  const [isRoomSetting, setIsRoomSetting] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState('e7df564e-5195-41f1-a1d9-08dbb8d407a2');
  const [currentRoom, setCurrentRoom] = useState();
  const [currentMap, setCurrentMap] = useState();
  const [summary, setSummary] = useState();
  const [isFirst, setIsFirst] = useState(true);
  const loadDetailRoom = (id, roomLists) => {
    setIsShowDetailRoom(!!id);
    const room = roomLists?.find((item) => item?.id === id);
    setCurrentRoom(room);
  };

  const loadSummary = useCallback(() => {
    getSummary()
      .then((res) => {
        setSummary(res?.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(loadSummary, [loadSummary]);

  const onChangeFloor = () => {
    getFloorDetail(selectedFloor)
      .then((res1) => {
        setIsFirst(false);
        getRoomByFloorId({ floor_id: res1?.data?.id })
          .then((res2) => {
            createSVG(res1?.data, res2?.data, isRoomSetting);
            setLoading(false);
          })
          .catch((err) => {
            // showToast.error(err?.message ?? 'Có lỗi xảy ra');
          });
        // .finally(() => {
        //   setLoading(false);
        // });
      })
      .catch((err) => {
        // showToast.error(err?.message ?? 'Có lỗi xảy ra');
      });
  };
  useEffect(onChangeFloor, [selectedFloor, isRoomSetting]);

  const createSVG = (current_floor, room_list, _isRoomSetting = true) => {
    const svgString = current_floor?.floor_map;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const pathElements = doc.querySelectorAll('path');
    const svgElement = doc.querySelector('svg');

    const gElement = doc.querySelector('g');
    const pathArray = Array.from(pathElements);
    //state ở ngoài svg
    const svgWidth = svgElement?.getAttribute('width');
    const svgHeight = svgElement?.getAttribute('height');
    const gId = gElement?.getAttribute('id');
    const svgContainer = document.getElementById('svg-container');
    while (svgContainer?.firstChild) {
      svgContainer.removeChild(svgContainer.firstChild);
    }
    //Xử lý các status phòng ở đây
    pathArray.forEach((path) => {
      let color = '';
      room_list.forEach((room) => {
        if (path?.id === `Vector ${room?.room_code}`) {
          color = _isRoomSetting ? room?.status?.color : room?.status_base_on_asset?.color;
          path.onclick = () => loadDetailRoom(room?.id, room_list);
        }
      });
      if (color != '') {
        path.stroke = color;
        path.setAttribute('fill', color);
        path.style.cursor = 'pointer';
      }
      svgContainer?.appendChild(path);
    });

    const newSVGString = `<svg width=${svgWidth} height=${svgHeight} viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg"><g id=${gId}>
      ${Array.from(pathArray)
        .map((path) => path.outerHTML)
        .join('')}</g></svg>`;
    setCurrentMap(newSVGString);
    // svgContainer.innerHTML = '';
    // gElement.innerHTML = '';
  };
  return (
    <div className='ca_main_wrapp'>
      <div className='ca_row'>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-info'></i>
            </span>
            <p>Số tầng nhà</p>
            <h4>
              <CountUp end={summary?.total_floor} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/building')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-info'></i>
            </span>
            <p>Số lượng trang thiết bị</p>
            <h4>
              <CountUp end={summary?.total_asset} />
            </h4>
            <span className={`ca_trans view__all`} onClick={() => history.push('/asset')} style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-info'></i>
            </span>
            <p>Số lượng phòng</p>
            <h4>
              <CountUp end={summary?.total_room} />
            </h4>
            <span className={`ca_trans view__all`} onClick={() => history.push('/room')} style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-info'></i>
            </span>
            <p>Số nhân viên</p>
            <h4>
              <CountUp end={summary?.total_user} />
            </h4>
            <span className={`ca_trans view__all`} onClick={() => history.push('/users')} style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-info'></i>
            </span>
            <p>Loại trang thiết bị</p>
            <h4>
              <CountUp end={summary?.total_asset_type} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/asset-type')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
      </div>
      <div className='ca_row ca_mt_1'>
        <div
          className='ca_label_outline ca_label_outline_primary'
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: `${isRoomSetting ? ' var(--whiteColor)' : ''}`,
            background: `${isRoomSetting ? ' var(--blueColor)' : ''}`,
          }}
          onClick={() => {
            setIsRoomSetting(true);
            onChangeFloor(selectedFloor, true);
          }}>
          Trạng thái theo phòng
        </div>
        <div
          className='ca_label_outline ca_label_outline_primary'
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: `${isRoomSetting ? '' : ' var(--whiteColor)'}`,
            background: `${isRoomSetting ? '' : ' var(--blueColor)'}`,
          }}
          onClick={() => {
            setIsRoomSetting(false);
            onChangeFloor(selectedFloor, false);
          }}>
          Trạng thái theo trang thiết bị
        </div>
      </div>
      <div className='ca_row'>
        <MapBoard
          loadDetailRoom={loadDetailRoom}
          isRoomSetting={isRoomSetting}
          setSelectedFloor={setSelectedFloor}
          selectedFloor={selectedFloor}
          onChangeFloor={onChangeFloor}
          currentMap={currentMap}
          createSVG={createSVG}
        />
        {isShowDetailRoom && (
          <div className='ca_c2 ca_mt_3 ca_card_items ' style={{ marginLeft: '2%', maxWidth: '27%' }}>
            <div className='ca_row'>
              <p className='ca_text_bold_700'>Thông tin phòng</p>
              <i className='fi fi-rr-info ml-10'></i>
            </div>
            <div style={{ width: '400px' }}>
              <div className='ca_row'>
                <p className='ca_text_bold_620'>Mã phòng: </p>
                <p className='ml-10'>{currentRoom.room_code}</p>
              </div>
              <div className='ca_row'>
                <p className='ca_text_bold_620'>Tên phòng: </p>
                <p className='ml-10'>{currentRoom.room_name}</p>
              </div>
              <div className='ca_row'>
                <p className='ca_text_bold_620'>Loại phòng: </p>
                <p className='ml-10'>{currentRoom.room_type.type_name}</p>
              </div>
              <div className='ca_row'>
                <p className='ca_text_bold_620'>Trạng thái: </p>
                <p
                  className='ml-10 ca_btn_outline_default'
                  style={{
                    color: `${currentRoom.status.color}`,
                    borderRadius: '7px',
                    border: `1px solid ${currentRoom.status.color}`,
                    padding: '0 3px',
                  }}>
                  {currentRoom.status.status_name}
                </p>
              </div>
              <div className='ca_row mb-10'>
                <p className='ca_text_bold_620'>Tổng số lượng trang thiết bị: </p>
                <p className='ml-10'>{currentRoom.total_assets}</p>
              </div>
              <div className='ca_row mb-10'>
                <p className='ca_text_bold_620'>Số lượng trang thiết bị hư: </p>
                <p className='ml-10'>{currentRoom.total_damaged_assets}</p>
              </div>
              <div className='ca_row mb-10'>
                <p className='ca_text_bold_620'>Số lượng trang thiết bị bình thường: </p>
                <p className='ml-10'>{currentRoom.total_normal_assets}</p>
              </div>
            </div>
            <div
              onClick={() => history.push(`room/detail/${currentRoom.id}`)}
              className='mt-10'
              style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: 'blue' }}>
              Xem chi tiết
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default VirtualizePage;
