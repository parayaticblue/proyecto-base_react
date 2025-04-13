import { useState } from 'react';
import InputAsyncComponent from './InputAsync';

export const InputAsyncController = ({
  setFieldValue,
  isSubmitting,
  setFieldTouched,
  label,
  disabled,
  fetchCall,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <InputAsyncComponent
      disabled={isLoading || isSubmitting || disabled}
      isLoading={isLoading}
      fetchCall={inputValue =>
        fetchCall({
          setIsLoading: setIsLoading,
          inputValue: inputValue.toUpperCase()
        })
      }
      label={label}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      touched
      {...rest}
    />
  );
};
