import { getRoomStatus } from 'pages/Rooms/utils/call.api';
import { ASSETS_STATUS_OPTIONS } from 'pages/Rooms/utils/constants';
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
function AssetStatusPointOptions({ props }) {
  // const [statusOptions, setStatusOptions] = useState(ASSETS_STATUS_OPTIONS);

  return (
    <React.Fragment>
      <StatusNav>
        {(ASSETS_STATUS_OPTIONS || []).map((item) => (
          <li key={item.id.toString()}>
            <StatusDot color={item?.color}></StatusDot>
            <a>{item?.label}</a>
          </li>
        ))}
      </StatusNav>
    </React.Fragment>
  );
}

export default AssetStatusPointOptions;
