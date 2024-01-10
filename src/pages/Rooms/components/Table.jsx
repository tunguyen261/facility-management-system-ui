import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteRoom } from 'services/room.service';
import moment from 'moment';
import styled from 'styled-components';
import StatusPointOptions from './customs/StatusPointOptions';
import { showToast } from 'utils/helpers';

const StatusDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin-right: 8px;
`;
const RoomTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        header: 'Mã phòng',
          classNameHeader: 'ca_text_center',
          classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.room_code}</p>,
      },
      {
        header: 'Tên phòng',
          classNameHeader: 'ca_text_center',
          classNameBody: 'ca_text_center',
        formatter: (d) => (
          <>
            <p>
              {d?.room_name}
            </p>
          </>
        ),
      },
      {
        header: 'Trạng thái phòng',
          classNameHeader: 'ca_text_center',
          classNameBody: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (p)=> <>
        {/* <StatusDot color={p?.status?.color}></StatusDot> */}
        <p style={{ color: p?.status?.color }}>{p?.status?.status_name}
        </p> </>
      },   
      {
        header: 'Loại phòng',
          classNameHeader: 'ca_text_center',
          classNameBody: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.room_type?.type_name}</p>,
      },
      {
        header: 'Diện tích',
          classNameHeader: 'ca_text_center',
          classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.area}</p>,
      },
      {
        header: 'Sức chứa',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.capacity}</p>,
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
      // {
      //   header: 'Trạng thái',
      //   accessor: 'is_active',
      //   classNameHeader: 'ca_text_center',
      //   classNameBody: 'ca_text_center',
      //   formatter: (p) =>
      //     p?.is_active ? (
      //       <span className='ca_label_outline ca_label_outline_success text-center'>Kích hoạt</span>
      //     ) : (
      //       <span className='ca_label_outline ca_label_outline_danger text-center'>Ẩn</span>
      //     ),
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
        onClick: () => window._$g.rdr(`/room/add`),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/room/edit/${p?.id}?tab_active=information`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/room/detail/${p?.id}?tab_active=information`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteRoom(_?.id);
                onRefresh();
                showToast.success('Xóa thành công.')
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
              await deleteRoom(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default RoomTable;
