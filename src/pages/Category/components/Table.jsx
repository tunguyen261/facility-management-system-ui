import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {Tooltip } from 'antd';
import { showConfirmModal } from 'actions/global';
import { deleteCategory } from '../services/call-api';
import moment from 'moment';
import TooltipHanlde from 'components/shared/TooltipWrapper';



const Table = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
    const dispatch = useDispatch();

const columns = useMemo(
    () => [
    {
        header: 'STT',
        classNameHeader: 'ca_text_center',
        formatter: (d,idx) => <p>{idx+1}</p>,
    },
    {
        header: 'Tên nhóm trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.category_name}</p>
    },
    {
        header: 'Team quản lý',
        accessor: 'created_at',
        classNameHeader: 'ca_text_center',
        formatter: (p) => <p>{p?.team?.team_name}</p>,
    },
    {
        header: 'Mô tả',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (p) => <TooltipHanlde>{p?.description}</TooltipHanlde>,
    },
    // {
    //     header: 'Ngày tạo',
    //     accessor: 'created_at',
    //     formatter: (p) => <p>{moment(p?.request_date).format('DD/MM/YYYY')}</p>,
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
        onClick: () => window._$g.rdr(`/category/add`),
    },
    {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/category/edit/${p?.id}`),
    },
    {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/category/detail/${p?.id}`),
    },
    {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteCategory([parseInt(_?.id)]);
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
              await deleteCategory(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default Table;
