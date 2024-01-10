import DataTable from 'components/shared/DataTable/index';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { showConfirmModal } from 'actions/global';
import { deleteBuilding } from 'services/building.service';
import styled from 'styled-components';
import { showToast } from 'utils/helpers';
// import { deleteAsset } from '../services/call-api';

const Label = styled.p`
  display: inline-block;
  padding: 3px 7px;
  line-height: normal !important;
  font-size: 13px;
  background: var(--whiteColor);
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 3px;
`;
const AssetTable = ({
  loading,
  data,
  totalPages,
  itemsPerPage,
  page,
  totalItems,
  onChangePage,
  onRefresh,
  onClose,
}) => {
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
        formatter: (d) => <p>{d?.asset_code}</p>,
      },
      {
        header: 'Tên trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.asset_name}</p>,
      },
      // {
      //   header: 'Dòng sản phẩm',
      //   classNameHeader: 'ca_text_center',
      //   formatter: (d) => <p>{d?.model?.model_name}</p>,
      // },
      {
        header: 'Trạng thái trước kiểm kê',
        accessor: 'is_movable',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Label color={d?.status_before_obj?.color}>{d?.status_before_obj?.display_name}</Label>,
      },
      {
        header: 'Trạng thái sau kiểm kê',
        accessor: 'is_movable',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (d) => <Label color={d?.status_reported_obj?.color}>{d?.status_reported_obj?.display_name}</Label>,
      },
      {
        header: 'Số lượng trước kiểm kê',
        accessor: 'quantity',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.quantity_before}</p>,
      },
      {
        header: 'Số lượng sau kiểm kê',
        accessor: 'quantity',
        classNameHeader: 'ca_text_center',
        formatter: (d) => <p>{d?.quantity_reported}</p>,
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

  return (
    <div className='ca_modal ca_modal_open' id='ca_asset_table'>
      <div className='ca_modal_container ca_w800'>
        <div className='ca_title_modal'>
          <h3>Danh sách trang thiết bị trong phòng</h3>
          <span
            className='ca_close_modal fi fi-rr-cross-small'
            onClick={() => {
              onClose(false);
            }}></span>
        </div>
        <div className='ca_main_modal'>
          <DataTable
            loading={loading}
            columns={columns}
            data={data}
            //   actions={actions}
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
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
