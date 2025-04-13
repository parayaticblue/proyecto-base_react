import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './button.module.css';

/**
 * ButtonComponent
 * @param type 'primary' 'secondary' 'ghost'
 * @param className tailwind className
 */
const ButtonComponent = props => {
  const {
    buttonType,
    type,
    children,
    className,
    isLoading = false,
    disabled = false,
    ...rest
  } = props;
  const typeTag = type ? type : 'primary';
  const buttonTypeTag = buttonType ? buttonType : 'button';

  return (
    <Button
      className={`
        ${styles[typeTag]}
        ${className ? className : ''}
        ${isLoading ? styles.isLoading : ''}
        ${disabled ? styles.disabled : ''}
      `}
      type={buttonTypeTag}
      variant="contained"
      {...rest}
      disabled={disabled}
    >
      {isLoading ? (
        <CircularProgress thickness={6} size={24} className="text-white mr-2" />
      ) : null}
      {children}
    </Button>
  );
};

export default ButtonComponent;
