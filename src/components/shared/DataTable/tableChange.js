import React, { useCallback, useMemo, useState, useEffect } from 'react';
import CAButton from '../CAButton';
import PropTypes from 'prop-types';
import CheckAccess from 'navigation/CheckAccess';
import _ from 'lodash';
import styled from 'styled-components';
import { InputNumber } from 'antd';
import { Empty } from 'antd';
import TrTable from './element/TrTable';

const Delelist = styled.span`
  display: ${(props) => (props?.hidden ? 'none' : '')};
  cursor: pointer;
  b {
    color: red;
  }
`;

const SelectList = styled.span`
  display: ${(props) => (props?.hidden ? 'none' : '')};
  cursor: pointer;
  b {
    color: blue;
  }
`;

const InputNumberStyled = styled(InputNumber)`
  margin-right: 6px;
  .ant-input-number-handler-wrap {
    display: none !important;
  }
`;

const Wrapper = styled.div`
  @keyframes loading {
    to {
      background-position-x: -30%;
    }
  }
  .loader {
    background-color: #ededed;
    height: 18px;
    border-radius: 7px;
    width: 100%;
  }
  td .loader {
    background-color: #ededed;
    background: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 60%
      )
      #ededed;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
  }
`;

const DataTable = ({
  // show left
  loading,
  title,
  columns,
  data,
  actions,

  fieldCheck,
  noSelect,
  noPaging,
  defaultDataSelect,
  showBulkButton,
  deleteAllData,
  setCheckDelete,
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onChangeSelect,
  onChangePage,
  hiddenRowSelect,
  handleBulkAction = () => {},
  hiddenDeleteClick,
  getChildren,
  parentField,
}) => {
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [dataSelect, setDataSelect] = useState(defaultDataSelect ?? []);
  //data first
  useEffect(() => {
    setCheckDelete(true);
    setDataSelect([]);
  }, [deleteAllData]);

  const totalChecked = useMemo(() => {
    if (
      data.filter((o) => {
        if (typeof hiddenRowSelect === 'function') {
          return !hiddenRowSelect(o);
        } else {
          return true;
        }
      }).length === 0
    ) {
      return false;
    }
    const dataFilter = dataSelect.filter((o) =>
      data.some((p) => {
        if (fieldCheck) {
          return String(o[fieldCheck]) === String(p[fieldCheck]);
        } else {
          return _.isEqual(o, p);
        }
      }),
    );
    if (dataFilter.length === data.filter((o) => !hiddenRowSelect?.(o)).length) {
      return true;
    }
    return false;
  }, [data, dataSelect]);

  const rowAction = useMemo(() => {
    return (actions ?? []).filter((p) => !p.globalAction && !Boolean(typeof p.hidden !== 'function' && p.hidden));
  }, [actions]);

  const colSpan = useMemo(() => {
    const spanSelect = noSelect ? 0 : 1;
    const spanRowAction = Boolean(rowAction.length) ? 1 : 0;
    return spanSelect + spanRowAction + (columns ?? []).length;
  }, [noSelect, rowAction]);

  const renderRowAction = useCallback(
    (valueRender, keyRender) => {
      return (rowAction ?? [])?.map((action) => {
        const { hidden, disabled, permission, onClick, color, icon, title } = action;
        return (
          <CheckAccess permission={permission}>
            <a
              disabled={typeof disabled === 'function' ? disabled?.(valueRender) : disabled}
              onClick={(_) => onClick?.(valueRender, keyRender)}
              style={{
                marginRight: '2px',
                display: `${typeof hidden === 'function' && hidden(valueRender) ? 'none' : ''}`,
              }}
              title={title}
              className={`ca_btn_table ca_${color}`}>
              <i className={`fi ${icon}`}></i>
            </a>
          </CheckAccess>
        );
      });
    },
    [rowAction],
  );

  const totalShowRecord = useMemo(() => {
    if (data.length < itemsPerPage) {
      return data.length;
    } else if (itemsPerPage > totalItems) {
      return totalItems;
    } else {
      return itemsPerPage;
    }
  }, [data, itemsPerPage, totalItems]);

  const renderData = useCallback(
    (valueRender, keyRender) => {
      let _dataSelect = [...dataSelect];
      const findIndex = _dataSelect.findIndex((o) => {
        if (fieldCheck) {
          return String(o[fieldCheck]) === String(valueRender[fieldCheck]);
        } else {
          return _.isEqual(o, valueRender);
        }
      });

      const flag = findIndex >= 0;
      return (
        <TrTable
          colSpan={colSpan}
          keyRender={keyRender}
          flag={flag}
          noSelect={noSelect}
          hiddenRowSelect={hiddenRowSelect}
          _dataSelect={_dataSelect}
          setDataSelect={setDataSelect}
          columns={columns}
          valueRender={valueRender}
          findIndex={findIndex}
          rowAction={rowAction}
          renderRowAction={renderRowAction}
          getChildren={getChildren}
          parentField={parentField}
        />
      );
    },
    [columns, dataSelect],
  );

  const handleCheckAll = useCallback(() => {
    const _dataSelect = [...dataSelect];
    if (totalChecked) {
      for (let i of data) {
        const findIndex = _dataSelect.findIndex((o) => {
          if (fieldCheck) {
            return String(o[fieldCheck]) === String(i[fieldCheck]);
          } else {
            return _.isEqual(o, i);
          }
        });
        if (findIndex >= 0) {
          _dataSelect.splice(findIndex, 1);
        }
        setDataSelect(_dataSelect);
      }
    } else {
      for (let i of data) {
        if (!hiddenRowSelect?.(i)) {
          const findIndex = _dataSelect.findIndex((o) => {
            if (fieldCheck) {
              return String(o[fieldCheck]) === String(i[fieldCheck]);
            } else {
              return _.isEqual(o, i);
            }
          });
          if (findIndex < 0) {
            _dataSelect.push(i);
          }
          setDataSelect(_dataSelect);
        }
      }
    }
  }, [totalChecked, dataSelect, data]);

  useEffect(() => {
    onChangeSelect?.(dataSelect);
  }, [onChangeSelect, dataSelect]);

  useEffect(() => {
    setCurrentPage(totalPages ? parseInt(page) : totalPages);
  }, [page, totalPages]);

  const handeChangePage = useCallback(() => {
    if (parseInt(currentPage) !== parseInt(page)) onChangePage(currentPage);
  }, [currentPage, page]);

  const jsx_tbody =
    data?.length > 0 ? (
      <tbody>{data?.map((value, key) => renderData(value, key))}</tbody>
    ) : (
      <tbody>
        <tr>
          <td colSpan={colSpan}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không có dữ liệu' />
          </td>
        </tr>
      </tbody>
    );

  return (
    <React.Fragment>
      <Wrapper className='ca_box_card'>
        <div className='ca_row ca_mt_2 ca_mb_2 ca_align_items_center'>
          <div className='ca_col_6'>
            {title}
            {Boolean(dataSelect.length) > 0 && (
              <div className='ca_show_record'>
                <p className='ca_choose_record'>
                  {showBulkButton && (
                    <button
                      className='ca_btn ca_btn_success'
                      style={{ marginRight: '8px' }}
                      type='button'
                      onClick={() => {
                        handleBulkAction(dataSelect);
                      }}>
                      <span class='fi fi-rr-add'></span> Chọn
                    </button>
                  )}
                  <b>{dataSelect.length}</b> đang chọn{' '}
                  <a id='data-table-select' onClick={() => setDataSelect([])}>
                    Bỏ chọn
                  </a>{' '}
                  <Delelist
                    id='trigger-delete'
                    hidden={hiddenDeleteClick}
                    className='ca_red ca_delete'
                    onClick={() => {
                      handleBulkAction && handleBulkAction(dataSelect, 'delete');
                    }}>
                    | <b>Xoá tất cả</b>
                  </Delelist>
                </p>
              </div>
            )}
          </div>
          <div className='ca_col_6 ca_flex ca_justify_content_right ca_btn_group'>
            {actions
              ?.filter((p) => p.globalAction && !p.hidden)
              .map((props, i) => (
                <CheckAccess permission={props?.permission}>
                  <CAButton
                    style={{
                      marginLeft: '3px',
                    }}
                    {...props}
                  />
                </CheckAccess>
              ))}
          </div>
        </div>
        <div className='ca_table_responsive'>
          <table className='ca_table'>
            <thead>
              <tr>
                {!noSelect && (
                  <th className='ca_sticky ca_check_sticky'>
                    {Boolean(data.filter((o) => !hiddenRowSelect?.(o)).length) && (
                      <label className='ca_checkbox'>
                        <input type='checkbox' onChange={() => handleCheckAll()} checked={totalChecked} />
                        <span></span>
                      </label>
                    )}
                  </th>
                )}

                {columns
                  ?.filter((value) => !value.hidden)
                  .map((p, o) => (
                    <th key={o} className={p?.classNameHeader ? p?.classNameHeader : ''}>
                      {p?.header}
                    </th>
                  ))}
                {Boolean(rowAction.length) && <th className='ca_sticky ca_action_table ca_text_center'>Thao tác</th>}
              </tr>
            </thead>

            {loading ? (
              <tbody>
                {Array.from(Array(10).keys())?.map(() => {
                  return (
                    <tr className='tr'>
                      {Array.from(Array(colSpan).keys())?.map(() => {
                        return (
                          <td className='td'>
                            <div className='loader'></div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              jsx_tbody
            )}
          </table>
        </div>
        {!noPaging && (
          <div className='ca_row ca_mt_2 ca_show_table_page'>
            <div className='ca_col_6'>
              <p>
                Show {totalShowRecord}/{totalItems} records
              </p>
            </div>
            <div className='ca_col_6 ca_flex ca_justify_content_right ca_align_items_center'>
              <div className='ca_nav_table'>
                <button
                  type='button'
                  disabled={!(currentPage !== 1) || !totalPages}
                  onClick={() => {
                    onChangePage(parseInt(currentPage) - 1);
                  }}
                  className={totalPages && currentPage !== 1 ? 'ca_active' : ''}>
                  <span className='fi fi-rr-angle-small-left'></span>
                </button>
                <InputNumberStyled
                  min={1}
                  onChange={(e) => {
                    setCurrentPage(e);
                  }}
                  onPressEnter={() => onChangePage(currentPage)}
                  onBlur={() => handeChangePage()}
                  value={currentPage}
                  max={totalPages}
                />
                <span className='ca_all_page'>/ {totalPages}</span>
                <button
                  type='button'
                  disabled={parseInt(totalPages) === parseInt(currentPage)}
                  onClick={() => {
                    onChangePage(parseInt(currentPage) + 1);
                  }}
                  className={!(parseInt(totalPages) === parseInt(currentPage)) ? 'ca_active' : ''}>
                  <span className='fi fi-rr-angle-small-right'></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

DataTable.propTypes = {
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

  /** Table actions */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      icon: PropTypes.node,
      content: PropTypes.string,
      onClick: PropTypes.func,
      color: PropTypes.string,
      globalAction: PropTypes.bool,
      disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      permissions: PropTypes.string,
    }),
  ),

  /** on row click */
  onRowClick: PropTypes.func,

  /** number of pages (controlled pagination) */
  pageCount: PropTypes.number,

  /** number of rows (controlled pagination) */
  totalCounts: PropTypes.number,

  /** No Paging flag */
  noPaging: PropTypes.bool,
};

DataTable.defaultProps = {
  data: [],
  onChangeSelect: () => {},
};

export default DataTable;
