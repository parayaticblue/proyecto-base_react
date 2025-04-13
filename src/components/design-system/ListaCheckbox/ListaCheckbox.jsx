import { FormControlLabel, FormGroup } from '@mui/material';
import SwitchComponent from '../Switch/Switch';
import Text from '../Text/Text';
import CheckboxComponent from '../Checkbox/Checkbox';
import { useCallback, useEffect, useState } from 'react';
import { DICTONARY } from 'const/Dictonary';

/*
  [
    {
      checked: true//false,
      ...rest
    },
    ...rest
  ]
*/

//opciones [{a},{b},{c}]
//opcioneSeleccionadas [{a},{c}]
export const ListaCheckbox = props => {
  const {
    isTodoSeleccionado = false,
    isError,
    isTouched,
    opciones,
    opcionesSeleccionadas,
    accesor,
    handleSeleccionados,
    radioButtonLabel,
    checkboxRender,
    estado,
    disabled,
    ocultaBotonTodoSeleccionado = false, //oculta el boton de seleccionar todo
    ocultaCheckBox = false //oculta el checkbox
  } = props;

  const formateaOpciones = useCallback(() => {
    if (!opciones || !accesor) {
      setOpcionesFormateadas([]);
      return;
    }

    const auxOpcionesSeleccionadas = {};
    for (const item of opcionesSeleccionadas) {
      auxOpcionesSeleccionadas[item[accesor]] = item[accesor];
    }

    const auxOpciones = opciones.map(item => {
      return {
        ...item,
        checked:
          Object.keys(auxOpcionesSeleccionadas).length > 0 &&
          auxOpcionesSeleccionadas[item[accesor]]
            ? true
            : false
      };
    });
    setOpcionesFormateadas(auxOpciones);
  }, [opciones, accesor, opcionesSeleccionadas]);

  const [opcionesFormateadas, setOpcionesFormateadas] = useState([]);
  const [todoSeleccionado, setTodoSeleccionado] = useState(isTodoSeleccionado);

  const handleSelectAll = () => {
    const auxOpciones = opcionesFormateadas.map(opcion => ({
      ...opcion,
      checked: !todoSeleccionado
    }));
    setTodoSeleccionado(!todoSeleccionado);
    setOpcionesFormateadas(auxOpciones);
    handleSeleccionados(auxOpciones.filter(item => item.checked));
  };

  const handleCheckItem = (item, value) => {
    const auxOpciones = opcionesFormateadas.map(opcion =>
      opcion[accesor] === item[accesor] ? { ...opcion, checked: value } : opcion
    );
    setOpcionesFormateadas(auxOpciones);
    handleSeleccionados(auxOpciones.filter(item => item.checked));
    setTodoSeleccionado(
      auxOpciones.filter(item => item.checked).length ===
        opcionesFormateadas.length
    );
  };

  useEffect(() => {
    if (!opciones || !accesor) setOpcionesFormateadas([]);
    formateaOpciones();
  }, [opciones, accesor, formateaOpciones]);

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };

  return (
    <>
      <FormControlLabel
        disabled={disabled}
        className="my-3 mx-0"
        control={
          ocultaBotonTodoSeleccionado ? (
            <></>
          ) : (
            <SwitchComponent
              checked={todoSeleccionado ? true : false}
              onChange={handleSelectAll}
              name="seleccionartodo"
            />
          )
        }
        label={
          ocultaBotonTodoSeleccionado ? (
            <></>
          ) : (
            <Text
              className={`${
                todoSeleccionado
                  ? 'text-uv-primary-0 font-bold'
                  : 'font-semibold'
              }`}
            >
              {radioButtonLabel}
            </Text>
          )
        }
      />
      <div
        className={`bg-background-primary p-5 rounded overflow-hidden w-full overflow-y-scroll max-h-[360px] scrollbar-uv border ${
          isError && isTouched
            ? 'border-error-dark'
            : 'border-background-primary'
        }`}
      >
        <FormGroup>
          {opcionesFormateadas &&
            opcionesFormateadas.map((item, key) => (
              <FormControlLabel
                key={key}
                className="w-full"
                disabled={disabled}
                control={
                  <CheckboxComponent
                    disabled={disabled}
                    style={{
                      visibility: ocultaCheckBox ? 'hidden' : 'visible'
                    }} //oculta el checkbox
                    checked={item.checked}
                    name="codigosSucursales"
                    value={item}
                    onChange={(ev, value) => {
                      handleCheckItem(item, value);
                    }}
                  />
                }
                label={checkboxRender(item)}
              />
            ))}
        </FormGroup>
      </div>
      {isError && isTouched && estado.mensaje && (
        <Text
          size="s"
          className="font-medium text-error-dark flex items-center py-1 mt-2"
        >
          {getIcon(estado.tipo)} {estado.mensaje}
        </Text>
      )}
    </>
  );
};
