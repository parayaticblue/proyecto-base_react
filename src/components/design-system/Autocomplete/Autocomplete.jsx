import React from 'react';
import styles from './autocomplete.module.css';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { DICTONARY } from 'const/Dictonary';
import Text from '../Text/Text';

const removeDuplicados = (options, accesor) => {
  if (options && accesor) {
    if (options.length === 0) {
      return [];
    }

    return options.filter(item => item[accesor] !== '');
  } else {
    return [];
  }
};

const AutocompleteComponent = props => {
  const {
    accesor /*  propiedad que se usará como valor de cada opción                   */,
    customRenderOption /*  función que se ejecuta para renderizar cada opción                 */,
    disabled /*  si es true, el componente se deshabilita                           */,
    options /*  opciones que se mostrarán en el select                             */,
    label /*  label del select                                                   */,
    estado /*  estado del select                                                  */,
    touched /*  si el select ha sido tocado                                        */,
    children /*  children del select                                                */,
    value /*  valor del select                                                   */,
    isLoading /*  si es true, se muestra un skeleton                                 */,
    noOptionsText /*  texto que se muestra cuando no hay opciones                        */,
    isSelectAll /*  si es true, se agrega la opción de seleccionar todos los elementos */,
    labelSelectAll /*  label de la opción de seleccionar todos los elementos              */,
    classNameRoot,
    ...rest
  } = props;

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };

  return (
    <>
      <div
        className={`
        ${styles.root}
        ${classNameRoot ? classNameRoot : ''}
        ui-uv-select
      `}
      >
        <Autocomplete
          classes={{
            popper: styles.popper,
            listbox: styles.listbox,
            option: styles.option,
            paper: styles.paper,
            groupLabel: styles.groupLabel,
            tag: styles.tag
          }}
          value={value}
          clearText="Borrar"
          disabled={disabled ? disabled : false}
          disablePortal
          options={accesor ? removeDuplicados(options, accesor) : options}
          isOptionEqualToValue={(option, value) =>
            option[accesor] === value[accesor]
          }
          size="small"
          renderInput={params => (
            <div ref={params.InputProps.ref}>
              {React.Children.map(children, child => {
                return React.cloneElement(child, {
                  textFieldParams: params,
                  inputProps: params.inputProps
                });
              })}
            </div>
          )}
          renderOption={(props, option, key) => {
            if (customRenderOption) {
              return (
                <li {...props} key={key.index}>
                  {customRenderOption(option)}
                </li>
              );
            } else {
              if (typeof option === 'string') {
                return (
                  <li {...props} key={key.index}>
                    {option}
                  </li>
                );
              } else {
                return (
                  <li {...props} key={key.index}>
                    {option[accesor]}
                  </li>
                );
              }
            }
          }}
          noOptionsText={noOptionsText || 'Sin opciones'}
          filterOptions={(options, params) => {
            const filter = createFilterOptions();
            const filtered = filter(options, params);
            if (!isSelectAll) {
              return filtered;
            } else {
              return [{ [accesor]: labelSelectAll, all: true }, ...filtered];
            }
          }}
          {...rest}
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
    </>
  );
};

export default AutocompleteComponent;
