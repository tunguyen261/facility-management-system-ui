import React, { useState } from 'react';
import moment from 'moment';
import { notification, Alert } from 'antd';
import { useDropzone } from 'react-dropzone';
import { downloadTemplate, importExcel } from 'pages/Asset/services/call-api';
// Service

export default function ImportExcel({ onClose, handleSetErrorImport }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(null);

  const handleImportExcel = async () => {
    let currentFile = acceptedFiles[0];
    if (!currentFile) {
      setErrorUpload('Vui lòng chọn tập tin tải lên.');
      return;
    } else if (!currentFile?.name || !currentFile?.name.match(/\.(xlsx)$/i)) {
      setErrorUpload('Tập tin tải lên không đúng định dạng.');
      return;
    }
    setUploading(true);
    setErrorUpload(null);
    try {
      const res = await importExcel(currentFile);
      const { data } = res;
      console.log('data', data);
      if (data.length !== 0) {
        handleSetErrorImport({ error: data });
      } else {
        notification.success({ message: 'Tập tin tải lên thành công!' });
        onClose(true);
      }
    } catch (error) {
      let { errors, statusText, message } = error;
      let msg = [`${statusText || message || 'Lỗi tải lên tập tin!'}`].concat(errors || []).join('.');
      setErrorUpload(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate().then((response) => {
        const url = window.URL.createObjectURL(new Blob([response?.data]));
        const link = document.createElement('a');
        link.href = url;
        const configDate = moment().format('DDMMYYYY');
        link.setAttribute('download', `Template_trang_thiet_bi_${configDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      notification.error({ message: error.message || 'Lỗi tải tập tin.' });
    }
  };

  return (
    <div className='ca_modal ca_modal_open' id='ca_importExcel'>
      <div className='ca_modal_container ca_filter'>
        <div className='ca_title_modal'>
          <h3>Import Excel</h3>
          <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose}></span>
        </div>
        <div className='ca_main_modal'>
          {errorUpload && <Alert closable className='ca_mb_2' type='error' message={errorUpload} />}
          <div className='ca_note'>
            <h3>Chú ý</h3>
            <p>Các mục đánh dấu * bắt buộc Thêm mới.</p>
            <p>Chuyển đổi file nhập dưới dạng .XLSX trước khi tải dữ liệu.</p>
            <p>
              Tải file mẫu danh sách tại{' '}
              <a href='javascript:void(0)' onClick={handleDownloadTemplate}>
                tại đây
              </a>{' '}
              (file excel danh sách trang thiết bị)
            </p>
          </div>
          <label className='ca_import_file'>
            {uploading ? (
              'Đang tải lên ...'
            ) : (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className='dropzone-product-upload text-center font-weight-bold'>
                    <i class='fa fa-upload mr-1'></i>Kéo thả file hoặc tải lên từ thiết bị
                  </p>
                </div>
                {acceptedFiles[0] ? (
                  <div style={{ color: 'red' }} className='font-weight-bold'>
                    Tập tin: {acceptedFiles[0]?.path}
                  </div>
                ) : null}
              </section>
            )}
          </label>
        </div>
        <div className='ca_footer_modal'>
          <button disabled={uploading} className='ca_btn ca_btn_success' onClick={handleImportExcel}>
            <span className='fi fi-rr-check'></span> Nhập file
          </button>
          <button type='button' className='ca_btn_outline ca_btn_outline_success' onClick={onClose}>
            <span className='fi fi-rr-refresh'></span>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
