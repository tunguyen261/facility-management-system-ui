import React, { useState } from 'react';
import Assets from './Asset/Assets';
import CAAccordion from 'components/shared/CAAccordion';

function AssetImport({ disabled }) {
  const [tabActive, setTabActive] = useState('ca_cate');

  return (
    <React.Fragment>
      <CAAccordion title='Danh sách thiết bị' id='ca_account_cus' isRequired>
        <Assets disabled={disabled} setTabActive={setTabActive} />
      </CAAccordion>
    </React.Fragment>
  );
}

export default AssetImport;
