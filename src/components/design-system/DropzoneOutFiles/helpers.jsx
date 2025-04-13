export const getBase64 = file => {
  return new Promise((resolve, rejectede) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      rejectede(error);
    };
  });
};

export const base64ToFile = (item, path = '', preview = '') => {
  const nombreArchivo = item.nombreArchivo;
  const contenidoBase64 = item.base64.split(',')[1];
  const tipoArchivo = item.base64.split(':')[1].split(';')[0];

  const byteArray = Uint8Array.from(atob(contenidoBase64), char => char.charCodeAt(0));
  const blob = new Blob([byteArray], { type: tipoArchivo });

  const newFile = new File([blob], nombreArchivo, {
    type: tipoArchivo,
    lastModified: new Date().getTime(),
    path,
    preview
  });

  return newFile;
};
