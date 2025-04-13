import React, { createRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ButtonComponent from '../Button/Button';
import { Upload } from '@mui/icons-material';
import { getBase64 } from 'utils';
import Text from '../Text/Text';
import { FiletypeComponent } from '../FileType/Filetype';

export const FileUploadComponent = ({
  accept,
  maxFiles = 1,
  maxSize = 4194304,
  disabled = false,
  multiple,
  dataFiles,
  setDataFiles,
  children
}) => {
  /* const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true
  }); */

  const [files, setFiles] = useState([]);
  const [errorRejected, setErrorRejected] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: multiple === undefined ? true : multiple,
    noClick: true,
    noKeyboard: true,
    accept: accept,

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

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    const fetchDataFiles = async () => {
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
      setDataFiles(dataFiles);
    };

    fetchDataFiles();
  }, [files]);

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <ButtonComponent className="min-w-max" onClick={open}>
          {children}
        </ButtonComponent>
        {dataFiles &&
          dataFiles.length > 0 &&
          dataFiles.map((file, index) => (
            <div className="flex mt-2" key={index}>
              <FiletypeComponent type={file.type || file.tipoArchivo} />
              <Text className="truncate ...">{file.nombreArchivo}</Text>
            </div>
          ))}
      </div>
    </div>
  );
};
