import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ButtonComponent from '../Button/Button';
import styles from './dropzone.module.css';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import Text from '../Text/Text';
import IconComponent from '../icon/Icon';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Dialog, DialogContent } from '@mui/material';
import { FilethumbComponent } from '../Filethumb/Filethumb';
import { getBase64 } from 'views/Business/Formularios/New/helpers/GetBase64Helper';
import AlertComponent from '../Alert/Alert';
import { FileViewer } from '../FileViewer/FileViewer';

const ERROR_CODES = {
  'file-invalid-type': 'El tipo de archivo cargado es inválido.',
  'file-too-large': 'El archivo cargado excede el peso permitido.',
  'too-many-files': 'Has excedido el límite de documentos permitido',
  'limite-excedido':
    'No puedes cargar más documentos. Puedes eliminar uno de los ya cargados presionando el botón "x"'
};

/**
 * No require estructuración puede desplegar con los archivos directos de backend.
 * @param dataFiles {
 * base64: archivo.base64,
    nombreArchivo: archivo.nombreArchivo,
    tipoArchivo: archivo.tipoArchivo,
    codigoArchivo: archivo.codigoArchivoResiduoDeclarado
  }
 */
const Dropzone = ({
  accept,
  maxFiles = 4,
  maxSize = 4194304,
  dataFiles,
  setDataFiles,
  enableEditingFile = true,
  enablePreviewFile = true,
  disabled = false,
  multiple,
  customClassProps,
  children
}) => {
  const {
    getRootProps,
    getInputProps,
    open,
    //acceptedFiles,
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
    onDrop: async acceptedFiles => {
      if (files.length === maxFiles) {
        setFiles(files);
        setDataFiles(files);
        setErrorRejected(['limite-excedido']);
      } else {
        const accepted = acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
        const filesAGuardar = await encodeToBase64(accepted);
        setFiles([...files, ...filesAGuardar]);
        setDataFiles([...files, ...filesAGuardar]);
      }
    },
    onDropRejected: data => {
      const errores = data[0].errors.map(error => error.code);
      setErrorRejected(errores);
    }
  });

  const encodeToBase64 = async files => {
    const dataFiles = await Promise.all(
      files.map(async file => {
        const returnFileObj = {
          nombreArchivo: file.name,
          tipoArchivo: file.type
        };
        const base64 = await getBase64(file);
        returnFileObj.base64 = base64.split(';base64,').pop();
        return returnFileObj;
      })
    );

    return dataFiles;
  };

  const [files, setFiles] = useState(dataFiles);
  const [errorRejected, setErrorRejected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState({});

  const [customClass, setCustomClass] = useState({
    main: 'grid grid-cols-12 py-5 px-4',
    colLeft: 'col-span-12 xs:col-span-2 xl:col-span-1 mx-auto',
    colRight: 'col-span-12 xs:col-span-10 xl:col-span-11',
    icon: 'w-12 h-12 rounded-full bg-[#2E8567] align-middle justify-center content-center items-center m-0 min-w-[48px] mb-2',
    button: 'h-auto'
  });

  useEffect(() => {
    if (!customClassProps) return;
    setCustomClass({
      main: customClassProps.main
        ? customClassProps.main
        : 'grid grid-cols-12 py-5 px-4',
      colLeft: customClassProps.colLeft
        ? customClassProps.colLeft
        : 'col-span-12 xs:col-span-2 xl:col-span-1 mx-auto',
      colRight: customClassProps.colRight
        ? customClassProps.colRight
        : 'col-span-12 xs:col-span-10 xl:col-span-11',
      icon: customClassProps.icon
        ? customClassProps.icon
        : 'w-12 h-12 rounded-full bg-[#2E8567] align-middle justify-center content-center items-center m-0 min-w-[48px] mb-2',
      button: customClassProps.button ? customClassProps.button : 'h-auto'
    });
  }, [customClassProps]);

  return (
    <div>
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
          {...getRootProps()}
          className={`
          ${styles.root}
          ${isFocused ? styles.isFocused : ''}
          ${isDragAccept ? styles.isDragAccept : ''}
          ${isDragReject ? styles.isDragReject : ''}
          ${disabled ? styles.isDisabled : ''}
        `}
        >
          <input {...getInputProps()} />
          <div className={customClass.main}>
            <div className={customClass.colLeft}>
              <div className={customClass.icon}>
                <IconComponent color="primary" className="text-white">
                  <DriveFolderUploadOutlinedIcon className="w-8 h-8" />
                </IconComponent>
              </div>
            </div>
            <div className={customClass.colRight}>
              <div className="pl-2 block xl:flex justify-between">
                <div className="">
                  <Text className="text-black font-semibold">
                    {`Arrastra y suelta ${
                      maxFiles <= 1 ? 'tu archivo' : 'tus archivos'
                    } aquí (máximo ${maxFiles})`}
                  </Text>
                  <Text className="text-neutral-40 mb-4">
                    {`o presiona el siguiente botón para ${
                      maxFiles <= 1 ? 'seleccionar' : 'seleccionarlos'
                    }`}
                  </Text>
                </div>
                <div className="pr-4 mt-3 xl:mt-0">
                  <ButtonComponent
                    disabled={disabled ? true : false}
                    onClick={open}
                    className={customClass.button}
                  >
                    {`Seleccionar ${maxFiles <= 1 ? 'archivo' : 'archivos'}`}
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
            {errorRejected.map((error, index) => {
              return (
                <Text className="text-error-dark" key={index}>
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

      {files.length > 0 && (
        <aside className="mt-5">
          <Text className="mb-2">Archivos cargados</Text>
          <div className="rounded bg-background-primary p-5">
            <div className="grid grid-cols-4">
              {files.map((file, key) => (
                <FilethumbComponent
                  key={key}
                  file={file}
                  disabled={disabled}
                  enablePreviewFile={enablePreviewFile}
                  onRemove={() => {
                    setFiles(
                      files.filter(
                        fileItem =>
                          fileItem.nombreArchivo !== file.nombreArchivo
                      )
                    );
                    setDataFiles(
                      files.filter(
                        fileItem =>
                          fileItem.nombreArchivo !== file.nombreArchivo
                      )
                    );
                  }}
                  //onDownload={true}
                  onEdit={
                    enableEditingFile
                      ? () => {
                          setDialogOpen(true);
                          setEditingFile(file);
                        }
                      : null
                  }
                />
              ))}
            </div>
          </div>
        </aside>
      )}

      {editingFile && (
        <Dialog
          fullWidth
          open={dialogOpen}
          onClose={() => setEditingFile(null)}
          maxWidth={'sm'}
        >
          <DialogContent className="p-0 h-full relative overflow-hidden">
            <div className="grid grid-cols-12 h-full relative overflow-hidden">
              <div className="col-span-12 bg-neutral-90 p-8 relative">
                <div className="shadow-md rounded overflow-hidden relative">
                  <FileViewer file={editingFile} fullDisplay />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white shadow-md p-4 justify-between flex items-center gap-4">
              <Text className="truncate">{editingFile.nombreArchivo}</Text>
              <ButtonComponent
                type="secondary"
                className="h-auto"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cerrar
              </ButtonComponent>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Dropzone;
