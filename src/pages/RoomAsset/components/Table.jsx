import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import moment from 'moment';
import { deleteRoomAsset } from '../service/call-api';
import { Label } from 'utils/constants';
const AssetTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh }) => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        header: 'STT',
        classNameHeader: 'ca_text_center text-center',
        classNameBody: 'ca_text_center',
        formatter: (d, index) => <p>{index + 1}</p>,
      },
      {
        header: 'Mã trang thiết bị',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.asset.asset_code}</p>,
      },
      {
        header: 'Tên trang thiết bị',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.asset.asset_name}</p>,
      },
      {
        header: 'Tại phòng',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.room?.room_name}</p>,
      },
      {
        header: 'Trạng thái',
        accessor: 'status',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Label color={d?.asset?.status_obj?.color}>{d?.asset?.status_obj?.display_name}</Label>
      },
    {
        header: 'Số lượng',
        accessor: 'quantity',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <p>{d?.asset?.quantity}</p>,
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
        onClick: () => window._$g.rdr(`/room-asset/add`),
      },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/room-asset/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/room-asset/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteRoomAsset([parseInt(_?.id)]);
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
              await deleteRoomAsset(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default AssetTable;
