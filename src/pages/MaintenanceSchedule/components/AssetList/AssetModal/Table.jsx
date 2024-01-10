import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CALoader from 'components/shared/CALoader/index';
import styled from 'styled-components';
import { InputNumber } from 'antd';

const InputNumberStyled = styled(InputNumber)`
  margin-right: 6px;
  .ant-input-number-handler-wrap {
    display: none !important;
  }
`;

const ModalTable = ({
  // show left
  loading,
  columns,
  data,

  noPaging,
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onChangePage,
  itemSelected,
  setItemSelected,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleSelectedAll = ({ target: { checked } }) => {
    let _selected = [];
    if (checked) {
      _selected = [...itemSelected,...data];
    }
    setItemSelected(_selected);
  };
  const handleSelected = (valueRender, checked) => {
    let _selected = [...itemSelected];
    if (checked) {
      _selected.push(valueRender);
    } else {
      _selected =_selected.filter(item=>item.id != valueRender.id)
    }

    setItemSelected(_selected);
  };

  const renderData = useCallback(
    (valueRender, keyRender) => (
      <tr>
        <td className='ca_sticky ca_check_sticky ca_text_center'>
          <label className='ca_checkbox'>
            <input
              key={keyRender}
              onChange={({ target: { checked } }) => handleSelected(valueRender, checked)}
              type='checkbox'
              checked={!!itemSelected.find(item => item?.id == valueRender?.id)?.id}
            />
            <span></span>
          </label>
        </td>
        {columns?.map((column, key) => {
          if (column.formatter) {
            return (
              <td className={column?.classNameBody} key={`${keyRender}${key}`}>
                {column?.formatter(valueRender)}
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
      </tr>
    ),
    [columns, itemSelected],
  );

  const totalChecked = data.filter((_user) => itemSelected[_user?.imei]).length;

  return (
    <>
      <div className='ca_table_responsive'>
        <table className='ca_table'>
          <thead>
            <th className='ca_sticky ca_check_sticky ca_text_center'>
              <label className='ca_checkbox'>
                {/* <input
                  type='checkbox'
                  onChange={handleSelectedAll}
                  checked={totalChecked > 0 && totalChecked == data.length ? true : false}
                /> */}
                <span></span>
              </label>
            </th>
            {columns?.map((p) => (
              <th className={p?.classNameHeader}>{p?.header}</th>
            ))}
          </thead>

          {loading ? (
            <tbody>
              <CALoader isPage={false} />
            </tbody>
          ) : (
            <tbody>
              {data.length ? (
                data?.map((value, key) => {
                  return renderData(value, key);
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className='ca_text_center'>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      {!noPaging && (
        
        <div className='ca_row ca_mt_2 ca_show_table_page'>
          <div className='ca_col_6'>
            <p>
              Show {totalItems > 0 ? itemsPerPage : 0}/{totalItems} records
            </p>
          </div>
          <div className='ca_col_6 ca_flex ca_justify_content_right ca_align_items_center ca_mb_1'>
            <div className='ca_nav_table'>
              <button
                disabled={!(Boolean(currentPage) && parseInt(currentPage) !== 1)}
                onClick={() => {
                  onChangePage(parseInt(currentPage) - 1);
                }}
                className={Boolean(currentPage) && parseInt(currentPage) !== 1 && 'ca_active'}
                type='button'>
                <span className='fi fi-rr-angle-small-left'></span>
              </button>
              <InputNumberStyled
                min={1}
                onChange={(e) => {
                  setCurrentPage(e);
                }}
                onPressEnter={(e) => {
                  e.preventDefault();
                  onChangePage(currentPage);
                }}
                onBlur={() => onChangePage(currentPage)}
                value={currentPage}
                max={totalPages}
              />
              <span className='ca_all_page'>/ {totalPages}</span>
              <button
                disabled={parseInt(totalPages) === parseInt(currentPage)}
                onClick={() => {
                  onChangePage(parseInt(currentPage) + 1);
                }}
                className={!(parseInt(totalPages) === parseInt(currentPage)) && 'ca_active'}
                type='button'>
                <span className='fi fi-rr-angle-small-right'></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ModalTable.propTypes = {
  /** Title of table */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Array of table's columns */
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  /** Array of table's data */
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  /** Decide if table is selectable */
  selectable: PropTypes.bool,
  selectedHidden: PropTypes.bool,
  onSelectionChange: PropTypes.func,

  /** Indicate table's loading state */
  loading: PropTypes.bool,
};

export default ModalTable;
