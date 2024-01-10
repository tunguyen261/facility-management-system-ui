import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { showConfirmModal } from 'actions/global';
import moment from 'moment';
import { deleteRepairation } from 'pages/Repairation/services/call-api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const RoomTypeTable = ({ id, loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
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
      {
        header: 'Thiết bị',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Tooltip>{d?.asset?.asset_code}</Tooltip>,
      },
      {
        header: 'Mô tả',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Tooltip>{d?.description}</Tooltip>,
      },
      // {
      //     header: 'Ngày tạo',
      //     accessor: 'created_at',
      //     formatter: (p) => <p>{moment(p?.request_date).format('DD/MM/YYYY')}</p>,
      //   },
      {
        header: 'Ngày hoàn thành',
        accessor: 'created_at',
        formatter: (p) => <p>{moment(p?.completion_date).format('DD/MM/YYYY')}</p>,
      },
      {
        header: 'Trạng thái',
        accessor: 'status',
        formatter: (p) => <p>{p?.status_obj?.display_name}</p>,
      },
      {
        header: 'Phạm vi thực hiện',
        accessor: 'created_at',
        formatter: (p) => (p.is_internal ? <p>Thực hiện nội bộ</p> : <p>Thực hiện bên ngoài</p>),
      },
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
        onClick: () => history.push('/maintenance/add', { asset_id: id }),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/maintenance/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/maintenance/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteRepairation([parseInt(_?.id)]);
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
              await deleteRepairation(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default RoomTypeTable;
