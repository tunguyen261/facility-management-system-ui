import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteBuilding } from 'services/building.service';
import moment from 'moment';
import styled from 'styled-components';

const Label = styled.p`
  display: inline-block;
  padding: 3px 7px;
  line-height: normal !important;
  font-size: 13px;
  background: var(--whiteColor);
  color: ${(props) => (props.color)};
  border: 1px solid  ${(props) => (props.color)};
  border-radius: 3px;
`
const AssetTable = ({ loading, data, totalPages, itemsPerPage, page, totalItems, onChangePage, onRefresh ,importExcel }) => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        header: 'STT',
        classNameHeader: 'ca_text_center text-center',
        formatter: (d, index) => <p>{index + 1}</p>,
      },
      {
        header: 'Mã trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.asset_code}</p>,
      },
      {
        header: 'Tên trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.asset_name}</p>,
      },
      {
        header: 'Dòng sản phẩm',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.model?.model_name}</p>,
      },
    {
        header: 'Di dời',
        accessor: 'is_movable',
        classNameHeader: 'ca_text_center',
        formatter: (d) => { if(d.is_movable){
            return <p>Có thể</p>
        }else{
            return <p>Không thể</p>
        }},
      },
      {
        header: 'Trạng thái',
        accessor: 'is_movable',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Label color={d?.status_obj?.color}>{d?.status_obj?.display_name}</Label>
      },
    {
        header: 'Số lượng',
        accessor: 'quantity',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.quantity}</p>,
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
    //   {
    //     globalAction: true,
    //     icon: 'fi fi-rr-inbox-in',
    //     type: 'success',
    //     outline: true,
    //     content: 'Nhập excel',
    //     onClick: () => importExcel(),
    //   },
    //   {
    //     globalAction: true,
    //     icon: 'fi fi-rr-plus',
    //     type: 'success',
    //     content: 'Khai báo',
    //     onClick: () => window._$g.rdr(`/asset/add`),
    //   },
      {
        icon: 'fi fi-rr-edit',
        color: 'blue',
        onClick: (p) => window._$g.rdr(`/asset/edit/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-eye',
        color: 'green',
        onClick: (p) => window._$g.rdr(`/asset/detail/${p?.id}`),
      },
      {
        icon: 'fi fi-rr-trash',
        color: 'red',
        onClick: (_, d) =>
          dispatch(
            showConfirmModal(
              ['Bạn có thực sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
              async () => {
                await deleteBuilding([parseInt(_?.id)]);
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
              await deleteBuilding(e?.map((val) => parseInt(val?.id)));
              onRefresh();
            },
          ),
        );
      }}
    />
  );
};

export default AssetTable;
