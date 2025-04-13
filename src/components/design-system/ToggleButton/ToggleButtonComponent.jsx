import FilterList from "@mui/icons-material/FilterList";
import { ToggleButton } from "@mui/material";
import styles from './toggle.module.css';

export const ToggleButtonComponent = ({
  isActive,
  nombre,
  posicion,
  disabled,
  ...rest
}) => {
  return(
    <ToggleButton 
      {...rest}
      className={`
        ${styles.root} 
        ${isActive ? styles.rootActive : styles.rootBase} 
        ${posicion ? styles[posicion] : '' }
        ${disabled ? styles.disabled : '' }
      `}
      value={nombre} 
      aria-label={nombre}
      type="toggle"
      disabled={disabled}
    >
      <span className="capitalize">{nombre}</span>
      <FilterList className={`ml-2 text-base ${isActive ? 'rotate-180' : ''}`} />
    </ToggleButton>
  )
};