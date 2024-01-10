import React, { useState } from 'react';
import Rooms from './Room/Rooms';
import CAAccordion from 'components/shared/CAAccordion';

function RoomImport({ disabled }) {
  const [tabActive, setTabActive] = useState('ca_cate');

  return (
    <React.Fragment>
      <CAAccordion title='Danh sách phòng' id='ca_account_cus' isRequired>
        <Rooms disabled={disabled} setTabActive={setTabActive} />
      </CAAccordion>
    </React.Fragment>
  );
}

export default RoomImport;
