import React, { useState } from 'react';

import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import { Progress } from 'antd';
import { showConfirmModal } from 'actions/global';
import { useDispatch } from 'react-redux';

import { cdnPath, getExtension } from 'utils/index';

import CAAccordion from 'components/shared/CAAccordion/index';
import { showToast, uploadFile, uploadFileOpen } from 'utils/helpers';
import styled from 'styled-components';

const UploadButton = styled.label`
  width: fit-content;
  height: fix-content;
  height: 40px;
  padding: 10px;
  transition: all 0.3s;
  :hover {
    background-color: #ccc;
  }
`;

const Attachments = ({ disabled, onRefesh, title, keyObject }) => {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const { watch, setValue } = methods;
  const [progress, setProgress] = useState(0);

  const handleRemoveFile = (idx, e) => {
    e.preventDefault();
    if (!disabled) {
      let _files = watch(keyObject ?? 'related_files');
      const { file_module_id, file_id } = _files[idx];
      // Nếu là file trước đó thì confirm
      if (file_module_id && file_id) {
        dispatch(
          showConfirmModal(['Bạn có chắc chắn muốn tập tin đang chọn?'], async () => {
            await handleDeleteFile(idx);
            onRefesh();
          }),
        );
      } else {
        _files.splice(idx, 1);
        methods.setValue(keyObject ?? 'related_files', _files || []);
      }
    }
  };

  const handleDeleteFile = async (idx) => {
    if (!disabled) {
      try {
        let _files = watch(keyObject ?? 'related_files');
        const { file_module_id, file_id } = _files[idx];
        _files.splice(idx, 1);
        setValue(keyObject ?? 'related_files', _files);
      } catch (err) {
        window._$g.dialogs.alert(window._$g._(`Xóa tập tin không thành công. Mã lỗi ${err.message || err}`));
      }
    }
  };

  const handleUploadFile = async (e) => {
    const files = Object.values(e.target.files);
    if (
      files.findIndex((_) => !_.name) !== -1 ||
      files.findIndex((_) => !_.name.match(/\.(doc|docx|pdf|xlsx|xls|jpg|png)$/i)) !== -1
    ) {
      return showToast.error('Tập tin tải lên không đúng định dạng.');
    }
    const attachmentList = [];
    if (files && files.length > 0) {
      for (let file of files) {
        await uploadFileOpen(file)
          .then((response) => {
            file.uri = response?.uri;
            file.file_name = response?.file_name;
            file.file_type = response?.file_type || '';
            attachmentList.push(file);
          })
          .catch((error) => {
            showToast.error(error.message || 'Có lỗi xảy ra !');
          });
      }
    }
    let _files = watch(keyObject ?? 'related_files') || [];

    methods.setValue(keyObject ?? 'related_files', _files.concat(attachmentList));
  };
  const onUploadProgress = (event) => {
    const percent = Math.floor((event.loaded / event.total) * 100);
    setProgress(percent);
    if (percent === 100) {
      setTimeout(() => setProgress(0), 100);
    }
  };
  return (
    <div className='ca_col_12'>
      <UploadButton className='ca_choose_image_banner'>
        <input field={`path`} onChange={(e) => handleUploadFile(e)} type='file' multiple disabled={disabled} />
        <span style={{ color: '#333', fontSize: '1rem' }}>
          <i className='fi fi-rr-upload' style={{ paddingRight: 5 }} />
          Đính kèm tập tin
        </span>
      </UploadButton>
      {progress > 0 && <Progress percent={progress} />}

      {watch(keyObject ?? 'related_files') && watch(keyObject ?? 'related_files').length > 0
        ? watch(keyObject ?? 'related_files').map((item, idx) => {
            return (
              <div className='ca_mt_1' key={idx}>
                <a className='ca_green file_name_custom'>
                  <i className='fi fi-rr-cloud-download-alt' style={{ paddingRight: 5 }} />
                </a>
                <a className='ca_green' target={'_blank'} href={item?.uri}>
                  {item?.file_name}
                </a>
                {
                  <span style={{ cursor: 'pointer' }} onClick={(e) => handleRemoveFile(idx, e)}>
                    <i className='fi fi-rr-trash' style={{ paddingLeft: 5 }} />
                  </span>
                }
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Attachments;
