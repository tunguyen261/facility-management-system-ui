import { showConfirmModal } from 'actions/global';

import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AssetModel from '../AssetList/AssetModel';

import { useFormContext } from 'react-hook-form';
import CAAccordion from 'components/shared/CAAccordion/index';


const AssetList = ({ disabled }) => {
  const methods = useFormContext();

  const {
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const [isModelAsset, setIsModelAsset] = useState(false);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [totalItems, setTotalItem] = useState(0);

  const handleSelect = (key, values = {}) => {
    setValue(`${key}`, values);
    setIsModelAsset(false);
    setTotalPages(Math.ceil(Object.values(watch('asset_ids')).length / itemsPerPage));
  };

  const dispatch = useDispatch();

  const handleDelete = (key = '', keyValue = '') => {
    let _selected = watch(`${key}`);
    _selected =_selected.filter(item=>item.id != keyValue)
    setValue(`${key}`, _selected);

    setTotalItem(_selected.length ?? 0);
    setTotalPages(Math.ceil(_selected?.length / itemsPerPage));
  };

  const handleOpent = () => {
      setIsModelAsset(true);
  };


  const columns = useMemo(() => [
    {
      header: 'STT',
      classNameHeader: 'ca_sticky ca_check_sticky ca_text_center',
      classNameBody: 'ca_text_center',
      formatter: (p, idx) => <b className='ca_sticky ca_name_sticky'>{idx + 1}</b>,
    },
    {
      header: 'Mã trang thiết bị',
      classNameHeader: 'ca_text_center',
      formatter: (p) => <p>{p?.asset_code}</p>,
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
      formatter: (p) => <b>{p?.quantity}</b>,
    },
  ], [])

  const renderData = useCallback(
    (valueRender, keyRender) => (
      <tr>
        {columns
          ?.filter((_) => !_.hidden)
          ?.map((column, key) => {
            if (column.formatter) {
              return (
                <td className={column?.classNameBody} key={`${keyRender}${key}`}>
                  {column?.formatter(valueRender, keyRender)}
                </td>
              );
            } else if (column.accessor) {
              return (
                <td className={column?.classNameBody} key={`${keyRender}${key}`}>
                  {valueRender[column.accessor]}
                </td>
              );
            } else {
              return <td className={column?.classNameBody} key={`${keyRender}${key}`}></td>;
            }
          })}

        <td className='ca_sticky ca_action_table ca_text_center'>
            <a
              disabled={disabled}
              onClick={() => {
                if (!disabled) {
                  dispatch(
                    showConfirmModal(['Bạn có thật sự muốn xóa?', 'Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.'],
                    async () => {
                      handleDelete('asset_ids', valueRender?.id);
                    }),
                  );
                }
              }}
              style={{
                marginRight: '2px',
              }}
              className={`ca_btn_table ca_red`}>
              <i className={`fi fi-rr-trash`}></i>
            </a>
        </td>
      </tr>
    ),
    [columns,disabled],
  );
  return (
    <React.Fragment>
      <CAAccordion title='Trang thiết bị bảo trì' id='ca_asset_list' isRequired={true}>
        {!disabled ? (
          <div className='ca_row ca_align_items_center'>
            <div className='ca_col_12' style={{ flexWrap: 'nowrap' }}>
              <div className='ca_btn_group ca_btn_grp ca_flex ca_align_items_center ca_justify_content_right'>
                <a className='ca_btn ca_btn_success ca_open_modal' onClick={() => handleOpent()}>
                  <span className='fi fi-rr-plus'></span> Thêm
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <div className='ca_table_responsive ca_mt_2'>
          {errors['asset_id'] ? <span className='ca_red'>Trang thiết bị bảo trì là bắt buộc.</span> : null}

          <table className='ca_table ca_mt_1'>
            <thead>
              {columns
                ?.filter((_) => !_.hidden)
                ?.map((p, idx) => (
                  <th key={idx} className={p?.classNameHeader}>
                    {p?.header}
                  </th>
                ))}
              <th className='ca_sticky ca_action_table ca_text_center' style={{ width: '10%' }}>
                Thao tác
              </th>
            </thead>

            <tbody>
              {watch('asset_ids') && Object.values(watch('asset_ids')).length ? (
                Object.values(watch('asset_ids'))?.map((value, key) => {
                  return Math.ceil((key + 1) / itemsPerPage) == page ? renderData(value, key) : null;
                })
              ) : (
                <tr>
                  <td colSpan={10} className='ca_text_center'>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {watch('asset_ids') && Object.values(watch('asset_ids')).length > itemsPerPage ? (
          <div className='ca_row ca_mt_2 ca_show_table_page'>
            <div className='ca_col_6'>
              <p>
                Show {totalItems < 15 ? totalItems : itemsPerPage}/{totalItems} records
              </p>
            </div>

            <div className='ca_col_6 ca_flex ca_justify_content_right ca_align_items_center'>
              <div className='ca_nav_table'>
                <button
                  disabled={!(Boolean(page) && parseInt(page) !== 1)}
                  onClick={() => {
                    setpage(parseInt(page) - 1);
                  }}
                  className={Boolean(page) && parseInt(page) !== 1 && 'ca_active'}>
                  <span className='fi fi-rr-angle-small-left'></span>
                </button>
                <input type='number' value={parseInt(page)} step='1' max={totalPages} />
                <span className='ca_all_page'>/ {totalPages}</span>
                <button
                  disabled={parseInt(totalPages) === parseInt(page)}
                  onClick={() => {
                    setpage(parseInt(page) + 1);
                  }}
                  className={!(parseInt(totalPages) === parseInt(page)) && 'ca_active'}>
                  <span className='fi fi-rr-angle-small-right'></span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </CAAccordion>
      {isModelAsset ? (
        <AssetModel
          open={isModelAsset}
          onConfirm={handleSelect}
          onClose={() => setIsModelAsset(false)}
          header={'Chọn trang thiết bị bảo trì'}
          footer={'Chọn trang thiết bị'}
          selected={watch('asset_ids') || {}}
        />
      ) : null}
    </React.Fragment>
  );
};

export default AssetList;
