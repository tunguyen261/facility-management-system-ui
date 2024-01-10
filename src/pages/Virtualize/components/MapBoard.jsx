import React from 'react';
import { Select } from 'antd';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { getFloorDetail, getFloorList, getRoomByFloorId, getRoomStatus } from '../services/call-api';
import { showToast } from 'utils/helpers';
import StatusPointOptions from 'pages/Rooms/components/customs/StatusPointOptions';
import { Spin } from 'antd';
import AssetStatusPointOptions from 'pages/Rooms/components/customs/AssetsStatusPointOptions';

function MapBoard({
  loadDetailRoom,
  isLoading,
  isRoomSetting,
  setSelectedFloor,
  selectedFloor,
  currentMap,
  onChangeFloor,
  createSVG,
}) {
  const [floorOpts, setFloorOpts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });

  const loadFloorOpts = useCallback(() => {
    setLoading(true);
    getFloorList(params)
      .then((res) => setFloorOpts(res?.data))
      .catch((err) => {
        // showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadFloorOpts, [loadFloorOpts]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  console.log('isRoomSetting', isRoomSetting);
  return (
    <>
      {loading ? (
        <Spin style={{ marginTop: '200px', marginLeft: '350px' }} />
      ) : (
        <div className='ca_c7 ca_mt_1 board__container ca_card_items'>
          <div className='ca_row'>
            <div className='campus__title ca_col_9'>XAVALO - HCM Campus</div>
            <div className='filter_group ca_col_3' style={{ float: 'right' }}>
              <Select
                defaultValue={'effc5d2b-c1f5-4c01-aea2-08dbb8485033'}
                showSearch
                placeholder='-- Tòa --'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  {
                    value: 'effc5d2b-c1f5-4c01-aea2-08dbb8485033', // fix cứng
                    label: 'Tòa A',
                  },
                ]}
              />
              <Select
                className='ml-10'
                showSearch
                defaultValue={'e7df564e-5195-41f1-a1d9-08dbb8d407a2'} //fix cứng tầng trệt
                placeholder='-- Tầng --'
                optionFilterProp='children'
                onChange={(value) => {
                  setSelectedFloor(value);
                }}
                onSearch={onSearch}
                filterOption={filterOption}
                options={floorOpts?.map((i) => ({ value: i?.id, label: i?.floor_name }))}
              />
            </div>
          </div>
          <div className='ca_row'>
            <div className='floor_map ca_mt_5' style={{ paddingLeft: '1%' }}>
              <svg
                id='svg-container'
                width='801'
                height='375'
                viewBox='0 0 801 375'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'></svg>

              {currentMap && (
                <>
                  {/* <div dangerouslySetInnerHTML={{ __html: currentMap }} /> */}
                  {isRoomSetting ? (
                    <div className='ca_mt_3'>
                      <StatusPointOptions />
                    </div>
                  ) : (
                    <div className='ca_mt_3'>
                      <AssetStatusPointOptions />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MapBoard;
