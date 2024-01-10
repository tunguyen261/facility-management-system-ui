import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { mapDataOptions4Select, showToast } from 'utils/helpers';
import { ColorPicker } from 'antd';
import { useFormContext } from 'react-hook-form';

const Information = ({ disabled, title }) => {
  const methods = useFormContext();
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          <FormItem className='ca_col_4' label='Tên trạng thái' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='status_name'
              placeholder='Tên trạng thái'
              validation={{
                required: 'Tên trạng thái là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem disabled={disabled} isRequired label='Màu'>
            <div
              style={{
                display: 'flex',
              }}>
              <input disabled className='ca_col_4' type='text' value={methods.watch('color')} placeholder='Màu' />
              <ColorPicker
                allowClear={true}
                value={methods.watch(`color`)}
                style={{ width: '100%' }}
                onChange={(value, hex) => {
                  methods.setValue('color', hex);
                }}
                presets={[
                  {
                    label: 'Hay dùng',
                    colors: [
                      '#000000',
                      '#000000E0',
                      '#000000A6',
                      '#00000073',
                      '#00000040',
                      '#00000026',
                      '#0000001A',
                      '#00000012',
                      '#0000000A',
                      '#00000005',
                      '#F5222D',
                      '#FA8C16',
                      '#FADB14',
                      '#8BBB11',
                      '#52C41A',
                      '#13A8A8',
                      '#1677FF',
                      '#2F54EB',
                      '#722ED1',
                      '#EB2F96',
                      '#F5222D4D',
                      '#FA8C164D',
                      '#FADB144D',
                      '#8BBB114D',
                      '#52C41A4D',
                      '#13A8A84D',
                      '#1677FF4D',
                      '#2F54EB4D',
                      '#722ED14D',
                      '#EB2F964D',
                    ],
                  },
                ]}
              />
            </div>
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
