import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import CAButton from '../CAButton';
import ICON_COMMON from 'utils/icons.common';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ModalPortal = (props) => {
  const {
    wrapperId = 'ca_modal_root',
    title = 'Chọn',
    confirmText = 'Xác nhận',
    onConfirm = () => {},
    onReject,
    rejectText = 'Hủy',
    closeText = 'Đóng',
    open = true,
    onClose = () => {},
    children,
    width = 800,
    loading = false,
  } = props;

  const [wrapperElement, setWrapperElement] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const element = document.createElement('div');
    const modalRoot = document.getElementById(wrapperId);
    modalRoot?.appendChild(element);
    setWrapperElement(element);
    setIsMounted(true);

    return () => {
      modalRoot?.removeChild(element);
    };
  }, [wrapperId]);

  if (!open || !isMounted) return null;

  return createPortal(
    <div className='ca_modal ca_modal_open' id={`${wrapperId}_container`}>
      <div className={classNames('ca_modal_container', { [`ca_w${width}`]: Boolean(width) })}>
        <div className='ca_title_modal'>
          <h3>{title}</h3>
          <span className='fi fi-rr-cross-small ca_close_modal' onClick={onClose}></span>
        </div>
        <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <div className='ca_main_modal'>{children}</div>
        </Spin>
        <div className='ca_footer_modal'>
          {typeof onConfirm === 'function' && (
            <CAButton type='success' icon={ICON_COMMON.save} content={confirmText} onClick={onConfirm} />
          )}
          {typeof onReject === 'function' && (
            <CAButton type='danger' icon={ICON_COMMON.reject} content={rejectText} onClick={onReject} />
          )}
          {typeof onClose === 'function' && (
            <button type='button' className='ca_btn_outline' onClick={onClose}>
              {closeText}
            </button>
          )}
        </div>
      </div>
    </div>,
    wrapperElement,
  );
};

export default ModalPortal;
