import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  pointer-events: ${(props) => (props.nonPoiner ? 'none' : 'auto')};
`;

const DisableStyle = styled.span`
  display: ${(props) => props.display ?? 'block'};
`;

const FormItem = ({
  className,
  label,
  hiddenLabel = false,
  isRequired = false,
  children,
  disabled,
  display,
  style,
}) => {
  return (
    <Wrapper nonPoiner={disabled} className={className}>
      <div className={`ca_frm_box ${disabled ? 'ca_disable' : ''} ${style === 'gray' ? 'ca_readonly' : ''}`}>
        {!hiddenLabel && (
          <label>
            {label} {isRequired && <span className='ca_red'>*</span>}
          </label>
        )}
        <DisableStyle display={display} disabled={disabled}>
          {children}
        </DisableStyle>
      </div>
    </Wrapper>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  hiddenLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
};

export default FormItem;
