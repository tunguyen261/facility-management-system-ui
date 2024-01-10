import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { logoutUser } from 'services/auth.service'
import { COOKIE_JWT } from 'utils/constants';
import { removeCookie } from 'utils/cookie';
function LogoutPage(props) {
  const { user = null, setUser, logout } = useAuth();
  useEffect(() => {
    const logoutAccount = async () =>{
      await logoutUser()
    }
    logoutAccount();
    logout();
    removeCookie(COOKIE_JWT);
  }, []);

  if (!user) {
    return <Redirect to='/' push />;
  }
  return (
    <div className='app flex-row align-items-center'>
      <div>
        <div className='justify-content-center'>
          <div color='primary' />
          <span className='px-2 py-2'>{window._$g._('Logging you out, please wait...')}</span>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
