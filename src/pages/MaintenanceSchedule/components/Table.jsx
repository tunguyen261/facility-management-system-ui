import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { showConfirmModal } from 'actions/global';
import { deleteMaintenanceSchedule } from '../services/call-api';
import moment from 'moment';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Label, REQUEST_STATUS } from 'utils/constants';
import TooltipHanlde from 'components/shared/TooltipWrapper';

const RoomTypeTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        header: 'STT',
        classNameHeader: 'ca_text_center',
        formatter: (d, idx) => <p>{idx + 1}</p>,
      },
      {
        header: 'Mã phiếu',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.request_code}</p>,
      },
      //   {
      //     header: 'Thiết bị',
      //     classNameHeader: 'ca_text_center',
      //     classNameBody: 'ca_text_center',
      //     formatter: (d) => (
      //       <p
      //         style={{ cursor: 'pointer' }}
      //         onClick={() => {
      //           window._$g.rdr(`/asset/detail/${d.asset.id}`);
      //         }}>
      //        {d?.asset?.asset_name + ' - ' + d?.asset?.asset_code}
      //       </p>
      //     ),
      //   },
      {
        header: 'Mô tả',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <TooltipHanlde title={d?.description}>{d?.description}</TooltipHanlde>,
      },
      // {
      //     header: 'Ngày tạo',
      //     accessor: 'created_at',
      //     formatter: (p) => <p>{moment(p?.request_date).format('DD/MM/YYYY')}</p>,
      //   },
      //   {
      //     header: 'Ngày hoàn thành',
      //     classNameBody: 'ca_text_center',
      //     classNameHeader: 'ca_text_center',
      //     formatter: (p) => {
      //       if(p?.status_obj?.display_name != 'Đã hoàn thành'){
      //         return <p>Chưa hoàn thành</p>
      //       }else{
      //         return <p>{moment(p?.completion_date).format('DD/MM/YYYY')}</p>
      //       }
      //     }
      //   },
      {
        header: 'Độ ưu tiên',
        accessor: 'priority_obj',
        classNameBody: 'ca_text_center',
        classNameHeader: 'ca_text_center',
        formatter: (p) => <Label color={p?.priority_obj?.color}>{p?.priority_obj?.display_name}</Label>,
      },
      //   {
      //     header: 'Trạng thái',
      //     classNameHeader: 'ca_text_center',
      //     classNameBody: 'ca_text_center',
      //     accessor: 'status',
      //     formatter: (p) => <p>{p?.status_obj?.display_name}</p>,
      //   },
      //   {
      //     header: 'Phạm vi thực hiện',
      //     classNameHeader: 'ca_text_center',
      //     classNameBody: 'ca_text_center',
      //     accessor: 'created_at',
      //     formatter: (p) => (p.is_internal ? <p>Thực hiện nội bộ</p> : <p>Thực hiện bên ngoài</p>),
      //   },
    ],
    [],
  );

  const actions = useMemo(() => {
    return [
      {
        globalAction: true,
        icon: 'fi fi-rr-plus',
        type: 'success',
        content: 'Khai báo',
        onClick: () => window._$g.rdr(`/maintenance-schedule/add`),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        hidden: (p) => p?.status !== REQUEST_STATUS.NotStart,
        onClick: (p) => window._$g.rdr(`/maintenance-schedule/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/maintenance-schedule/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        // hidden: (p) =>  p?.status !== REQUEST_STATUS.NotStart,
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteMaintenanceSchedule([parseInt(_?.id)]);
                onRefresh();
              },
            ),
          ),
      },
    ];
  }, [dispatch, onRefresh]);

  return (
    <DataTable
      loading={loading}
      columns={columns}
      data={data}
      actions={actions}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      page={page}
      totalItems={totalItems}
      onChangePage={onChangePage}
      handleBulkAction={(e) => {
        dispatch(
          showConfirmModal(
            ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
            async () => {
              await deleteMaintenanceSchedule(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default RoomTypeTable;
