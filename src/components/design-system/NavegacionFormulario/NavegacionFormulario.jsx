import {
  ChevronLeft,
  ChevronRight,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import Heading from '../Heading/Heading';
import IconButtonComponent from '../IconButton/IconButton';
import Text from '../Text/Text';
import ButtonComponent from '../Button/Button';
import Hidden from '@mui/material/Hidden';
import Close from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { DICTONARY } from 'const/Dictonary';

export const NavegacionFormulario = ({
  titulo,
  pasoActual,
  pasos,
  onCancelar,
  onSiguiente,
  onFinalizar,
  onVolver,
  isSubmitting,
  children,
  values
}) => {
  const [TOTAL_PASOS, setTOTAL_PASOS] = useState(pasos.length);
  const [PASO_ACTUAL, setPASO_ACTUAL] = useState(pasoActual);
  const [NUM_PASO_ACTUAL, setNUM_PASO_ACTUAL] = useState(pasoActual + 1);
  const [IS_PASO_INICIAL, setIS_PASO_INICIAL] = useState(pasoActual === 0);
  const [IS_ULTIMO_PASO, setIS_ULTIMO_PASO] = useState(
    pasoActual + 1 === TOTAL_PASOS
  );

  useEffect(() => {
    const esReciclador = values?.codigoRolesEmpresa.includes(
      DICTONARY.ROL.RECICLADORDEBASE.CODIGO.toString()
    );
    const totalPasos = esReciclador ? pasos.length : pasos.length - 1;
    setTOTAL_PASOS(totalPasos);
    setPASO_ACTUAL(pasos[pasoActual]);
    setNUM_PASO_ACTUAL(pasoActual + 1);
    setIS_PASO_INICIAL(pasoActual === 0);
    setIS_ULTIMO_PASO(pasoActual + 1 === totalPasos);
  }, [pasoActual, pasos, values?.codigoRolesEmpresa]);

  return (
    <div>
      <div className="shadow-md rounded-tl rounded-tr bg-white">
        <div className="px-4 sm:px-5 py-4">
          <Heading
            type="h2"
            className="mb-0 text-xl text-[22px] sm:h-10 flex items-center"
          >
            {IS_PASO_INICIAL && (
              <IconButtonComponent
                type="secondary"
                className="mr-2.5"
                onClick={onCancelar}
              >
                <ChevronLeft />
              </IconButtonComponent>
            )}
            {titulo}
          </Heading>
        </div>

        {isSubmitting ? (
          <>
            <div className="border-t py-1.5 px-2 sm:px-5 flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10"></div>
                <Text type="label" className="mb-0 text-sm">
                  <span className="text-gray-300 tracking-widest hidden sm:inline-block sm:mr-2.5">
                    0{TOTAL_PASOS}/0{TOTAL_PASOS}
                  </span>
                  <span className="text-uv-primary-0 normal-case truncate mr-2">
                    Cargando...
                  </span>
                </Text>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div
                className="bg-uv-primary-0 h-1"
                style={{
                  width: `${(TOTAL_PASOS / TOTAL_PASOS) * 100}%`
                }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className="border-t py-1.5 px-2 sm:px-5 flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  {!IS_PASO_INICIAL && (
                    <IconButtonComponent
                      className="bg-white hover:!bg-uv-primary-90"
                      onClick={() => onVolver()}
                    >
                      <ChevronLeft className="!text-uv-primary-0" />
                    </IconButtonComponent>
                  )}
                </div>
                <Text type="label" className="mb-0 text-sm">
                  <span className="text-gray-300 tracking-widest hidden sm:inline-block sm:mr-2.5">
                    0{NUM_PASO_ACTUAL}/0{TOTAL_PASOS}
                  </span>
                  <span className="text-uv-primary-0 normal-case truncate mr-2">
                    {PASO_ACTUAL.nombrePaso}
                  </span>
                  <span className="normal-case text-uv-secondary-0">
                    {PASO_ACTUAL.opcional && '(opcional)'}
                  </span>
                </Text>
              </div>
              {!IS_ULTIMO_PASO && (
                <IconButtonComponent
                  className="bg-white hover:!bg-uv-primary-90"
                  onClick={onSiguiente}
                >
                  <ChevronRight className="!text-uv-primary-0" />
                </IconButtonComponent>
              )}
            </div>
            <div className="w-full bg-gray-200 h-1">
              <div
                className="bg-uv-primary-0 h-1"
                style={{
                  width: `${(NUM_PASO_ACTUAL / TOTAL_PASOS) * 100}%`
                }}
              ></div>
            </div>
          </>
        )}
      </div>

      <div className="bg-white p-5 shadow-md">{children}</div>

      <div className="shadow-md rounded-bl rounded-br bg-white px-5 py-4 border-t mb-10">
        <div className="flex justify-between">
          <div>
            <ButtonComponent
              type="secondary"
              className="justify-center"
              hidden={IS_PASO_INICIAL}
              disabled={isSubmitting}
              onClick={() => onVolver()}
            >
              {IS_PASO_INICIAL ? (
                <>
                  <Hidden smDown>Cancelar</Hidden>
                  <Hidden smUp>
                    <Close />
                  </Hidden>
                </>
              ) : (
                <>
                  <Hidden smDown>
                    <NavigateBefore /> Volver
                  </Hidden>
                  <Hidden smUp>
                    <NavigateBefore />
                  </Hidden>
                </>
              )}
            </ButtonComponent>
          </div>

          <ButtonComponent
            form="form"
            buttonType={IS_ULTIMO_PASO ? 'submit' : 'button'}
            onClick={IS_ULTIMO_PASO ? onFinalizar : onSiguiente}
            disabled={isSubmitting}
          >
            {IS_ULTIMO_PASO ? (
              DICTONARY.MENSAJES_BOTONES_ACCIONES_CRUD.INGRESAR
            ) : (
              <>
                Continuar
                <NavigateNext />
              </>
            )}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};
