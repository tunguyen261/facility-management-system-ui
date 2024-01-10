import React, { useEffect, useMemo, useState } from 'react';
import routes from 'routers';
import { formatter } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { showNotifyHeader } from 'actions/global';
import { TYPE_NOTIFY } from 'utils/constants';
import { useLocation, useHistory } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import NotifyCommon from './notify/NotifyCommon';
import logo from 'assets/ca_image/logo.png';
import logo_default from 'assets/ca_image/logo_default.png';
import { useAuth } from 'context/AuthProvider';
import { Button, Badge } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  KeyOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { setCookie } from 'utils/cookie';
import { COOKIE_JWT } from 'utils/constants';
import { getNavigation } from 'services/auth.service';
import { showConfirmModal, triggerSidebar } from 'actions/global';
import ChangePassword from 'pages/SiderMenu/modal/ChangePassword';
import styled from 'styled-components';
import { useSignalREffect } from 'context/SignalRContext';

const UserSection = styled.div`
  position: relative;
  z-index: 1;
  &:hover {
    transition: 0.3s;
    .user__section__dropdown {
      display: block;
    }
  }
  .user__section__dropdown {

    position: absolute;
    width: 120%;
    background-color: white;
    border-radius: 5px;
    top: 59px;
    right: 0.2px;
    z-index: 3;
    transition: 0.3s;
  }
  .header-menu {
    color: black;
    padding: 8px 8px;
    font-size: 17px;
    z-index: 3;
    cursor: pointer;
    transition: 0.3s;
  }
  .header-menu:hover {
    background: var(--mainColor);
    color: white;
    z-index: 3;
    transition: 0.3s;
  }
  .anticon {
    margin-right: 5px;
  }
`;

const NavHeader = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [routerMap, setRouterMap] = useState([]);
  const { user } = useAuth();
  const [modalChangePassword, setModalChangePassword] = useState(undefined);
  const { collapsedSideBar: collapsed } = useSelector((state) => state.global);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [unread, setUnread] = useState();




  useSignalREffect('ReceiveNotifications','GetNotifications',(res)=> setUnread(res));
  let menuUser = [
    {
      key: 'CHANGE_PASSWORD',
      label: (
        <span
          onClick={() => {
            setModalChangePassword(true);
          }}
          className='header-menu'
          style={{ display: 'inline-block', width: '100%' }}>
          <KeyOutlined />
          Đổi mật khẩu
        </span>
      ),
    },
    {
      key: 'LOG_OUT',
      label: (
        <span
          style={{ display: 'inline-block', width: '100%' }}
          className='header-menu'
          onClick={(e) => {
            dispatch(
              showConfirmModal(
                ['Bạn xác nhận sẽ đăng xuất?'],
                async () => {
                  // setCookie(COOKIE_JWT, undefined);
                  history.push('/logout');
                  e.preventDefault();
                },
                'Đồng ý',
              ),
            );
          }}>
          <LogoutOutlined type='logout' />
          Đăng xuất
        </span>
      ),
    },
  ];

  const notifyActions = useMemo(
    () => [
      // {
      //   onClick: () => {
      //     dispatch(showNotifyHeader(TYPE_NOTIFY.MAIL));
      //   },
      //   icon: 'fi-rr-envelope-open-text',
      // },
      {
        onClick: () => {
          dispatch(showNotifyHeader(TYPE_NOTIFY.ANNOUNCE));
        },
        icon: 'fi-rr-bell',
      },
    ],
    [dispatch],
  );

  const getBreadcrumbNameMap = () => {
    const routerMap = {};
    const mergeMenuAndRouter = (data) => {
      data.forEach((menuItem) => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(formatter(routes));
    setRouterMap(routerMap);
  };
  useEffect(getBreadcrumbNameMap, []);

  /**
   * Get Page Title
   * @param {*} pathname
   * @returns
   */
  const getPageTitle = useMemo(() => {
    let currRouterData = null;
    Object.keys(routerMap).forEach((key) => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerMap[key];
      }
    });
    if (!currRouterData) {
      return '';
    }
    return currRouterData.name;
  }, [pathname, routerMap]);

  return (
    <header className='ca_flex ca_align_items_center ca_justify_content_between'>
      <h1>
          <span style = {{ 'cursor' : 'pointer'}} onClick={() => {
              history.goBack();
            }} id='ca_close_nav' className='fi fi-rr-angle-small-left'></span>
        <span id='ca_form_title'>{getPageTitle}</span>
      </h1>
      <div className='ca_right_header'>
      <UserSection className='ca_user_admin ca_flex ca_align_items_center'>
      <span className='ca_hideen_nav' 
      onMouseEnter={() => setIsDropdownVisible(true)}
      style={{   marginRight: '10px'}}
      >{user?.fullname}</span>
        <div style={{
          width : '44px',
          height : '44px'
      }}
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => setIsDropdownVisible(false)}
        >
        <img
          style={{
            width: '100%',
            height: '100%',
            border: '0.01px solid #19376d',
            borderRadius: '50%',

          }}
          src={user.avatar || logo_default}
          onError={(e) => {
            this.src = logo;
          }}
        />
        {isDropdownVisible && (
          <div className='user__section__dropdown'>
            {menuUser.map((o) => o.label)}
          </div>
        )}
        </div>
      </UserSection>
        {notifyActions?.map((e) => (
          <Badge count={unread?.length || 0} style={{ 'marginTop' : '5px' }}>
          <button onClick={e?.onClick} className='ca_btn_header'>
            <span className={`fi ${e?.icon}`}></span>
          </button>
          </Badge>
        ))}
        <NotifyCommon />
      </div>
      {modalChangePassword && (
        <ChangePassword
          onClose={() => {
            setModalChangePassword(undefined);
          }}
        />
      )}
    </header>
  );
};

export default React.memo(NavHeader);
