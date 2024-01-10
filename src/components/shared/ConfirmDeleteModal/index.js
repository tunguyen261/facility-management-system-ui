import { useDispatch, useSelector } from 'react-redux';
import { hideConfirmModal } from 'actions/global';
import styled from 'styled-components';

const ModalContent = styled.p`
  margin-bottom: 0;
`;

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { confirmMessage, confirmCallback, labelAccept, labelRefuse } = useSelector((state) => state.global);

  return (
    Array.isArray(confirmMessage) &&
    confirmMessage.length > 0 && (
      <div className='ca_modal ca_modal_open' id='ca_notice_del'>
        <div className='ca_modal_container'>
          <div className='ca_title_modal ca_border_bottom'>
            <h3>
              <span className='ca_icon_notice'>
                <i className='fi fi-rr-bell'></i>
              </span>{' '}
              Thông báo
            </h3>
            <span
              onClick={() => {
                dispatch(hideConfirmModal());
              }}
              className='ca_close_modal fi fi-rr-cross-small'></span>
          </div>
          <div className='ca_main_modal ca_text_center'>
            {confirmMessage.map((p, idx) => (
              <ModalContent key={idx}>{p}</ModalContent>
            ))}
          </div>
          <div className='ca_footer_modal ca_justify_content_center'>
            <button
              onClick={() => {
                confirmCallback();
                dispatch(hideConfirmModal());
              }}
              className='ca_btn ca_btn_danger'>
              {labelAccept ?? 'Tôi muốn xóa'}
            </button>
            <button
              onClick={() => {
                dispatch(hideConfirmModal());
              }}
              className='ca_btn_outline ca_close_modal'>
              {labelRefuse ?? 'Quay về'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
