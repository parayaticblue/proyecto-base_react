
import { NumericFormat } from 'react-number-format';
import Text from 'components/design-system/Text/Text';
import { DICTONARY } from 'const/Dictonary';
import styles from './input.module.css';

const InputNumericFormat = (props) => {

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
      {label && <div className={disabled ? styles.disabled : ''}>{label} </div>}
      
      <NumericFormat
        {...rest}
        disabled={disabled ?  disabled : false} 
        decimalSeparator="," 
        customInput={InputComponentIntern} // Definir un componente de entrada personalizado
        // thousandSeparator="."
        allowNegative={false} 
        //allowLeadingZeros
        // allowedDecimalSeparators={["%"]}
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

// Definir la lógica de validación en el componente de entrada personalizado
const InputComponentIntern = (props) => {
  const { inputRef, onChange, onBlur, value, ...other } = props;

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Aplicar la lógica de validación
    const regex = /^(\d{0,12})(,\d{0,2})?$/;
    if (regex.test(inputValue)) {
      onChange(event);
    }
  };

  return (
    <input
      {...other}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      ref={inputRef}
    />
  );
};

export default InputNumericFormat;