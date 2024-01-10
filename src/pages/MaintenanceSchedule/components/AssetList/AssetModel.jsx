
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FilterModel from './AssetModal/Filter';
import ModelTable from './AssetModal/Table';
import { FormProvider, useForm } from 'react-hook-form';
import { getAssetList } from 'pages/Asset/services/call-api';
const AssetModal = ({ open, onClose, onConfirm, selected, stockId = null }) => {
  const methods = useForm();
  const [loading, setLoading] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    page_size: 10,
  });

  const [dataList, setDataList] = useState({
    data: [],
    page_size: 0,
    page: 0,
    total_count: 0,
    total_pages: 0,
  });

  const columns = useMemo(
    () => [
      {
        header: 'Mã trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (p) => <b>{p?.asset_code}</b>,
      },
      {
        header: 'Tên trang thiết bị',
        classNameHeader: 'ca_text_center',
        formatter: (p) => <b>{p?.asset_name}</b>,
      },
      {
        header: 'Số lượng',
        classNameHeader: 'ca_text_center',
        classNameBody: 'ca_text_center',
        formatter: (p) => <span>{p?.quantity}</span>,
      },
    ],
    [],
  );
  const loadData = useCallback(() => {
    setLoading(true);
    getAssetList({ ...params})
      .then((res) => setDataList(res))
      .finally(() => {
        setLoading(false);
      });
  }, [params]);
  useEffect(loadData, [loadData]);

  useEffect(() => {
    if (Object.values(selected).length) {
      setItemSelected(selected);
    }
  }, [selected]);

  const { data = [], page_size, page, total_count, total_pages } = dataList;

  ///zone handle scroll effect for header position

  const styleModal = { marginLeft: '300px' };

  const headerStyles = {
    backgroundColor: 'white',
    borderBottom: '#ddd 1px solid',
    position: 'sticky',
    marginTop: '-20px',
    zIndex: '1',
    top: '-2rem',
    // width: '74rem',
    marginLeft: '-20px',
    height: '4rem',
  };
  const titleModal = {
    marginLeft: '2rem',
    marginTop: '1rem',
  };
  const closeModal = {
    marginRight: '2rem',
    marginTop: '1rem',
  };
  ////end zone

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <div className={`ca_modal ${open ? 'ca_modal_open' : ''}`} id='ca_notice_del'>
          <div className='ca_modal_container ca_w800' style={styleModal}>
            <div className='ca_title_modal' style={headerStyles}>
              <h3 style={titleModal}>Chọn trang thiết bị</h3>
              <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose} style={closeModal}></span>
            </div>
            <div className='ca_main_modal ca_border_top'>
              <div className='ca_row'>
                <FilterModel
                  onChange={(p) => {
                    setParams({
                      ...params,
                      ...p,
                    });
                  }}
                />
                <div className='ca_col_12 ca_mt_1' style={{ overflowX: 'auto', maxHeight: '45vh' }}>
                  <h3 style={{ marginBottom: 7, fontWeight: 700 }}>Danh sách trang thiết bị</h3>
                  <ModelTable
                    itemSelected={itemSelected}
                    setItemSelected={(_value) => setItemSelected(_value)}
                    data={data}
                    totalPages={total_pages}
                    itemsPerPage={page_size}
                    page={page}
                    totalItems={total_count}
                    columns={columns}
                    onChangePage={(page) => {
                      setParams({
                        ...params,
                        page: page,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='ca_footer_modal'>
              <button
                className='ca_btn ca_btn_success'
                type='button'
                onClick={() => onConfirm('asset_ids', itemSelected)}>
                <span className='fi fi-rr-check'></span>
                Cập nhật
              </button>
              <button type='button' onClick={onClose} className='ca_btn_outline ca_btn_outline_danger'>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    </React.Fragment>
  );
};

AssetModal.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};

export default AssetModal;
