import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import {MOVABLE_OPTION, UnitOptions} from 'utils/constants'
import { getAssetTypeOpts } from 'pages/Asset/services/call-api';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { useFormContext } from 'react-hook-form';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 25,
  });



  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Tên nhãn hiệu' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='brand_name'
              placeholder='Nhập tên nhãn hiệu'
              validation={{
                required: 'Tên nhãn hiệu là bắt buộc',
              }}
            />
          </FormItem>
        </div>
        <div className='ca_row'>
          <FormItem className='ca_col_12' label='Mô tả'>
            <FormTextArea field='description' rows={3} placeholder='Mô tả' disabled={disabled} />
          </FormItem>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
