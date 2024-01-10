import React from 'react';
import styled from 'styled-components';
import { splitString } from 'utils/index';

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  position: absolute;
  width: fit-content;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;

  ${TooltipWrapper}:hover & {
    opacity: 1;
  }
`;

const TooltipHanlde = ({ children }) => {
  return (
    <TooltipWrapper>
      <TooltipContent>{children}</TooltipContent>
      <div>{splitString(children, 60)}</div>
    </TooltipWrapper>
  );
};
export default TooltipHanlde;
