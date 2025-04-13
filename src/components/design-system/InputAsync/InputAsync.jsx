import { CircularProgress, TextField } from '@mui/material';
import { DICTONARY } from 'const/Dictonary';
import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import styles from '../input/input.module.css';

/**
 * InputComponent
 * @param textFieldParams añade params adicionales requeridos para el AutoComplete
 * @param label recibe componente <LabelComponent></LabelComponent> para renderizar label
 * @param children no se usa (por ahora)
 * @param inputProps recibe props adicionales para renderizar iconos dentro del input
 * @param error obj para desplegar errores { tipo: 'error', mensaje: '' }
 * @param rest todo lo adicional enviado como props.
 */
const InputAsyncComponent = props => {
  const {
    disabled,
    estado,
    textFieldParams,
    label,
    children,
    outerInputProps,
    touched,
    size,

    setFieldValue,
    isSubmitting,
    values,
    data,
    setFieldTouched,
    fetchCall,
    isLoading,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedValue) {
      (async () => {
        await fetchCall(debouncedValue);
      })();
    }
  }, [debouncedValue]);

  const handleInputChange = value => {
    setInputValue(value);
  };

  const InputProps = textFieldParams ? textFieldParams.InputProps : {};

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };

  return (
    <div className="ui-input">
      {label && <div className={disabled ? styles.disabled : ''}>{label}</div>}
      <TextField
        disabled={disabled ? disabled : false}
        {...rest}
        {...textFieldParams}
        size={size ? size : 'small'}
        onChange={event => {
          setFieldValue(event.target.value);
          handleInputChange(event.target.value);
        }}
        InputProps={{
          ...outerInputProps,
          ...InputProps,
          classes: {
            root: `${styles.root} ${
              estado && touched ? styles[estado.tipo] : ''
            }`,
            input: styles.input,
            notchedOutline: styles.outline,
            disabled: styles.disabled,
            adornedEnd: styles.adornedEnd
          },
          endAdornment: (
            <>{isLoading && <CircularProgress color="inherit" size={20} />}</>
          )
        }}
      />

      {estado && touched && estado.mensaje && (
        <Text
          size="s"
          className={`
            font-medium flex items-center py-1
            ${styles['feedback' + estado.tipo]}
          `}
        >
          {getIcon(estado.tipo)} {estado.mensaje}
        </Text>
      )}
    </div>
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

export default InputAsyncComponent;
