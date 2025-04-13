import { Document, Page, pdfjs } from 'react-pdf';
import styles from './fileviewer.module.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const FileViewer = ({ file, fullDisplay }) => {
  if (!file) return null;
  if (!file.base64) return null;
  if (!file.tipoArchivo) return null;

  const fileURL = file.base64.includes('data:')
    ? file.base64
    : `data:${file.tipoArchivo};base64,${file.base64}`;

  return (
    <div className={styles.fileContainer}>
      {file.tipoArchivo?.includes('pdf') ? (
        <Document
          file={fileURL}
          className={'w-full h-auto'}
          loading="Cargando..."
        >
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={1}
            className="w-full h-auto"
          />
        </Document>
      ) : (
        <div
          className={`
            ${fullDisplay ? styles.fullDisplay : styles.thumbnailInner}
          `}
          style={{ backgroundImage: `url(${fileURL})` }}
        >
          {fullDisplay && (
            <img src={fileURL} alt={file.nombreArchivo} className="w-full" />
          )}
        </div>
      )}
    </div>
  );
};
