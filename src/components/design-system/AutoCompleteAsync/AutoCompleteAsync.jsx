import { useEffect } from 'react';
import { useState } from 'react';
import AutocompleteComponent from '../Autocomplete/Autocomplete';
import InputComponent from '../input/Input';
import { CircularProgress } from '@mui/material';

export const AutoCompleteAsync = props => {
  const {
    setFieldValue,
    isSubmitting,
    value,
    data,
    label,
    setFieldTouched,
    fetchCall,
    isLoading,
    disabled,
    preload,
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const debouncedValue = useDebounce(inputValue, 1000);
  useEffect(() => {
    if (debouncedValue) {
      (async () => {
        await fetchCall(debouncedValue);
        setOpen(true);
      })();
    }
  }, [debouncedValue]);

  const handleInputChange = (e, v) => {
    // console.log('v', v);
    if (preload) {
      return;
    }
    setInputValue(v);
  };

  return (
    <AutocompleteComponent
      loading={isLoading}
      open={open}
      onOpen={() => {
        if (data && data.length > 0) {
          setOpen(true);
        }
      }}
      onInputChange={handleInputChange}
      onChange={(ev, valueObject, reason) => {
        if (reason === 'clear') {
          setFieldValue(null);
        }
        setFieldValue(valueObject);
      }}
      onClose={() => setOpen(false)}
      options={!data ? [{ label: 'Loading...', id: 0 }] : data}
      getOptionDisabled={option => option.label === 'Loading...'}
      disabled={disabled}
      value={value}
      //clearOnEscape={true}
      //openOnFocus={true}
      getOptionLabel={option => (option ? option.label : '')}
      onBlur={() => setFieldTouched()}
      renderInput={params => (
        <InputComponent
          {...params}
          label={label}
          disabled={disabled}
          placeholder={
            data.length === 0 && preload ? 'Sin opciones' : 'Buscar...'
          }
          outerInputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      {...rest}
    />
  );
};

function useDebounce(value, delay, initialValue) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setState(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return state;
}
