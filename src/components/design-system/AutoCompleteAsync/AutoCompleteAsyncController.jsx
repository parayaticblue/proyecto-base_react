import { useEffect, useState } from 'react';
import { AutoCompleteAsync } from './AutoCompleteAsync';
import { DICTONARY } from 'const/Dictonary';

export const AutoCompleteAsyncController = ({
  setFieldValue,
  isSubmitting,
  setFieldTouched,
  label,
  disabled,
  fetchCall,
  value,
  rol = '', // opcional para enviar el rol
  preload, // Si es true se ejecuta el fetchCall al montar el componente,
  ...rest
}) => {
  const [rowCountEmpresas, setRowCountEmpresas] = useState(1);
  const [pagination, setPagination] = useState(DICTONARY.PAGINACION.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (value === '') {
      return;
    }
    fetchCall({
      setIsLoading: setIsLoading,
      setData: setData,
      paginationEmpresas: setPagination,
      inputValue: value ? value.label : '',
      setRowCountEmpresas: setRowCountEmpresas,
      rol: rol ? rol : ''
    });
  }, [rol]);

  return (
    <AutoCompleteAsync
      disabled={isLoading || isSubmitting || disabled}
      isLoading={isLoading}
      data={data}
      fetchCall={inputValue => {
        fetchCall({
          setIsLoading: setIsLoading,
          setData: setData,
          paginationEmpresas: setPagination,
          inputValue: inputValue.toUpperCase(),
          setRowCountEmpresas: setRowCountEmpresas,
          rol: rol
        });
      }}
      label={label}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      value={value}
      preload={preload}
      {...rest}
    />
  );
};
