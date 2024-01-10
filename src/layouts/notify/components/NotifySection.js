import React, { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import useScroll from 'hooks/use-scroll';
import classNames from 'classnames';
import styled from 'styled-components';
import Loading from 'components/shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getListNotify, updateNofifyStatus } from 'services/global.service';
import { hideNotify } from 'actions/global';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';

const List = styled.div`
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  a,
  h3 {
    line-height: 1;
  }
`;

const NotifySection = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  const [data, setData] = useState([]);
  const [isScroll] = useScroll(ref);
  const [stopScroll, setStopScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { typeNotify } = useSelector((state) => state.global);

  const { pathname } = useLocation();
  const loadNotify = useCallback(() => {
    setLoading(true);
    const patyNoti = '/notification';
    getListNotify(patyNoti, page, typeNotify?.value).then((data) => {
      if (data?.data?.length == 0) {
        setStopScroll(true);
        setLoading(false);
        return;
      }
      setData((prev) => _.concat(prev, data?.data));
      setLoading(false);
    });
  }, [typeNotify, page]);
  useEffect(loadNotify, [loadNotify]);

  useEffect(() => {
    if (isScroll && !loading && !stopScroll) {
      setPage((prev) => prev + 1);
    }
  }, [isScroll, loading, stopScroll]);

  return (
    <React.Fragment>
      <List ref={ref}>
        {data?.map((o) => (
          <a
            // href={typeNotify?.redirectUrl(o?.id, o?.children_id ?? o?.id)}
            onClick={async () => {
              window._$g.rdr(`/${o?.redirect_path}`);
              await updateNofifyStatus(o?.id);
              dispatch(hideNotify());
            }}
            // onMouseOver={async() => { if(!o.is_read){
            //   await updateNofifyStatus(o?.id);
            //   setPage(1);
            //   loadNotify()
            // }}}
            className={classNames('ca_list_items', {
              ca_non_read: !o?.is_read,
            })}>
            <span className={`fi ${typeNotify?.icon}`}></span>
            <h3>{o?.title}</h3>
            <p>{o?.content}</p>
            <span>
              <b>{o?.creator?.fullname}</b> - {moment(o?.created_at).format('DD/MM/YYYY')}
            </span>
          </a>
        ))}
        {loading && <Loading />}
      </List>
    </React.Fragment>
  );
};

export default NotifySection;
