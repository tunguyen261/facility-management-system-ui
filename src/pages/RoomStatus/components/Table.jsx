import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteRoom } from 'services/room.service';
import moment from 'moment';
import styled from 'styled-components';
import TooltipHanlde from 'components/shared/TooltipWrapper';
import { deleteRoomStatus } from 'services/room-status.service';
import { showToast } from 'utils/helpers';

const StatusDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin-right: 8px;
`;
const RoomStatusTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        header: 'STT',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d, idx) => <p>{idx + 1}</p>,
      },
      {
        header: 'Tên trạng thái',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.status_name}</p>,
      },
      {
        header: 'Mô tả',
        classNameHeader: 'ca_text_center',
        formatter: (d) =>  <TooltipHanlde>{d?.description}</TooltipHanlde>,
      },
      {
        header: 'Màu sắc tựa trưng',
        classNameBody: 'ca_text_center',
        classNameHeader: 'ca_text_center',
        formatter: (d) => (
          <div style={{display: 'flex' , maxWidth: '100px', marginLeft: '55px'}}>
            <StatusDot color={ d?.color } />
            <p>{d?.color}</p>
          </div>
        ),
      },
      // {
      //   header: 'Người tạo',
      //   accessor: 'creator',
      //   classNameHeader: 'ca_text_center',
      //   formatter: (d) => <p>{d?.creator?.fullname}</p>,
      // },
      // {
      //   header: 'Ngày tạo',
      //   accessor: 'created_at',
      //   formatter: (p) => <p>{moment(p?.created_at).format('DD/MM/YYYY')}</p>,
      // },
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
        onClick: () => window._$g.rdr(`/room-status/add`),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/room-status/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/room-status/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteRoomStatus(_?.id);
                onRefresh();
                showToast.success('Xóa thành công.')
              },
            ),
          ),
      },
    ];
  }, [dispatch, onRefresh]);

  return (
    <React.Fragment>
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
                await deleteRoom(e?.map((val) => parseInt(val?.id)));
                onRefresh();
              },
            ),
          );
        }}
      />
    </React.Fragment>
  );
};

export default RoomStatusTable;
