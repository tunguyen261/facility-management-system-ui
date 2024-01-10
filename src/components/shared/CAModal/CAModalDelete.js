import React from 'react';
import CAModal from 'components/shared/CAModal/index';
import styled from 'styled-components';

const ModalContent = styled.p`
  margin-bottom: 0;
`;


const headerModal = (
    <>
        <span className='ca_icon_notice'>
            <i className='fi fi-rr-bell'></i>
        </span>{' '}
        Thông báo
    </>
);

function CAModalDelete({ onCloseModal, handleDelete }) {
  return (
    <CAModal onClose={onCloseModal} open={true} header={headerModal} footer='Tôi muốn xóa' onConfirm={handleDelete}>
      <ModalContent>Bạn có thật sự muốn xóa? </ModalContent>
      <ModalContent>Bạn sẽ mất dữ liệu này và các dữ liệu liên quan.</ModalContent>
    </CAModal>
  );
}

export default CAModalDelete;
