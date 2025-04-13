import { FiletypeComponent } from '../FileType/Filetype';
import IconButtonComponent from '../IconButton/IconButton';
import Close from '@mui/icons-material/Close';
import Text from '../Text/Text';
import styles from './filethumb.module.css';
import { FileDownload, ZoomIn } from '@mui/icons-material';
import { FileViewer } from '../FileViewer/FileViewer';

/**
 *
 * @param file {object} { name: 'hi', preview: 'URL', type: 'image/jpg'  }
 * @param onRemove función que se ejecuta y despliega botón de eliminado
 * @param onEdit función que se ejecuta y despliega botón de edición
 * @param onPreview función que se ejecuta y despliega botón de ver más
 * @returns
 */
export const FilethumbComponent = ({
  file,
  enablePreviewFile = true,
  onRemove,
  onEdit,
  onPreview,
  onDownload,
  children,
  disabled = false,
  ...rest
}) => {
  if (!file) return null;

  return (
    <div className="col-span-1">
      <div className="w-40">
        <div className={styles.thumbnail}>
          <div className={styles.thumbnailInner}>
            {onRemove && (
              <div className="absolute right-1 top-1 shadow-md rounded-full bg-white z-20">
                <IconButtonComponent
                  size="small"
                  disabled={disabled}
                  type="error"
                  onClick={() => onRemove(file)}
                >
                  <Close />
                </IconButtonComponent>
              </div>
            )}
            <div className="absolute w-full h-full items-center flex justify-center z-10 gap-4">
              {onEdit && (
                <IconButtonComponent
                  disabled={disabled}
                  size="small"
                  type="secondary"
                  onClick={() => onEdit(file)}
                >
                  <ZoomIn />
                </IconButtonComponent>
              )}

              {onDownload && (
                <IconButtonComponent
                  disabled={disabled}
                  size="small"
                  type="secondary"
                  onClick={() => onDownload(file)}
                >
                  <FileDownload />
                </IconButtonComponent>
              )}
            </div>

            <div className="z-0 mb-2">
              <FileViewer file={file} />
            </div>
          </div>
        </div>
        <div className="flex">
          <FiletypeComponent type={file.tipoArchivo} />
          <Text className="truncate ...">{file.nombreArchivo}</Text>
        </div>
      </div>
    </div>
  );
};
