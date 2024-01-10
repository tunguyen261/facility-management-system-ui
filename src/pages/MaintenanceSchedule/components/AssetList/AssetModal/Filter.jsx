import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';

const FilterModal = ({ onChange }) => {
  const methods = useForm();

  const onClear = () => {
    methods.reset({
      keyword: '',
      is_active: 1,
    });
    onChange(methods.getValues());
  };

  return (
    <FormProvider {...methods}>
      <div className='ca_search_box ca_col_12'>
        <form onSubmit={methods.handleSubmit(onChange)}>
          <FormItem label='Từ khoá' className='ca_col_6'>
            <FormInput type='text' field='keyword' placeholder='Nhập tên, mã trang thiết bị' />
          </FormItem>

          <div className='ca_row ca_align_items_center '>
            <div className='ca_col_12 ca_flex ca_justify_content_right ca_btn_group'>
              <button
                style={{ marginRight: '10px' }}
                type='submit'
                onClick={(e) => methods.handleSubmit(onChange)(e)}
                className='ca_btn ca_btn_success'>
                <span className='fi fi-rr-filter'></span> Tìm kiếm
              </button>
              <button type='button' onClick={() => onClear()} className='ca_btn_outline'>
                Làm mới
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default FilterModal;
