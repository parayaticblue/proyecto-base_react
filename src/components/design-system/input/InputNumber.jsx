import React from 'react';
import { NumericFormat } from 'react-number-format';
import Text from 'components/design-system/Text/Text';
import { DICTONARY } from 'const/Dictonary';
import styles from './input.module.css';

const InputNumber = (props) => {

  const {
    label,
    disabled,
    estado,
    touched,
    onChange,
    onBlur,
    maxDecimals,
    ...rest
  } = props;

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };


  return (
    <div className="ui-input">
      {label && <div className={disabled ? styles.disabled : ''}>{label}</div>}
      
      <NumericFormat
        {...rest}
        disabled={disabled ? disabled : false}
        decimalSeparator="," 
        thousandSeparator="."
        allowNegative={false} 
        //allowLeadingZeros
        allowedDecimalSeparators={["%"]}
        decimalScale={maxDecimals === null ? 2 : maxDecimals}
        onValueChange={
          (values) => {
            onChange({
              target: {
                name: props.name,
                value: values.formattedValue,
              },
            });
          }
        }
        onBlur={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.target.value,
            },
          });
          onBlur();
        }}
        className={`
          ${styles.root} 
          ${styles.input}
          ${estado && touched ? styles[estado.tipo] : ''}
          ${disabled ? styles.disabled : ''}
        `}
      />
      {estado && touched && estado.mensaje && (
        <Text
          size="s"
          className="font-medium text-error-dark flex items-center py-1"
        >
          {getIcon(estado.tipo)} {estado.mensaje}
        </Text>
      )}
    </div>
  );
}

export default InputNumber;