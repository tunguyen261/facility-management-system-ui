import CAAccordion from 'components/shared/CAAccordion';
import React from 'react'
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AssetItemTable from './AssetImport';

function AssetTable({ disabled }) {
    const methods = useFormContext();
  const { watch, setValue, formState, control, clearErrors } = methods;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handelAddRowProducts = async () => {
    let value = watch('assets') ?? [];
    value.push({});
    clearErrors('assets');
    setValue('assets', value);
  };
  const handelRemoveProducts = (index) => {
    let value = watch('assets');
    value.splice(index, 1);
    setValue('assets', value);
  };
  const { fields } = useFieldArray({
    control,
    name: 'assets',
  });

  return (
    <React.Fragment>
    <CAAccordion title='Trang thiết bị di dời' id='ca_account_cus' isRequired>
    <div className='ca_tab_items ca_no_pt ca_mt_2 ca_active' id='ca_cate'>
        <div className='ca_btn_group ca_btn_grp ca_flex ca_align_items_center ca_justify_content_right'>
          <a data-href className='ca_btn ca_btn_success' onClick={()=>setIsOpenModal(!isOpenModal)}>
            <span className='fi fi-rr-plus' /> Thêm
          </a>
        </div>
        <div id='products_list'>
          <div className='ca_table_responsive ca_mt_2'>
            <table className='ca_table'>
              <thead>
                <tr>
                  <th className='ca_sticky ca_check_sticky ca_text_center'>STT</th>
                  <th className='ca_text_center' style={{ width: '100px' }}>
                    Loại trang thiết bị
                  </th>
                  <th className='ca_text_center'>Tên trang thiết bị</th>
                  <th className='ca_text_center'>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {fields && fields.length > 0 ? (
                  fields.map((item, index) => {
                    return (
                      item && (
                        // <ProductItem
                        //   key={index}
                        //   keyProduct={`assets.${index}`}
                        //   index={index}
                        //   disabled={disabled}
                        //   handelRemoveProducts={handelRemoveProducts}
                        // />
                        <></>
                      )
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12} className='ca_text_center'>
                      Chưa thêm trang thiết bị
                    </td>
                  </tr>
                )}
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CAAccordion>
    </React.Fragment>
  )
}

export default AssetTable