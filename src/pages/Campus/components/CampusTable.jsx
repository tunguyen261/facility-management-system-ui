import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteCampus } from 'services/campus.service';
import moment from 'moment';
import { showToast } from 'utils/helpers';

const CampusTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        header: 'Mã Campus',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.campus_code}</p>,
      },
      {
        header: 'Tên Campus',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.campus_name}</p>,
      },
      {
        header: 'Phone number',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.telephone}</p>,
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
      // {
      //   globalAction: true,
      //   icon: 'fi fi-rr-plus',
      //   type: 'success',
      //   content: 'Khai báo',
      //   onClick: () => window._$g.rdr(`/campus/add`),
      // },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/campus/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/campus/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteCampus(_?.id);
                onRefresh();
                showToast.success('Xóa thành công.');
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
              await deleteCampus(e?.map((val) => parseInt(val?.campus_id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default CampusTable;
