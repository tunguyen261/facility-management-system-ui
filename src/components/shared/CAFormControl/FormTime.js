import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const FormTimePicker = ({
  field,
  validation,
  placeholder,
  disabled = false,
  style,
  format,
  bordered,
  allowClear,
  ...props
}) => {
  // #region use-form
  const methods = useFormContext();
  const { error } = methods.getFieldState(field, methods.formState);

  React.useEffect(() => {
    methods.register(field, validation);
  }, [methods, field, validation]);
  // #endregion

  return (
    <React.Fragment>
      <TimePicker
        bordered={bordered}
        allowClear={allowClear}
        disabled={disabled}
        placeholder={placeholder}
        value={methods.watch(field) ? dayjs(methods.watch(field), format) : ''}
        onChange={(e, date) => {
          if (date) {
            methods.clearErrors(field);
            methods.setValue(field, date);
          } else {
            methods.setValue(field, '');
          }
        }}
        format={format}
        style={style}
        {...props}
      />
      {error && <ErrorMessage message={error?.message} />}
    </React.Fragment>
  );
};

FormTimePicker.propTypes = {
  field: PropTypes.string,
  validation: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  allowClear: PropTypes.bool,
};

export default FormTimePicker;
