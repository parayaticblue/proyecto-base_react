import { CircularProgress, TextField } from '@mui/material';
import { DICTONARY } from 'const/Dictonary';
import React from 'react';
import Text from '../Text/Text';
import styles from './input.module.css';

/**
 * InputComponent
 * @param textFieldParams añade params adicionales requeridos para el AutoComplete
 * @param label recibe componente <LabelComponent></LabelComponent> para renderizar label
 * @param children no se usa (por ahora)
 * @param inputProps recibe props adicionales para renderizar iconos dentro del input
 * @param error obj para desplegar errores { tipo: 'error', mensaje: '' }
 * @param rest todo lo adicional enviado como props.
 */
const InputComponent = props => {
  const {
    disabled,
    estado,
    textFieldParams,
    label,
    children,
    outerInputProps,
    touched,
    size,
    customValidation,
    isLoading,
    autoComplete,
    ...rest
  } = props;

  const InputProps = textFieldParams ? textFieldParams.InputProps : {};

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };

  return (
    <div className="ui-input">
      {label && <div className={disabled ? styles.disabled : ''}>{label}</div>}
      <TextField
        autoComplete={autoComplete}
        disabled={disabled || isLoading}
        {...rest}
        {...textFieldParams}
        size={size ? size : 'small'}
        {...(customValidation ? { onChange: customValidation } : {})}
        InputProps={{
          endAdornment: isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : null, // Agregar un indicador de carga si isLoading es true
          ...outerInputProps,
          ...InputProps,
          disabled: isLoading || disabled, // se agrega disabled para que no se pueda escribir mientras isLoading es true o se envie este parametro
          classes: {
            // root: classes.root
            // focused: classes.focused
            root: `${styles.root} ${
              estado && touched ? styles[estado.tipo] : ''
            }`,
            input: styles.input,
            textarea: styles.input,
            multiline: styles.multiline,
            notchedOutline: styles.outline,
            disabled: styles.disabled,
            adornedEnd: styles.adornedEnd
          }
        }}
      />

      {!disabled && estado && touched && estado.mensaje && (
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
export default InputComponent;
