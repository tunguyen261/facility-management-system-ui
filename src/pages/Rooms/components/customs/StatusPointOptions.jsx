import { getRoomStatus } from 'pages/Rooms/utils/call.api';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { showToast } from 'utils/helpers';

const StatusNav = styled.ul`
  display: flex;
`;

const StatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: inline-block;
  margin: 5px 15px 0 15px;
`;
function StatusPointOptions({ props }) {
  const [statusOptions, setStatusOptions] = useState();
  const [params, setParams] = useState({
    is_active: 1,
    page: 1,
    items_per_page: 25,
  });
  const loadStatusOption = useCallback(() => {
    getRoomStatus(params)
      .then((res) => setStatusOptions(res?.data))
      .catch((err) => showToast(err.message ?? 'Có lỗi xảy ra'));
  }, [params]);
  useEffect(loadStatusOption, [loadStatusOption]);

  return (
    <React.Fragment>
      <StatusNav>
        {(statusOptions || []).map((item) => (
          <li key={item.id.toString()}>
            <StatusDot color={item?.color}></StatusDot>
            <a>{item?.status_name}</a>
          </li>
        ))}
      </StatusNav>
    </React.Fragment>
  );
}

export default StatusPointOptions;
