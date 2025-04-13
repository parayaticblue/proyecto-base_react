import { FiletypeComponent } from '../../FileType/Filetype';
import IconButtonComponent from '../../IconButton/IconButton';
import Close from '@mui/icons-material/Close';
import Text from '../../Text/Text';
import styles from './filethumbFile.module.css';
import { Article } from '@mui/icons-material';

/**
 *
 * @param file {object} { name: 'hi', preview: 'URL', type: 'image/jpg'  }
 * @param onRemove función que se ejecuta y despliega botón de eliminado
 * @param onEdit función que se ejecuta y despliega botón de edición
 * @param onPreview función que se ejecuta y despliega botón de ver más
 * @returns
 */
export const FilethumbFileComponent = ({
  file,
  onRemove,
  onEdit,
  onPreview,
  onDownload,
  children,
  enablePreviewFile = true,
  disabled = false,
  ...rest
}) => {
  if (!file.type) return null;
  return (
    <div className="col-span-1">
      <div className={styles.thumbnail}>
        <div className={styles.thumbnailInner}>
          {onRemove && (
            <div className="absolute right-1 top-1 shadow-md rounded-full bg-white z-20">
              <IconButtonComponent
                size="small"
                disabled={disabled}
                type="error"
                onClick={() => {
                  onRemove(file);
                }}
              >
                <Close />
              </IconButtonComponent>
            </div>
          )}

          {enablePreviewFile ? (
            <object
              data={file.preview}
              type={file.type}
              title="preview"
              className="w-56 h-44 absolute left-0 top-0 z-10 object-cover "
            />
          ) : (
            <div>
              <Article className="text-6xl text-neutral-50" />
            </div>
          )}
        </div>

        <div className="flex align-center ">
          <FiletypeComponent type={file.type} />
          <Text className="truncate ...">{file.name}</Text>
        </div>
      </div>
    </div>
  );
};
