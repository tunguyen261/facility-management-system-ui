import React, { useState } from 'react';
import ErrorMessage from 'components/shared/CAFormControl/ErrorMessage';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { changeYourPassword } from 'services/users.service';
import FormInput from 'components/shared/CAFormControl/FormInput';
import FormItem from 'components/shared/CAFormControl/FormItem';

const ChangePassword = ({ onClose }) => {
  const methods = useForm();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(undefined);

  const onSubmit = async (payload) => {
    setLoading(true);
    changeYourPassword(payload)
      .then((e) => {
        toast.success('Đổi mật khẩu thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.message);
      });
  };

  return (
    <FormProvider {...methods}>
      <div className='ca_modal ca_modal_open'>
        <div className='ca_modal_container'>
          <div className='ca_title_modal'>
            <h3>Đổi mật khẩu</h3>
            <span className='ca_close_modal fi fi-rr-cross-small' onClick={onClose}></span>
          </div>
          <div className='ca_main_modal ca_border_top'>
            <form className='ca_frm_change'>
              <FormItem label='Mật khẩu cũ' isRequired>
                <FormInput
                  disabled={loading}
                  type='password'
                  field='old_password'
                  placeholder='***********'
                  validation={{
                    required: 'Mật khẩu cũ là bắt buộc',
                  }}
                />
              </FormItem>
              <FormItem label='Mật khẩu mới' isRequired>
                <FormInput
                  disabled={loading}
                  type='password'
                  field='new_password'
                  placeholder='***********'
                  validation={{
                    required: 'Mật khẩu mới là bắt buộc',
                    validate: (p) => {
                      if (p.length < 8) {
                        return 'Mật khẩu phải lớn hơn 8 chữ';
                      }
                    },
                  }}
                />
              </FormItem>
              <FormItem label='Nhập lại mật khẩu mới' isRequired>
                <FormInput
                  disabled={loading}
                  type='password'
                  field='re_password'
                  placeholder='***********'
                  validation={{
                    required: 'Nhập lại mật khẩu mới là bắt buộc',
                    validate: (p) => {
                      if (p !== methods.watch('new_password')) {
                        return 'Mật khẩu không khớp, vui lòng kiểm tra lại';
                      }
                      if (p.length < 8) {
                        return 'Mật khẩu phải lớn hơn 8 chữ';
                      }
                    },
                  }}
                />
              </FormItem>
              {error && <ErrorMessage message={error} />}
            </form>
          </div>
          <div className='ca_footer_modal'>
            <button
              disabled={loading}
              type='button'
              onClick={methods.handleSubmit(onSubmit)}
              className='ca_btn ca_btn_success'>
              <span className='fi fi-rr-check'></span> Đổi mật khẩu
            </button>
            <button onClick={onClose} type='button' className='ca_btn_outline ca_btn_outline_success'>
              <span disabled={loading} className='fi fi-rr-refresh'></span>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ChangePassword;
