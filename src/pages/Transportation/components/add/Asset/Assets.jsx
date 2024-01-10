import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AssetItem from './AssetItem';

import ImportExcel from '../../modal/ImportExcel';
import ImportError from '../../modal/ImportError';

function Assets({ disabled, setTabActive }) {
  const methods = useFormContext();
  const { watch, setValue, formState, control, clearErrors } = methods;
  const [openModalImport, setOpenModalImport] = useState(null);
  const [openModalErrorImport, setOpenModalErrorImport] = useState(false);
  const [errorImport, setErrorImport] = useState(null);

  const handelAddRowAssets = async () => {
    if (disabled) return;
    let value = watch('assets') ?? [];
    value.push({});
    clearErrors('assets');
    setValue('assets', value);
  };
  const handelRemoveAssets = (index) => {
    let value = watch('assets');
    value.splice(index, 1);
    setValue('assets', value);
  };
  const { fields } = useFieldArray({
    control,
    name: 'assets',
  });
  const handleCloseModalImport = (isReload = false) => {
    setOpenModalImport(false);
    // if (isReload) loadData();
  };
  const handleSetErrorImport = (errorsImport) => {
    setErrorImport(errorsImport);
    setOpenModalImport(false);
    setOpenModalErrorImport(true);
  };
  return (
    <React.Fragment>
      <div className='ca_tab_items ca_no_pt ca_mt_2 ca_active' id='ca_cate'>
        <div className='ca_btn_group ca_btn_grp ca_flex ca_align_items_center ca_justify_content_right'>
          {/* <a
          data-href='#ca_importExcel'
          className='ca_btn_outline ca_btn_outline_success ca_open_modal '
          onClick={() => setOpenModalImport(true)}>
          <span className='fi fi-rr-inbox-in' /> Import
        </a> */}
          <a data-href className='ca_btn ca_btn_success' onClick={handelAddRowAssets}>
            <span className='fi fi-rr-plus' /> Thêm
          </a>
        </div>
        <div id='assets_list'>
          <div className='ca_table_responsive ca_mt_2'>
            <table className='ca_table'>
              <thead>
                <tr>
                  <th className='ca_sticky ca_check_sticky ca_text_center'>STT</th>
                  <th className='ca_text_center' style={{ width: '100px' }}>
                    Mã Trang thiết bị
                  </th>
                  <th className='ca_text_center'>Tên trang thiết bị</th>
                  {/* <th className='ca_text_center'>Loại thiết bị</th> */}
                  <th className='ca_text_center'>Số lượng</th>
                  <th className='ca_sticky ca_action_table ca_text_center'>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {fields && fields.length > 0 ? (
                  fields.map((item, index) => {
                    return (
                      item && (
                        <AssetItem
                          key={index}
                          keyAsset={`assets.${index}`}
                          index={index}
                          disabled={disabled}
                          setTabActive={setTabActive}
                          handelRemoveAssets={handelRemoveAssets}
                        />
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModalImport && <ImportExcel onClose={handleCloseModalImport} handleSetErrorImport={handleSetErrorImport} />}
      {openModalErrorImport && <ImportError errors={errorImport} onClose={() => setOpenModalErrorImport(false)} />}
    </React.Fragment>
  );
}

export default Assets;
