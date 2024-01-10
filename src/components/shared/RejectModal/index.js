import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import CAButton from '../CAButton';
import ICON_COMMON from 'utils/icons.common';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';
import FormItem from '../CAFormControl/FormItem';
import FormInput from '../CAFormControl/FormInput';
import FormTextArea from '../CAFormControl/FormTextArea';
import { showToast } from 'utils/helpers';

const RejectModal = ({ id, onClose, handleReject }) => {
  const methods = useFormContext();
  return (
    <div className='ca_modal ca_modal_open' id='ca_reject_modal'>
      <div className='ca_modal_container ca_filter' style={{ backgroundColor: 'var(--grayColor)' }}>
        <div className='ca_title_modal'>
          <h3>Lý do từ chối</h3>
          <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose}></span>
        </div>
        <div className='ca_main_modal'>
          <FormItem className='ca_col_12' label='Nội dung'>
            <FormTextArea
              row={3}
              type='text'
              field='reason'
              placeholder='Nhập nội dung'
              validation={{
                required: 'Nội dung từ chối là bắt buộc',
              }}
            />
          </FormItem>
        </div>
        <div className='ca_footer_modal'>
          <button
            className='ca_btn ca_btn_danger'
            onClick={async () => {
              await handleReject(id, { status: 5, reason: methods.watch('reason') });
              showToast.success('Đã từ chối');
              onClose();
            }}>
            <span className='fi fi-rr-check'></span> Từ chối
          </button>
          <button
            className='ca_btn ca_btn_warning'
            onClick={async () => {
              await handleReject(id, { status: 6, reason: methods.watch('reason') });
              showToast.success('Đã gửi yêu cầu');
              onClose();
            }}>
            <span className='fi fi-rr-redo'></span> Yêu cầu báo cáo lại
          </button>
          <button type='button' className='ca_btn_outline ca_btn_outline_success' onClick={onClose}>
            <span className='fi fi-rr-refresh'></span>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
