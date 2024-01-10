import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteTeamMember } from '../services/call-api';


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
        header: 'Tên nhóm',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.team?.team_name}</p>,        
        },
      {
        header: 'Tên thành viên',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.member?.fullname}</p>,
      },
      {
        header: 'Vai trò',
        classNameHeader: 'ca_text_center',
        formatter: (d) => d?.is_lead ? <p>Trưởng nhóm</p> : <p>Thành viên</p>,
      },
      {
        header: 'Giới tính',
        classNameHeader: 'ca_text_center',
        formatter: (d) => d?.member?.gender ? <p>Nam</p> : <p>Nữ</p>,
      },
      {
        header: 'SĐT',
        classNameHeader: 'ca_text_center',
        formatter: (d) =>  <p>{d?.member?.phone_number}</p>,
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
        onClick: () => window._$g.rdr(`/team-member/add`),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/team-member/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/team-member/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteTeamMember([parseInt(_?.id)]);
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
              await deleteTeamMember(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default Table;
