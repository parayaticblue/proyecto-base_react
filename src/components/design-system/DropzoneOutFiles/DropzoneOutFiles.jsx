import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AlertComponent from '../Alert/Alert';
import ButtonComponent from '../Button/Button';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import Heading from '../Heading/Heading';
import IconComponent from '../icon/Icon';
import InputComponent from '../input/Input';
import LabelComponent from '../Label/Label';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import Text from '../Text/Text';
import { Dialog, DialogContent } from '@mui/material';
import { FilethumbComponent } from '../Filethumb/Filethumb';


import styles from './dropzoneOutFiles.module.css';
import { base64ToFile, getBase64 } from './helpers';


const ERROR_CODES = {
  'file-invalid-type': 'El tipo de archivo cargado es inválido.',
  'file-too-large': 'El archivo cargado excede el peso permitido.'
};

const DropzoneOutFiles = ({
  accept,
  maxFiles = 4,
  maxSize = 4194304,
  dataFiles,
  setDataFiles,
  enableEditingFile = true,
  enablePreviewFile,
  disabled = false,
  multiple,
  customClassProps,
  filesCargados,
  children,
}) => {
  const [files, setFiles] = useState([]);
  const [archivosCargados, setArchivosCargados] = useState([]);
  const [archivosLocales, setArchivosLocales] = useState([]);
  const [errorRejected, setErrorRejected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState({});
  const {
    getRootProps,
    getInputProps,
    open,
    // acceptedFiles,
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
      )
      setErrorRejected([]);
    },
    onDropRejected: data => {
      const errores = data[0].errors.map(error => error.code);
      setErrorRejected(errores);
    }
  });




  /**
   * Clases custom
   */
  const [customClass, setCustomClass] = useState({
    main: 'grid grid-cols-12 py-5 px-4',
    colLeft: 'col-span-12 xs:col-span-2 xl:col-span-1 mx-auto',
    colRight: 'col-span-12 xs:col-span-10 xl:col-span-11',
    icon: 'w-12 h-12 rounded-full bg-[#2E8567] align-middle justify-center content-center items-center m-0 min-w-[48px] mb-2',
    button: 'h-auto'
  });



  useEffect(() => {
    archivosCargados.forEach(file => URL.revokeObjectURL(file.preview));
  }, [archivosCargados])
  

  

  useEffect(() => {
    const fetchDataFiles = async () => {
      // Function to get base64 data for a file
      const getFileData = async (file) => {
        try {
          const base64 = await getBase64(file);
          return {
            nombreArchivo: file.name,
            base64: base64,
          };
        } catch (error) {
          console.error(`Error processing file ${file.name}: ${error.message}`);
          return null; // or handle error as needed
        }
      };
  
      // Map files to objects with base64 data
      const dataFilesPromises = files.map(getFileData);
  
      // Wait for all promises to settle
      const settledDataFiles = await Promise.allSettled(dataFilesPromises);
  
      // Filter out any failed promises
      const successfulDataFiles = settledDataFiles
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
  
      // Set the state with successful data
      setDataFiles(successfulDataFiles);
    };
  
    fetchDataFiles();
  
    // // Clean up ObjectURLs when component unmounts or when files change
    // return () => {
    //   files.forEach((file) => URL.revokeObjectURL(file.preview));
    // };
  }, [files, setDataFiles]);
  

  // Clases Custom
  useEffect(() => {
    if(!customClassProps) return;

    // Se establecen las clases custom
    setCustomClass({
      main:     customClassProps.main     ? customClassProps.main     : 'grid grid-cols-12 py-5 px-4',
      colLeft:  customClassProps.colLeft  ? customClassProps.colLeft  : 'col-span-12 xs:col-span-2 xl:col-span-1 mx-auto',
      colRight: customClassProps.colRight ? customClassProps.colRight : 'col-span-12 xs:col-span-10 xl:col-span-11',
      icon:     customClassProps.icon     ? customClassProps.icon     : 'w-12 h-12 rounded-full bg-[#2E8567] align-middle justify-center content-center items-center m-0 min-w-[48px] mb-2',
      button:   customClassProps.button   ? customClassProps.button   : 'h-auto'
    })
    
  },[customClassProps]);




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
                   {`Arrastra y suelta ${maxFiles <= 1 ? 'tu archivo' : 'tus archivos'} aquí (máximo ${maxFiles})`} 
                  </Text>
                  <Text className="text-neutral-40 mb-4">
                    {`o presiona el siguiente botón para ${maxFiles <= 1 ? 'seleccionar' : 'seleccionarlos'}`}
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

      {dataFiles.length > 0 && files.length > 0 && archivosCargados.length > 0 && (
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
                      files.filter(fileItem => fileItem.name !== file.name)
                    );
                    setDataFiles(
                      files.filter(fileItem => fileItem.name !== file.name)
                    );
                  }}
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

      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={() => setEditingFile({})}
        maxWidth={'md'}
      >
        <DialogContent className="p-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-7">
              <img src={editingFile.preview} alt="preview" />
            </div>
            <div className="col-span-5">
              <Heading type="h3" className="mb-8">
                Editar documento
              </Heading>

              <InputComponent
                name="nombreArchivo"
                className="mb-8"
                value={editingFile.name}
                fullWidth
                label={<LabelComponent>Nombre del archivo</LabelComponent>}
              />

              <div className="mt-5">
                <ButtonComponent onClick={() => {}} className="mr-2">
                  Actualizar
                </ButtonComponent>
                <ButtonComponent
                  type="secondary"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Cancelar
                </ButtonComponent>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DropzoneOutFiles;
