import React from 'react';

export default function ImportError({ errors, onClose }) {
  const { error, total } = errors;
  return (
    <>
      <div className='ca_modal ca_modal_open' id='ca_importError'>
        <div className='ca_modal_container ca_filter'>
          <div className='ca_title_modal'>
            <h3>Lỗi nhập file</h3>
            <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose}></span>
          </div>
          <div className='ca_main_modal'>
            <div class='ca_box_card ca_mt_1'>
              <div className='ca_row'>
                <div className='ca_col_12'>
                  <span className='ca_mr_5'>
                    <b>Tổng số dòng:</b> {total}{' '}
                  </span>
                  <span>
                    <b>Số dòng lỗi:</b> {error?.length}
                  </span>
                </div>
                <div className='ca_col_12 ca_mt_1'>
                  <div class='ca_table_responsive'>
                    <table class='ca_table'>
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Mã tài khoản</th>
                          <th>Tên tài khoản</th>
                          <th>Tính chất</th>
                          <th>Công ty thuộc</th>
                          <th>Kích hoạt</th>
                          <th style={{ width: '70%' }}>Lỗi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {error && error.length ? (
                          error.map((er, i) => (
                            <tr key={i}>
                              <td>{er.i}</td>
                              <td>{er.accountingAccount?.accounting_account_code}</td>
                              <td>{er.accountingAccount?.accounting_account_name}</td>
                              <td>{er.accountingAccount?.property}</td>
                              <td>{er.accountingAccount?.is_active}</td>
                              <td style={{ whiteSpace: 'pre', width: '70%' }}>
                                <span className='text-danger'>{er.errmsg.join('\n') || ''}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className='text-center'>
                              Không có dữ liệu
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
