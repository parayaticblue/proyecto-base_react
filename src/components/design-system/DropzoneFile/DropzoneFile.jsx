import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ButtonComponent from '../Button/Button';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import IconComponent from '../icon/Icon';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import Text from '../Text/Text';
import styles from './dropzoneFile.module.css';
import { FilethumbFileComponent } from './Filethumb/FilethumbFile';
import { getBase64 } from 'views/Business/Formularios/New/helpers/GetBase64Helper';
import AlertComponent from '../Alert/Alert';

const ERROR_CODES = {
  'file-invalid-type': 'El tipo de archivo cargado es inválido.',
  'file-too-large': 'El archivo cargado excede el peso permitido.'
};

const DropzoneFile = ({
  accept,
  maxFiles = 4,
  maxSize = 4194304,
  dataFiles,
  setDataFiles,
  enableEditingFile = true,
  enablePreviewFile,
  disabled = false,
  multiple,
  loadingbd,
  children
}) => {
  const {
    getRootProps,
    getInputProps,
    open, // acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    multiple: multiple === undefined ? true : multiple,
    noClick: true,
    noKeyboard: true,
    accept: accept,
    maxFiles: maxFiles,
    maxSize: maxSize,
    disabled: disabled,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      setErrorRejected([]);
    },
    onDropRejected: data => {
      const errores = data[0].errors.map(error => error.code);
      setErrorRejected(errores);
    }
  });

  const [files, setFiles] = useState([]);
  const [errorRejected, setErrorRejected] = useState([]);

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    const fetchDataFiles = async () => {
      // Por cada archivo se obtiene su base64
      const dataFiles = await Promise.all(
        files.map(async file => {
          const base64 = await getBase64(file);

          // Se retorna el archivo en formato objeto
          return {
            nombreArchivo: file.name,
            base64: base64,
            File: file
          };
        })
      );

      // Se establece el estado con los archivos en formato objeto
      setDataFiles(dataFiles);
    };

    fetchDataFiles();

    // Al desmontar el componente se limpia el estado
    return () => {
      setDataFiles([]);
    };
  }, [files]);

  return (
    <>
      <div
        className={`
          ${styles.wrapper}
          ${isFocused ? styles.wrapperFocused : ''}
          ${isDragAccept ? styles.wrapperDragAccept : ''}
          ${isDragReject ? styles.wrapperDragReject : ''}
          ${disabled ? styles.wrapperDisabled : ''}
        `}
      >
        <div
          // onSubmit={handleSubmit}
          {...getRootProps()}
          className={`
          ${styles.root}
          ${isFocused ? styles.isFocused : ''}
          ${isDragAccept ? styles.isDragAccept : ''}
          ${isDragReject ? styles.isDragReject : ''}
          ${disabled ? styles.isDisabled : ''}
        `}
        >
          <input
            type="file"
            // onChange={handleFileChange}
            {...getInputProps()}
          />
          <div className="grid grid-cols-12 py-5 px-4">
            <div className="col-span-12 xs:col-span-2 xl:col-span-1 mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#2E8567] align-middle justify-center content-center items-center m-0 min-w-[48px] mb-2">
                <IconComponent color="primary" className="text-white">
                  <DriveFolderUploadOutlinedIcon className="w-8 h-8" />
                </IconComponent>
              </div>
            </div>
            <div className="col-span-12 xs:col-span-10 xl:col-span-11">
              <div className="pl-2 block xl:flex justify-between">
                <div className="px-2">
                  <Text className="text-black font-semibold">
                    Arrastra y suelta tus archivos aquí (máximo {maxFiles})
                  </Text>
                  <Text className="text-neutral-40 mb-4">
                    o presiona el siguiente botón para seleccionarlos
                  </Text>
                </div>
                <div className="pr-4 mt-3 xl:mt-0">
                  <ButtonComponent
                    disabled={disabled ? true : false}
                    onClick={open}
                    className="h-auto"
                  >
                    Seleccionar archivos{' '}
                    <PostAddOutlinedIcon className="ml-2" />
                  </ButtonComponent>
                </div>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>

      {errorRejected.length > 0 && (
        <div className="mt-4">
          <AlertComponent type="error">
            <Text className="text-error-dark font-bold mb-2">
              El archivo no puede ser cargado
            </Text>
            {errorRejected.map(error => {
              return (
                <Text className="text-error-dark">
                  -{' '}
                  {ERROR_CODES[error]
                    ? ERROR_CODES[error]
                    : 'Ha ocurrido un error desconocido al intentar cargar el documento. Verifica que cumpla con el tipo y tamaño'}
                </Text>
              );
            })}
          </AlertComponent>
        </div>
      )}

      {dataFiles.length > 0 && files.length > 0 && (
        <aside className="mt-5">
          <Text className="mb-2">Archvivo cargado</Text>
          <div className="rounded bg-background-primary p-5">
            <div className="grid grid-cols-2">
              {files.map((file, key) => (
                <FilethumbFileComponent
                  key={key}
                  file={file}
                  disabled={loadingbd ? true : false}
                  enablePreviewFile={enablePreviewFile}
                  onRemove={() => {
                    setFiles(
                      files.filter(fileItem => fileItem.name !== file.name)
                    );
                    setDataFiles(
                      files.filter(fileItem => fileItem.name !== file.name)
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default DropzoneFile;
