import { DICTONARY } from 'const/Dictonary';
import styles from './filetype.module.css';

/**
 * 
 * @param type DICTIONARY.DROPZONE.FILE_TYPES_ICONS : 'image/jpeg' 'image/png'... 
 * @returns 
 */
export const FiletypeComponent = ({
  type
}) => {
  return(
    <div className={`
      ${styles.baseFileType} 
      ${styles[DICTONARY.DROPZONE.FILE_TYPES_ICONS[type]]}
    `}>
      {DICTONARY.DROPZONE.FILE_TYPES_ICONS[type]?.toUpperCase()}
    </div>
  )
}