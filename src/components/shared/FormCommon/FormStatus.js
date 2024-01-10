import React from 'react';

import FormInput from 'components/shared/CAFormControl/FormInput';
import CAAccordion from 'components/shared/CAAccordion/index';

const FormStatus = ({ disabled, hiddenActive, hiddenSystem }) => {
  return (
    <CAAccordion title='Trạng thái'>
      <div className='ca_row'>
        <div className='ca_col_12'>
          <div className='ca_frm_box'>
            <div className='ca_flex ca_align_items_center ca_lb_sex'>
              {!hiddenActive && (
                <label className='ca_checkbox'>
                  <FormInput disabled={disabled} type='checkbox' field='is_active' />
                  <span />
                  Kích hoạt
                </label>
              )}
              {!hiddenSystem && (
                <label className='ca_checkbox'>
                  <FormInput disabled={disabled} type='checkbox' field='is_system' />
                  <span />
                  Hệ thống
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </CAAccordion>
  );
};

export default FormStatus;
