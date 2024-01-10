import FormDebouneSelect from 'components/shared/CAFormControl/FormDebouneSelect';
import FormNumber from 'components/shared/CAFormControl/FormNumber';
import { getAssetList } from 'pages/Asset/services/call-api';
import { getAssetInRoom } from 'pages/Rooms/utils/call.api';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { mapDataOptions4Select, showToast } from 'utils/helpers';

function AssetItem({ keyAsset, index, disabled, handelRemoveAssets, setTabActive }) {
  const methods = useFormContext();
  const { watch, setValue, clearErrors } = methods;
  const assetSelected = watch('assets') || [];
  const from_room_id = watch('from_room_id');
  const getOptionsAssetCode = async (value) => {
    if (!from_room_id) {
      // showToast.warning('Chọn phòng di dời');
      return;
    }
    const data = await getAssetInRoom(from_room_id, { keyword: value });
    const _list = [];
    const assetValid = (data?.data || []).filter((item) => {
      return !!!assetSelected.find((i) => i?.asset_id == item?.asset?.id);
    });
    const _assetValid = assetValid.map((item) => ({
      ...item,
      asset_name: `${item?.asset?.asset_name} - ${item?.asset?.asset_code}`,
    }));
    return mapDataOptions4Select(_assetValid, 'id', 'asset_name');
  };
  const getOptionsAssetName = async (value) => {
    if (!from_room_id) {
      showToast.warning('Chọn phòng di dời');
      return;
    }
    const data = await getAssetInRoom(from_room_id, { keyword: value });
    const assetValid = (data?.data || []).filter((item) => !assetSelected.find((i) => i?.asset?.id == item?.asset_id));
    const _assetValid = assetValid.map((item) => ({
      ...item,
      asset_name: `${item?.asset?.asset_name} - ${item?.asset?.asset_code}`,
    }));
    return mapDataOptions4Select(_assetValid, 'id', 'asset_name');
  };

  return (
    <React.Fragment>
      <tr>
        <td style={{ zIndex: 1 }} className='ca_sticky ca_check_sticky'>
          {index + 1}
        </td>
        <td style={{ width: '100px' }}>
          <FormDebouneSelect
            bordered
            fieldDisplay='asset_name'
            field={`${keyAsset}.asset_code`}
            disabled={disabled}
            placeholder='Nhập mã trang thiết bị'
            fetchOptions={getOptionsAssetCode}
            onChange={(_, q) => {
              try {
                clearErrors('assets');
                setValue(`${keyAsset}.asset_id`, q?.asset?.id);
                setValue(`${keyAsset}.asset_code`, q?.asset?.asset_code);
                setValue(`${keyAsset}.asset_name`, q?.asset?.asset_name);
                setValue(`${keyAsset}.asset_type`, q?.asset?.type?.type_name);
                setValue(`${keyAsset}.quantity`, 1);
              } catch (error) {}
            }}
          />
        </td>
        <td>
          <FormDebouneSelect
            field={`${keyAsset}.asset_name`}
            bordered
            disabled={disabled}
            placeholder='Nhập tên trang thiết bị'
            fetchOptions={getOptionsAssetName}
            onChange={(_, q) => {
              clearErrors('assets');
              setValue(`${keyAsset}.asset_id`, q?.asset?.id);
              setValue(`${keyAsset}.asset_code`, q?.asset?.asset_code);
              setValue(`${keyAsset}.asset_name`, q?.asset?.asset_name);
              setValue(`${keyAsset}.asset_type`, q?.asset?.type?.type_name);
              setValue(`${keyAsset}.quantity`, 1);
            }}
          />
        </td>
        {/* <td>
        <>{watch(`${keyAsset}`)?.asset_type}</>
      </td> */}
        <td>
          <FormNumber
            min={0}
            field={`${keyAsset}.quantity`}
            className=' ca_mw_2 ca_input_center ca_inp'
            controls={false}
            disabled={disabled}
            onChange={(e) => {
              setValue(`${keyAsset}.quantity`, e);
            }}
          />
        </td>
        <td className='ca_sticky ca_action_table ca_text_center'>
          {disabled ? null : (
            <a className='ca_btn_table ca_delete ca_red' onClick={() => handelRemoveAssets(index)}>
              <i className='fi fi-rr-trash' />
            </a>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AssetItem;
