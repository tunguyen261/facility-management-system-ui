import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {Tooltip } from 'antd';
import { showConfirmModal } from 'actions/global';
import { deleteRoom } from 'services/room.service';
import moment from 'moment';
import styled from 'styled-components';
import TooltipHanlde from 'components/shared/TooltipWrapper';


const RoomTypeTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
    const dispatch = useDispatch();

const columns = useMemo(
    () => [
    {
        header: 'STT',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d,idx) => <p>{idx+1}</p>,
    },
    {
        header: 'Tên loại phòng',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => (
        <>
            <p>
            {d?.type_name}
            </p>
        </>
        ),
    },
    {
        header: 'Mô tả',
        classNameHeader: 'ca_text_center',
        formatter: (d) =>  <TooltipHanlde>{d?.description}</TooltipHanlde>,
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
        onClick: () => window._$g.rdr(`/room-type/add`),
    },
    {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/room-type/edit/${p?.id}`),
    },
    {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/room-type/detail/${p?.id}`),
    },
    {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteRoom([parseInt(_?.id)]);
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
              await deleteRoom(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default RoomTypeTable;
