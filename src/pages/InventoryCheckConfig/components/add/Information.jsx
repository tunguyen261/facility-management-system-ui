import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormDatePicker from 'components/shared/CAFormControl/FormDate';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useMemo } from 'react';

const Information = ({ disabled, title }) => {
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    page_size: 9999,
  });
  const methods = useFormContext();
  const { watch, setValue, formState, control, clearErrors } = methods;

  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const isView = useMemo(() => pathname.includes('/detail'), [pathname]);
  const handelAddRowCheckDate = async () => {
    if (disabled) return;
    let value = watch('check_dates') ?? [];
    value.push({});
    clearErrors('check_dates');
    setValue('check_dates', value);
  };
  const handelRemoveCheckDates = (index) => {
    let value = watch('check_dates');
    value.splice(index, 1);
    setValue('check_dates', value);
  };
  const { fields } = useFieldArray({
    control,
    name: 'check_dates',
  });

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          {!isAdd && (
            <FormItem className='ca_col_4' label='Nội dung cấu hình' disabled={disabled}>
              <FormInput type='text' field='content' placeholder='Nhập nội dung cấu hình' />
            </FormItem>
          )}
          <FormItem className='ca_col_4' label='Ngày thông báo trước' isRequired disabled={disabled}>
            <FormInput type='number' field='notification_days' placeholder='Nhập ngày thông báo trước' />
          </FormItem>
        </div>
        <div className='ca_row'>
          <div className='ca_col_12'>
            <div className='ca_tab_items ca_no_pt ca_mt_2 ca_active' id='ca_cate'>
              <div className='ca_btn_group ca_btn_grp ca_flex ca_align_items_center ca_justify_content_right'>
                <a data-href className='ca_btn ca_btn_success' onClick={handelAddRowCheckDate} disabled={disabled}>
                  <span className='fi fi-rr-plus' /> Thêm
                </a>
              </div>
              <div id='rooms_list'>
                <div className='ca_table_responsive ca_mt_2'>
                  <table className='ca_table'>
                    <thead>
                      <tr>
                        <th className='ca_sticky ca_check_sticky ca_text_center'>STT</th>
                        <th className='ca_text_center' style={{ width: '100px' }}>
                          Ngày kiểm tra
                        </th>
                        <th className='ca_text_center' style={{ width: '100px' }}>
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields && fields.length > 0 ? (
                        fields.map((item, index) => {
                          return (
                            item && (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <FormDatePicker
                                    disabled={disabled}
                                    type='text'
                                    field={`check_dates.${index}.inventory_date`}
                                    placeholder='Nhập thời gian kiểm tra'
                                  />
                                </td>
                                <td>
                                  <a
                                    className='ca_btn_table ca_delete ca_red'
                                    onClick={() => handelRemoveCheckDates(index)}>
                                    <i className='fi fi-rr-trash' />
                                  </a>
                                </td>
                              </tr>
                            )
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={12} className='ca_text_center'>
                            Chưa thêm ngày
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
