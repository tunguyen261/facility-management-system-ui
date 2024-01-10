import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { getBase64 } from 'utils/helpers';

import CAAccordion from 'components/shared/CAAccordion/index';
import CAImage from 'components/shared/CAImage/index';
import ErrorMessage from 'components/shared/CAFormControl/ErrorMessage';

const RemoveImageSpan = styled.span`
  .fi::before {
    display: flex;
  }
`;

export default function Images({ title, disabled }) {
  const methods = useFormContext();
  const {
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    methods.register('image_url', {
      validate: (v) => {
        if (!Array.isArray(v) || v.length <= 0) {
          return 'Ảnh là bắt buộc';
        }

        return true;
      },
    });
  }, [methods]);

  const handleChangeImages = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const { size, name } = files[i];

      if (size / 1000 > 500) {
        setError('image_url', { type: 'custom', message: `Dung lượng ảnh vượt quá 500kb ()${name}` });
        return;
      }

      clearErrors('image_url');
      const base64 = await getBase64(files[i]);
      setValue('image_file',e.target.files)
      setValue('image_url', [...(Array.isArray(watch('image_url')) ? watch('image_url') : []), base64]);
    }
  };

  return (
    // <CAAccordion title={title} isRequired={true}>
    <>
      <div className='ca_mt_1 ca_flex ca_align_items_center'>
        {!disabled && (
          <label className='ca_choose_image_banner'>
            <input
              type='file'
              multiple={true}
              field='image_url'
              name='image_url'
              accept='image/*'
              onChange={(_) => handleChangeImages(_, 'image_url')}
              disabled={disabled}
            />
            <span className='fi fi-rr-add'></span>
          </label>
        )}

        {Boolean(watch('image_url')?.length) &&
          watch('image_url').map((item, index) => (
            <div className='ca_image_view_banner'>
              <CAImage src={watch('image_url')[0] ? watch('image_url')[0] : item} />

              {!disabled && (
                <RemoveImageSpan
                  className='ca_remove_image'
                  onClick={() => {
                    setValue(
                      'image_url',
                      watch('image_url').filter((_, i) => i !== index),
                    );
                  }}>
                  <i className='fi fi-rr-cross-small'></i>
                </RemoveImageSpan>
              )}
            </div>
          ))}
      </div>
      {errors['image_url'] && <ErrorMessage message={errors['image_url']?.message} />}
      </>
    // </CAAccordion>
  );
}
