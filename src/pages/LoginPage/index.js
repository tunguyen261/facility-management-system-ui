import React, { useState } from 'react';
import logoLogin from 'assets/ca_image/logo_login.png';
import { useAuth } from 'context/AuthProvider';
import { Button, Form, Alert } from 'antd';
import { Redirect } from 'react-router-dom';
import { getErrorMessage } from 'utils';
import { getFunctions, getProfile, login } from 'services/auth.service';
import { getCookie, setCookie } from 'utils/cookie';
import { COOKIE_JWT } from 'utils/constants';
import { LoadingOutlined } from '@ant-design/icons';
import { USERROLE } from 'utils/user.role'

const initialValues = {
  user_name: '',
  password: '',
  platform: 'portal',
};

function LoginPage() {
  const { user = null, setUser, initializing, setInitializing } = useAuth();
  const [msgErr, setMsgErr] = useState(null);

  const handleSubmitLogin = async (values) => {
    setInitializing(true);
    try {
      const res  = await login(values);
      let { access_token } = res?.data;
      setCookie(COOKIE_JWT, JSON.stringify({ access_token }));
      let profileData = await getProfile();
      if (!profileData.role === USERROLE.ADMINSTRATOR) {
        let functions = await getFunctions();
        profileData.functions = functions;
      }
      setUser(profileData?.data);
    } catch (error) {
      setMsgErr(getErrorMessage(error));
    } finally {
      setInitializing(false);
    }
  };

  if (user) {
    return <Redirect to='/dashboard' push />;
  }

  return (
    <div className='ca_main_login'>
      <Form
        initialValues={initialValues}
        scrollToFirstError={true}
        name='frmLogin'
        layout='vertical'
        size='large'
        onFinish={handleSubmitLogin}
        className='ca_form_login'>
        <img src={logoLogin} alt={1} />
        <h1 style={{ maxWidth: '100%' }}>Đăng nhập</h1>
        {msgErr && (
          <Alert message={msgErr} className='ca_mb_2' type='error' showIcon closable onClose={() => setMsgErr(null)} />
        )}
        <Form.Item
          name='email'
          disabled={initializing}
          rules={[
            {
              required: true,
              message: 'Email là bắt buộc',
            },
          ]}>
          <input type='text' placeholder='Email' className='ca_inp' style={{ margin: 0 }} />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Mật khẩu là bắt buộc',
            },
          ]}>
          <input
            disabled={initializing}
            type='password'
            placeholder='Mật khẩu'
            className='ca_inp'
            style={{
              margin: 0,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={initializing}
            icon={initializing ? <LoadingOutlined /> : undefined}
            type='primary'
            htmlType='submit'
            className='ca_btn ca_btn_login'>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
