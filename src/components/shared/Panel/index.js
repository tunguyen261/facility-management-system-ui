import React, { useMemo, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { urlToList } from 'utils';
import useQueryString from 'hooks/use-query-string';
import styled from 'styled-components';
import CAButton from 'components/shared/CAButton';

const ComponentRender = styled.span`
  display: ${(props) => (props.hidden ? 'none' : '')};
`;

const Panel = ({ onSubmit, loading, panes, actions, noActions, hasSubmit, ...props }) => {
  const methods = useFormContext();

  const [query, setQuery] = useQueryString();
  const tab_active = query?.tab_active ?? '';
  const { pathname } = useLocation();
  const params = useParams();

  const id = useMemo(() => {
    const getNameFunction = pathname.split('/')[1];
    return params[`${getNameFunction}_id`] ?? params?.id ?? params[Object.keys(params).find((p) => p.includes('id'))];
  }, [params, pathname]);

  const isView = useMemo(() => pathname.toLowerCase().includes('/detail') || pathname.includes('/view'), [pathname]);
  const isAdd = useMemo(() => pathname.toLowerCase().includes('/add'), [pathname]);
  const isEdit = useMemo(() => pathname.toLowerCase().includes('/edit'), [pathname]);
  const history = useHistory();
  const path = urlToList(useLocation().pathname)[0];

  useEffect(() => {
    if (!tab_active) {
      setQuery({
        tab_active: panes[0]?.key?.toLowerCase(),
      });
    }
  }, [tab_active, panes]);

  const parseActionValue = useMemo(() => {
    return Array.isArray(actions) && actions?.filter((p) => !p.hidden);
  }, [actions]);

  const goToEditPath = (e) => {
    e.preventDefault();
    history.push(`${path}/edit/${id}`);
  };
  const goToPreviousPath = () => {
    history.push(`${path}`);
  };

  const jsx_footer = useMemo(() => {
    if (noActions) {
      return;
    }
    if (Boolean(parseActionValue.length)) {
      return parseActionValue.map((props, i) => <CAButton key={i} className='mr-2' {...props} />);
    } else {
      if (isView) {
        return (
          <button type='button' className='ca_btn_outline ca_btn_outline_success' onClick={goToEditPath}>
            Chỉnh sửa
          </button>
        );
      } else if (isAdd || isEdit) {
        return (
          <button type='submit' className='ca_btn ca_btn_success'>
            <span className='fi fi-rr-check'></span>Hoàn tất {isEdit ? 'chỉnh sửa' : 'thêm mới'}
          </button>
        );
      }
    }
  }, [isView, isEdit, isAdd, parseActionValue, noActions]);

  const jsx_close = useMemo(() => {
    if (!noActions) {
      return (
        <button type='button' className='ca_btn_outline' onClick={goToPreviousPath}>
          Đóng
        </button>
      );
    }
  }, [noActions]);

  const jsx_submit = !noActions && (
    <div className='ca_btn_save ca_btn_group ca_flex ca_justify_content_right ca_align_items_center'>
      {jsx_footer}
      {jsx_close}
    </div>
  );

  const parsePanel = panes?.filter((p) => !p.hidden);

  const jsx_main = (
    <React.Fragment>
      <ul className='ca_tabs'>
        {parsePanel.map((e) => {
          return (
            <li
              className={tab_active.toLowerCase() === e?.key?.toString()?.toLowerCase() ? `ca_active` : ''}
              onClick={() => {
                setQuery({
                  tab_active: e?.key?.toLowerCase(),
                });
              }}>
              <a className='ca_link'>{e?.label}</a>
            </li>
          );
        })}
      </ul>

      {parsePanel.map((e) => {
        const { component: Component, key, ...props } = e
        return (
          <ComponentRender hidden={!(key.toString()?.toLowerCase() === tab_active?.toLowerCase())}>
            <Component {...props} />
          </ComponentRender>
        );
      })}
      {hasSubmit && jsx_submit}
    </React.Fragment>
  );
  return (
    <React.Fragment>
      {hasSubmit ? <form onSubmit={methods.handleSubmit(onSubmit)}>{jsx_main}</form> : jsx_main}
    </React.Fragment>
  );
};

export default Panel;
