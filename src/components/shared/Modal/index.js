import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CAButton from '../CAButton/index';
import styled from 'styled-components';
import { isFunctionComponent } from 'utils/helpers';

const ModalStyled = styled.div`
  .ca_modal_container {
    width: ${(props) => props.witdh ?? ''}!important;
    max-width: ${(props) => props.witdh ?? ''}!important;
  }
`;

const Modal = ({ children, open, onClose, header, footer, witdh, lalbelClose }) => {
  const jsx_header = useCallback(() => {
    if (isFunctionComponent(header)) {
      const Header = header;
      return <Header />;
    } else {
      return <h3>{header}</h3>;
    }
  }, [header]);

  return (
    <React.Fragment>
      <ModalStyled witdh={witdh} className={`ca_modal ${open ? 'ca_modal_open' : ''}`} id='ca_notice_del'>
        <div className='ca_modal_container'>
          <div className='ca_title_modal ca_border_bottom'>
            {jsx_header()}
            <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose} />
          </div>
          <div className='ca_main_modal'>{children}</div>
          <div className='ca_footer_modal ca_justify_content_right'>
            {/* {footer && <CAButton type='danger' content={footer} onClick={onConfirm} />} */}
            {footer}
            <CAButton
              type='button'
              outline
              className='ca_close_modal'
              content={lalbelClose ?? 'Quay về'}
              onClick={onClose}
            />
          </div>
        </div>
      </ModalStyled>
    </React.Fragment>
  );
};
Modal.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
