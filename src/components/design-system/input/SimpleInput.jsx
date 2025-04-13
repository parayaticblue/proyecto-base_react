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
const SimpleInputComponent = props => {
  const {
    disabled,
    estado,
    textFieldParams,
    label,
    outerInputProps,
    touched,
    isLoading,
    autoComplete,
    ...rest
  } = props;

  const InputProps = textFieldParams ? textFieldParams.InputProps : {};

  return (
    <TextField
      autoComplete={autoComplete}
      disabled={disabled || isLoading}
      {...rest}
      InputProps={{
        ...InputProps,
        disabled: isLoading,
        classes: {
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
  );
};
export default SimpleInputComponent;
