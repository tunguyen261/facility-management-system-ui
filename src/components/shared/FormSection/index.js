import React, { useMemo } from 'react';
import { Spin } from 'antd';
import { useFormContext } from 'react-hook-form';
import { urlToList } from 'utils';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import CAButton from '../CAButton';
import PropTypes from 'prop-types';
import routes from 'routers';
import CheckAccess from 'navigation/CheckAccess';
import styled from 'styled-components';

const Footer = styled.div``;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const FormSection = ({
  loading,
  detailForm,
  onSubmit,
  disabled,
  actions,
  noActions,
  noSideBar,
  noPadding,
  style,
  customerClose,
  hiddenCloseBtn,
}) => {
  const methods = useFormContext();
  const {
    formState: { isSubmitting },
  } = methods;
  const { pathname } = useLocation();
  // Find name function
  const findNameFunctions = useMemo(() => pathname?.split('/')?.[1], [pathname]);
  const PERMISSION = useMemo(() => {
    const functionsRouteGroup = routes.filter((o) => o?.path.includes(`/${findNameFunctions}/`));
    return {
      edit: functionsRouteGroup?.find((o) => o?.path.includes('/edit'))?.function,
      add: functionsRouteGroup?.find((o) => o?.path.includes('/add'))?.function,
      detail: functionsRouteGroup?.find((o) => o?.path.includes('/detail'))?.function,
    };
  }, [findNameFunctions]);

  const params = useParams();

  const loadingForm = loading || isSubmitting;

  const id = useMemo(() => {
    return params[`${findNameFunctions}_id`] ?? params?.id ?? params[Object.keys(params).find((p) => p.includes('id'))];
  }, [params, findNameFunctions]);

  const isView = useMemo(() => pathname.includes('/detail') || pathname.includes('/view'), [pathname]);
  const isAdd = useMemo(() => pathname.includes('/add'), [pathname]);
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname]);
  const history = useHistory();
  const path = urlToList(useLocation().pathname)[0];

  const goToPreviousPath = () => {
    history.push(`${path}`);
  };
  const goToEditPath = (e) => {
    e.preventDefault();
    history.push(`${path}/edit/${id}`);
  };

  const jsx_footer = useMemo(() => {
    if (noActions) {
      return;
    }

    if (Array.isArray(actions)) {
      return actions?.filter((p) => !p.hidden).map((props, i) => <CAButton className='mr-2' key={i} {...props} />);
    } else {
      if (isView) {
        return (
          <CheckAccess permission={PERMISSION?.edit}>
            <button type='button' className='ca_btn_outline ca_btn_outline_success' onClick={goToEditPath}>
              Chỉnh sửa
            </button>
          </CheckAccess>
        );
      } else if (isAdd || isEdit) {
        return (
          <CheckAccess permission={isEdit ? PERMISSION?.edit : PERMISSION?.add}>
            <button type='submit' className='ca_btn ca_btn_success'>
              <span className='fi fi-rr-check'></span>Hoàn tất {isEdit ? 'chỉnh sửa' : 'thêm mới'}
            </button>
          </CheckAccess>
        );
      }
    }
  }, [isView, isEdit, isAdd, actions, noActions]);

  const jsx_close = useMemo(() => {
    if (!noActions) {
      if (hiddenCloseBtn) {
        return <></>;
      }
      return (
        <button type='button' className='ca_btn_outline' onClick={customerClose ?? goToPreviousPath}>
          Đóng
        </button>
      );
    }
  }, [noActions, hiddenCloseBtn]);

  const parseDetailForm = useMemo(() => {
    return (detailForm ?? []).filter((p) => !p.hidden) ?? [];
  }, [detailForm]);

  const jsx_main = (
    <React.Fragment>
      <div style={style} className='ca_main_wrapp'>
        <div className='ca_row'>
          {!noSideBar && (
            <div className='ca_col_3'>
              <ul className='ca_control_form'>
                {parseDetailForm.map((p, key) => {
                  let checkActive = false;
                  if (Boolean(p?.fieldActive)) {
                    for (let i of p?.fieldActive ?? []) {
                      if (methods.watch(i) !== 0 && !Boolean(methods.watch(i))) {
                        checkActive = false;
                        break;
                      }
                      checkActive = true;
                    }
                  } else {
                    checkActive = true;
                  }
                  return (
                    <li
                      onClick={() => {
                        document.getElementById(key).scrollIntoView({
                          block: 'start',
                          behavior: 'smooth',
                        });
                      }}
                      key={key}>
                      <a className={checkActive ? 'ca_active' : ''}>
                        <span className='fi fi-rr-check'></span> {p?.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className={`${noSideBar ? 'ca_col_12' : 'ca_col_9'} ${noPadding ? '' : 'ca_pb_6'}`}>
            <Spin spinning={loadingForm} indicator={antIcon}>
              <div className='ca_row'>
                {parseDetailForm.map((p, key) => {
                  const { title, id, component: Component, className, ...props } = p;
                  return (
                    <span id={key} className={className ?? 'ca_col_12'}>
                      <Component id={id} title={title} disabled={disabled} {...props} />
                    </span>
                  );
                })}
              </div>
            </Spin>
          </div>
        </div>
      </div>
      {!noActions && !isSubmitting && (
        <Footer className='ca_btn_save ca_btn_group ca_flex ca_justify_content_right ca_align_items_center'>
          {jsx_footer}
          {jsx_close}
        </Footer>
      )}
    </React.Fragment>
  );

  return noActions ? jsx_main : <form onSubmit={methods.handleSubmit(onSubmit)}>{jsx_main}</form>;
};

FormSection.propTypes = {
  loading: PropTypes.bool,
  detailForm: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      component: PropTypes.node,
      fieldActive: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,

  noActions: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      type: PropTypes.oneOf(['primary', 'danger', 'success', 'warning', 'blue', 'red', 'green']),
      icon: PropTypes.string,
      content: PropTypes.string,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
      loading: PropTypes.bool,
      outline: PropTypes.bool,
    }),
  ),
};

FormSection.defaultProps = {
  loading: false,
  detailForm: {},
  onSubmit: () => {},
  disabled: false,
  noActions: false,
};

export default FormSection;
