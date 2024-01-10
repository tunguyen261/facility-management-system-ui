import React, { useCallback, useEffect, useState } from 'react';
import { getAnalysisAssetInfor, getAnalysisTaskInfor, getInfor } from './Services/call-api';
import CountUp from 'react-countup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import DouChart from './DouChart';
import LineChart from './LineChart';
import {
  findObjectInArray,
  generateLast6MonthsNames,
  getLastCharacter,
  getMonthNumberFromString,
  getRandomColor,
} from './utils/helper';

function DashBoardPage() {
  const history = useHistory();
  const [baseInfor, setBaseInfor] = useState();
  const [analysisAsset, setAnalysisAsset] = useState();
  const [analysisTask, setAnalysisTask] = useState();
  const [isDen, setIsDen] = useState(true);
  const [douState, setDouState] = useState();
  const [lineState, setLineState] = useState();
  const loadBase = useCallback((params) => {
    getInfor(params)
      .then((res) => setBaseInfor(res?.data))
      .catch((e) => {});
  }, []);

  useEffect(loadBase, [loadBase]);

  const loadAnalysAsset = useCallback(() => {
    getAnalysisAssetInfor()
      .then((res) => {
        setAnalysisAsset(res?.data);
        const labels = res?.data?.map((item) => item?.status_obj?.display_name);
        const datas = res?.data?.map((item) => item?.total);
        const colors = res?.data?.map((item) => item?.status_obj?.color);
        const dataDou = {
          labels: labels || [],
          datasets: [
            {
              label: 'Trạng thái trang thiết bị',
              data: datas || [],
              backgroundColor: colors || [],
              hoverOffset: 4,
            },
          ],
        };
        setDouState(dataDou);
      })
      .catch((e) => {});
  }, []);

  useEffect(loadAnalysAsset, [loadAnalysAsset]);

  const loadAnalysisTask = useCallback(() => {
    getAnalysisTaskInfor()
      .then((res) => {
        setAnalysisTask(res?.data);
        const labels = generateLast6MonthsNames();
        const items = res?.data?.map((item) => {
          const color = getRandomColor();
          return {
            label: item?.type_obj?.display_name,
            data: labels.map((i) => {
              return { x: i, y: findObjectInArray(item?.task_data, 'month', getMonthNumberFromString(i))?.total || 0 };
            }),
            borderColor: color,
            backgroundColor: color,
          };
        });

        const dataLine = {
          labels: labels || [],
          datasets: items,
        };
        setLineState(dataLine);
      })
      .catch((e) => {});
  }, []);

  useEffect(loadAnalysisTask, [loadAnalysisTask]);

  return (
    <div className='ca_main_wrapp'>
      <div className='ca_row'>
        <div
          className='ca_label_outline ca_label_outline_primary'
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: `${isDen ? ' var(--whiteColor)' : ''}`,
            background: `${isDen ? ' var(--blueColor)' : ''}`,
          }}
          onClick={() => {
            setIsDen(true);
            loadBase({ unit: 1 });
          }}>
          Thiết bị định danh
        </div>
        <div
          className='ca_label_outline ca_label_outline_primary'
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            color: `${isDen ? '' : ' var(--whiteColor)'}`,
            background: `${isDen ? '' : ' var(--blueColor)'}`,
          }}
          onClick={() => {
            setIsDen(false);
            loadBase({ unit: 2 });
          }}>
          Thiết bị không định danh
        </div>
      </div>
      <div className='ca_row'>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-cube'></i>
            </span>
            <p>Số trang thiết bị</p>
            <h4>
              <CountUp end={baseInfor?.total_quantity} />
            </h4>
            <span className={`ca_trans view__all`} onClick={() => history.push('/asset')} style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-shield-check'></i>
            </span>
            <p>Thiết bị đang bảo trì</p>
            <h4>
              <CountUp end={baseInfor?.total_maintenance} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/maintenance')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-settings'></i>
            </span>
            <p>Thiết bị đang sửa chữa</p>
            <h4>
              <CountUp end={baseInfor?.total_repair} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/repairation')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-truck-container'></i>
            </span>
            <p>Thiết bị đang vận chuyển</p>
            <h4>
              <CountUp end={baseInfor?.total_transportation} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/transportation')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
        <div className='ca_c2 ca_mt_1'>
          <div className='ca_card_items'>
            <span className='ca_icon_card ca_orange'>
              <i className='fi fi-rr-republican'></i>
            </span>
            <p>Thiết bị đang thay thế</p>
            <h4>
              <CountUp end={baseInfor?.total_replacement} />
            </h4>
            <span
              className={`ca_trans view__all`}
              onClick={() => history.push('/replacement')}
              style={{ cursor: 'pointer' }}>
              View all
            </span>
          </div>
        </div>
      </div>
      <div className='ca_row ca_justify_content_around'>
        <div className='ca_col_7 ca_card_items ca_mt_2'>
          <h2 className='ca_title_card'>
            <span className='fi fi-rr-cube'></span>Danh sách phiếu
          </h2>
          <LineChart data={lineState} />
        </div>
        <div className='ca_col_4 ca_card_items ca_mt_2'>
          <h2 className='ca_title_card'>
            <span className='fi fi-rr-cube'></span> Trạng thái trang thiết bị
          </h2>
          <DouChart data={douState} />
        </div>
      </div>
    </div>
  );
}
export default DashBoardPage;
