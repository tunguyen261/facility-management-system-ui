import React, { useEffect, useState } from 'react';
import logo from 'assets/ca_image/logo.png';
import logo_default from 'assets/ca_image/logo_login.png';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider';
import { getItem } from 'utils';
import { showConfirmModal, triggerSidebar } from 'actions/global';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import MenuRecursive from 'layouts/sidebar/MenuRecursive';
import _ from 'lodash';
import styled from 'styled-components';
import { setCookie } from 'utils/cookie';
import { COOKIE_JWT } from 'utils/constants';
import { useHistory } from 'react-router-dom';
import ChangePassword from 'pages/SiderMenu/modal/ChangePassword';
import { Button, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
/**
 * Convert Menu
 * @returns
 */

const { Title } = Typography;

const getNavMenuItems = (items) => {
  let itemsMap = {};
  let ret = (items || []).map((item) => {
    let opts = item.child || {};
    delete item.child;
    let parentItem = itemsMap[item.parent_id];
    let navItem = getItem(item.menu_name, item.link_menu, item.menu_name, item.menu_id, item.icon_path);
    itemsMap[item.menu_id] = navItem;
    if (parentItem && opts.level >= 1) {
      parentItem.children = parentItem.children || [];
      parentItem.children.push(navItem);
      return null;
    }
    return navItem;
  });

  let menuResult = ret.filter((item) => !!item);
  expandPath(menuResult);
  return menuResult;
};

/**
 * Update Menu Parent Not Link
 * @param {*} nodes
 */
const expandPath = (nodes) => {
  if (nodes) {
    for (const node of nodes || []) {
      if (node.children && node.children.length > 0) {
        node.label = node.name;
      }
      expandPath(node.children);
    }
  }
};

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
    display: none;
    position: absolute;
    width: 80%;
    background-color: white;
    border-radius: 10px;
    top: 59px;
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

const SideBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [loadFirst, setLoadFirst] = useState(true);
  const [openKey, setOpenKey] = useState({});
  const [modalChangePassword, setModalChangePassword] = useState(undefined);
  const { collapsedSideBar: collapsed } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { user } = useAuth();
  const [menus, setMenus] = useState([]);
  const [navigation, setNavigation] = useState([]);

  const items = [
    {
      menu_id: '1',
      menu_name: 'Dashboard',
      module_id: null,
      module_name: null,
      link_menu: '/dashboard',
      parent_id: '0',
      is_active: 1,
      icon_path: 'fi fi-rr-home',
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
    {
      menu_id: '2',
      menu_name: 'Quản lý cơ sở',
      module_id: null,
      module_name: null,
      link_menu: '/facility-management',
      parent_id: '0',
      is_active: 1,
      is_system: 0,
      icon_path: 'fi fi-rr-camping',
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
    {
      menu_id: '3',
      menu_name: 'Thông tin chung',
      module_id: null,
      module_name: null,
      link_menu: '/virtualize',
      icon_path: null,
      parent_id: '2',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 1,
      },
      function_name: null,
    },
    {
      menu_id: '11',
      menu_name: 'Quản lý campus',
      module_id: null,
      module_name: null,
      link_menu: '/campus',
      icon_path: null,
      parent_id: '2',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 30,
      },
      function_name: null,
    },
    //
    {
      menu_id: '4',
      menu_name: 'Quản lý tòa',
      module_id: null,
      module_name: null,
      link_menu: '/building',
      icon_path: null,
      parent_id: '2',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      child: {
        level: 3,
      },
      description: null,
      function_name: null,
    },
    {
      menu_id: '12',
      menu_name: 'Quản lý tầng',
      module_id: null,
      module_name: null,
      link_menu: '/floor',
      icon_path: null,
      parent_id: '2',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 4,
      },
      function_name: null,
    },
    {
      menu_id: '5',
      menu_name: 'Quản lý phòng',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: null,
      parent_id: '2',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 5,
      },
      function_name: null,
    },
    {
      menu_id: '13',
      menu_name: 'Danh sách phòng',
      module_id: null,
      module_name: null,
      link_menu: '/room',
      icon_path: null,
      parent_id: '5',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 10,
      },
      function_name: null,
    },
    {
      menu_id: '14',
      menu_name: 'Trạng thái phòng',
      module_id: null,
      module_name: null,
      link_menu: '/room-status',
      icon_path: null,
      parent_id: '5',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 11,
      },
      function_name: null,
    },
    {
      menu_id: '17',
      menu_name: 'Loại phòng',
      module_id: null,
      module_name: null,
      link_menu: '/room-type',
      icon_path: null,
      parent_id: '5',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 12,
      },
      function_name: null,
    },
    {
      menu_id: '9',
      menu_name: 'Quản lý trang thiết bị',
      module_id: null,
      module_name: null,
      link_menu: '/equipment-management',
      parent_id: '',
      is_active: 1,
      is_system: 0,
      icon_path: 'fi fi-rr-cube',
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
    {
      menu_id: '10',
      menu_name: 'Danh sách trang thiết bị',
      module_id: null,
      module_name: null,
      link_menu: '/asset',
      icon_path: null,
      parent_id: '9',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 6,
      },
      function_name: null,
    },
    {
      menu_id: '30',
      menu_name: 'Định vị trang thiết bị',
      module_id: null,
      module_name: null,
      link_menu: '/room-asset',
      icon_path: '',
      parent_id: 9,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 19,
      },
      function_name: null,
    },
    {
      menu_id: '16',
      menu_name: 'Loại thiết bị',
      module_id: null,
      module_name: null,
      link_menu: '/asset-type',
      icon_path: null,
      parent_id: '9',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 8,
      },
      function_name: null,
    },
    {
      menu_id: '23',
      menu_name: 'Nhóm quản lý trang thiết bị',
      module_id: null,
      module_name: null,
      link_menu: '/category',
      icon_path: '',
      parent_id: 9,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 18,
      },
      function_name: null,
    },
    {
      menu_id: '27',
      menu_name: 'Dòng sản phẩm',
      module_id: null,
      module_name: null,
      link_menu: '/model',
      parent_id: '9',
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 7,
      },
      function_name: null,
    },
    {
      menu_id: '18',
      menu_name: 'Quản lý người dùng',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: 'fi fi-rr-users',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 8,
      },
      function_name: null,
    },
    {
      menu_id: '19',
      menu_name: 'Danh sách người dùng',
      module_id: null,
      module_name: null,
      link_menu: '/users',
      icon_path: '',
      parent_id: 18,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 15,
      },
      function_name: null,
    },
    {
      menu_id: '20',
      menu_name: 'Nhóm phụ trách',
      module_id: null,
      module_name: null,
      link_menu: '/team',
      icon_path: '',
      parent_id: 18,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 16,
      },
      function_name: null,
    },
    {
      menu_id: '26',
      menu_name: 'Thành viên nhóm phụ trách',
      module_id: null,
      module_name: null,
      link_menu: '/team-member',
      icon_path: '',
      parent_id: 18,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 17,
      },
      function_name: null,
    },
    {
      menu_id: '7',
      menu_name: 'Yêu cầu kiểm tra',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: 'fi fi-rr-badge-check',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 1,
      },
      function_name: null,
    },
    {
      menu_id: '37',
      menu_name: 'Danh sách yêu cầu',
      module_id: null,
      module_name: null,
      link_menu: '/asset-check',
      icon_path: '',
      parent_id: 7,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 20,
      },
      function_name: null,
    },
    {
      menu_id: '36',
      menu_name: 'Kiểm kê',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: 'fi fi-rr-interlining',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
    {
      menu_id: '39',
      menu_name: 'Danh sách yêu cầu',
      module_id: null,
      module_name: null,
      link_menu: '/inventory-check',
      icon_path: '',
      parent_id: 36,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 39,
      },
      function_name: null,
    },
    {
      menu_id: '40',
      menu_name: 'Lập lịch',
      module_id: null,
      module_name: null,
      link_menu: '/inventory-check-config/detail/812a3500-3151-41cc-8326-921cc771b7f6',
      icon_path: '',
      parent_id: 36,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 40,
      },
      function_name: null,
    },
    // {
    //   menu_id: '38',
    //   menu_name: 'Danh sách trang bị đang hư hại',
    //   module_id: null,
    //   module_name: null,
    //   link_menu: '/need-check-asset',
    //   icon_path: '',
    //   parent_id: 7,
    //   is_active: 1,
    //   is_system: 0,
    //   is_business: 0,
    //   order_index: '0',
    //   description: null,
    //   child : {
    //     level : 21
    //   },
    //   function_name: null,
    // },
    {
      menu_id: '15',
      menu_name: 'Quản lý sửa chữa',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: 'fi fi-rr-settings',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 1,
      },
      function_name: null,
    },
    {
      menu_id: '31',
      menu_name: 'Danh sách yêu cầu',
      module_id: null,
      module_name: null,
      link_menu: '/repairation',
      icon_path: '',
      parent_id: 15,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 22,
      },
      function_name: null,
    },
    {
      menu_id: '32',
      menu_name: 'Danh sách trang bị cần sửa chữa',
      module_id: null,
      module_name: null,
      link_menu: '/wrong-asset',
      icon_path: '',
      parent_id: 15,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 23,
      },
      function_name: null,
    },
    {
      menu_id: '24',
      menu_name: 'Quản lý bảo trì',
      module_id: null,
      module_name: null,
      link_menu: '',
      icon_path: 'fi fi-rr-shield-check',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 1,
      },
      function_name: null,
    },
    {
      menu_id: '33',
      menu_name: 'Danh sách yêu cầu',
      module_id: null,
      module_name: null,
      link_menu: '/maintenance',
      icon_path: '',
      parent_id: 24,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 24,
      },
      function_name: null,
    },
    {
      menu_id: '34',
      menu_name: 'Danh sách trang thiết bị cần bảo trì',
      module_id: null,
      module_name: null,
      link_menu: '/maintenance-asset',
      icon_path: '',
      parent_id: 24,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 25,
      },
      function_name: null,
    },
    {
      menu_id: '35',
      menu_name: 'Nhãn hiệu',
      module_id: null,
      module_name: null,
      link_menu: '/brand',
      icon_path: '',
      parent_id: 9,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      child: {
        level: 35,
      },
      function_name: null,
    },
    {
      menu_id: '28',
      menu_name: 'Quản lý thay thế',
      module_id: null,
      module_name: null,
      link_menu: '/replacement',
      icon_path: 'fi fi-rr-republican',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
    {
      menu_id: '29',
      menu_name: 'Quản lý vận chuyển',
      module_id: null,
      module_name: null,
      link_menu: '/transportation',
      icon_path: 'fi fi-rr-truck-container',
      parent_id: 0,
      is_active: 1,
      is_system: 0,
      is_business: 0,
      order_index: '0',
      description: null,
      function_name: null,
    },
  ];
  useEffect(() => {
    const getMenus = async () => {
      try {
        // let menus = await getNavigation();
        let navigation = getNavMenuItems(JSON.parse(JSON.stringify(items || [])));
        setMenus(items);
        setNavigation(navigation);
      } catch (error) {}
    };
    getMenus();
  }, []);

  const handleCollapse = () => {
    dispatch(triggerSidebar());
  };

  const handleSetOpen = (key) => {
    let _;
    if (key) {
      _ = menus.find((o) => parseInt(o.menu_id) == key);
    } else {
      _ = menus.find((o) => o.link_menu === pathname);
    }
    key = _?.menu_id;
    setOpenKey((state) => ({
      ...state,
      [key]: true,
    }));
    if (_?.parent_id && _.parent_id !== '0') {
      handleSetOpen(_.parent_id);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (Array.isArray(menus) && menus.length > 0 && pathname && _.isEmpty(openKey) && loadFirst) {
      setLoadFirst(false);
      handleSetOpen();
    }
  }, [pathname, menus]);

  useEffect(() => {
    /**
     * pathname change openKey[menu_id] not true -> set true
     * _path: /stocks-in-request/add?param1=10000 => /stocks-in-request
     */
    let _path = pathname.replace(/(\/add(.+)?|\/edit(.+)?|\/view(.+)?|\/detail(.+)?)$/, '');
    let findMenu = menus?.find((x) => x.link_menu === _path);
    if (findMenu?.menu_id && !openKey[findMenu?.menu_id]) {
      setOpenKey({});
      handleSetOpen(findMenu.menu_id);
    }
  }, [pathname, menus, openKey]);
  // let menuUser = [
  //   {
  //     key: 'CHANGE_PASSWORD',
  //     label: (
  //       <span
  //         onClick={() => {
  //           setModalChangePassword(true);
  //         }}
  //         className='header-menu'
  //         style={{ display: 'inline-block', width: '100%' }}>
  //         <KeyOutlined />
  //         Đổi mật khẩu
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'LOG_OUT',
  //     label: (
  //       <span
  //         style={{ display: 'inline-block', width: '100%' }}
  //         className='header-menu'
  //         onClick={(e) => {
  //           dispatch(
  //             showConfirmModal(
  //               ['Bạn xác nhận sẽ đăng xuất?'],
  //               async () => {
  //                 setCookie(COOKIE_JWT, undefined);
  //                 history.push('/logout');
  //                 e.preventDefault();
  //               },
  //               'Đồng ý',
  //             ),
  //           );
  //         }}>
  //         <LogoutOutlined type='logout' />
  //         Đăng xuất
  //       </span>
  //     ),
  //   },
  // ];

  return (
    <div id='sidebar__left' className='ca_sidebar'>
      <div className='ca_logo'>
        <a className='ca_main_logo'>
          <Link to='/dashboard'>
            <img src={logo_default} />
          </Link>
        </a>
        {!collapsed && (
          <Title level={2} color='white' style={{ color: 'white', margin: '1rem 2rem' }}>
            FFMS
          </Title>
        )}
        <a className='ca_footer_logo'>
          <Link to='/dashboard'>
            <img src={logo_default} />
          </Link>
        </a>
        <Button
          className='ca_footer_logo'
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleCollapse}
          style={{
            fontSize: '16px',
            width: 20,
            height: 20,
          }}
          id='ca_close_nav'
        />
      </div>
      {/* <UserSection className='ca_user_admin ca_flex ca_align_items_center'>
        <img
          style={{
            width: '40px',
            height: '40px',
            border: '0.01px solid #19376d',
            borderRadius: '50%',
          }}
          src={logo_default}
          onError={(e) => {
            this.src = logo;
          }}
        />
        <span className='ca_hideen_nav'>{user?.fullname}</span>
        <div className='user__section__dropdown'>{menuUser.map((o) => o.label)}</div>
      </UserSection> */}
      <ul id='menu__list' className='ca_main_menu'>
        <MenuRecursive
          items={navigation}
          openKey={openKey}
          recureSiveOpenKey={(value) => {
            setOpenKey({});
            handleSetOpen(value);
          }}
          setOpenKey={setOpenKey}
        />
      </ul>
      {modalChangePassword && (
        <ChangePassword
          onClose={() => {
            setModalChangePassword(undefined);
          }}
        />
      )}
    </div>
  );
};

export default SideBar;
