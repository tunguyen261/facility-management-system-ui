import React, { useCallback, useEffect, useState } from 'react';

import CAAccordion from 'components/shared/CAAccordion/index';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';
import FormTextArea from 'components/shared/CAFormControl/FormTextArea';
import FormSelect from 'components/shared/CAFormControl/FormSelect';
import { getBase64, mapDataOptions4Select, showToast } from 'utils/helpers';
import { getBuildingList } from 'services/building.service';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { ReactSVG } from 'react-svg';

const Information = ({ disabled, title }) => {
  const { pathname } = useLocation();
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);
  const methods = useFormContext();
  const { setValue, setError, getValues, handleSubmit, watch, reset } = methods;
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [svgMap, setSvgMap] = useState();
  useEffect(() => {
    setSvgMap(watch('floor_map'));
  }, watch('floor_map'));
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });
  const loadBuildingOption = useCallback(() => {
    setLoading(true);
    getBuildingList(params)
      .then((res) => {
        setBuildingOptions(res?.data);
      })
      .catch((err) => {
        showToast.error(err?.message ?? 'Có lỗi xảy ra');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(loadBuildingOption, [loadBuildingOption]);

  const handleFileUpload = async (_, field) => {
    const file = _.target.files[0];
    if (!file.name.toLowerCase().endsWith('.svg')) {
      showToast.error('Nhập file svg!');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setValue(field, content);
      };
    }
  };

  return (
    <CAAccordion title={title}>
      <div className='ca_col_12'>
        <div className='ca_row'>
          {/* <FormItem className='ca_col_4' label='Mã tầng' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='floor_code'
              placeholder='Nhập mã tầng'
              validation={{
                required: 'Mã tầng là bắt buộc',
              }}
            />
          </FormItem> */}
          <FormItem className='ca_col_4' label='Tên tầng' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='floor_name'
              placeholder='Nhập tên tầng'
              validation={{
                required: 'Tên tầng là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Số tầng' isRequired disabled={disabled}>
            <FormInput
              type='text'
              field='floor_number'
              placeholder='Nhập số tầng'
              validation={{
                required: 'Tên số là bắt buộc',
              }}
            />
          </FormItem>
          <FormItem className='ca_col_4' label='Tòa' isRequired disabled={disabled}>
            <FormSelect
              field='building_id'
              list={mapDataOptions4Select(buildingOptions, 'id', 'building_name')}
              validation={{
                required: 'Tòa là bắt buộc',
              }}
              disabled={disabled}
            />
          </FormItem>
          <div className=' ca_mb_2 ca_text_center'>
            <label className='ca_choose_image'>
              <input
                type='file'
                field='floor_map'
                onChange={(_) => handleFileUpload(_, 'floor_map')}
                disabled={!isEdit}
              />
              {watch('floor_map') ? (
                <div
                  className='ca_col_4 '
                  dangerouslySetInnerHTML={{ __html: svgMap }}
                  style={{ marginTop: '400px' }}
                />
              ) : (
                <span className='fi fi-rr-picture' />
              )}
            </label>
            <p>Tải file SVG lên</p>
          </div>
        </div>
      </div>
    </CAAccordion>
  );
};
export default Information;
