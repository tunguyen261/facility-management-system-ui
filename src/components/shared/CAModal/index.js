import React from 'react';
import PropTypes from 'prop-types';
import CAButton from '../CAButton/index';

const CAModal = ({ className, children, open, onClose, onConfirm, header, footer }) => {
  return (
    <React.Fragment>
      <div className={`ca_modal ${className} ${open ? 'ca_modal_open' : ''}`} id='ca_notice_del'>
        <div className='ca_modal_container'>
          <div className='ca_title_modal ca_border_bottom'>
            <h3>{header}</h3>
            <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose} />
          </div>
          <div className='ca_main_modal ca_text_center'>{children}</div>
          <div className='ca_footer_modal ca_justify_content_center'>
            {footer && <CAButton type="danger" content={footer} onClick={onConfirm} /> }
            <CAButton type="" outline className='ca_close_modal' content='Quay về' onClick={onClose} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
CAModal.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};

export default CAModal;
