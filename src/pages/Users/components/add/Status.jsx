import React from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';

const Status = ({ disabled }) => {
  return (
    <CAAccordion title='Trạng thái' id='ca_mores' isRequired={false}>
      <div className='ca_row'>
        <div className='ca_col_12'>
          <div className='ca_frm_box'>
            <div className='ca_flex ca_align_items_center ca_lb_sex'>
              <label className='ca_checkbox'>
                <FormInput type='checkbox' field='status' disabled={disabled} />
                <span />
                Kích hoạt
              </label>
            </div>
          </div>
        </div>
      </div>
    </CAAccordion>
  );
};

export default Status;
