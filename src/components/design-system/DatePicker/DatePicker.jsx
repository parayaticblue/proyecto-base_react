import React from 'react';
import InputComponent from '../input/Input';

export const DatePickerComponent = React.forwardRef((props, ref) => {
  const ownerState = props.ownerState ? props.ownerState : null;
  return (
    <InputComponent
      {...ownerState}
      {...props}
      ref={ref}
      size="small"
      outerInputProps={props.InputProps}
    />
  );
});
