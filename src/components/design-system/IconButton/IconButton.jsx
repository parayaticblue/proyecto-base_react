import React, { forwardRef } from 'react';
import { IconButton } from '@mui/material';
import styles from './iconbutton.module.css';

/**
 * IconButtonComponent
 * @param type 'primary' 'secondary' 'error'
 * @param className tailwind className
 */
const IconButtonComponent = forwardRef((props, ref) => {
  const { type, className, children, ...rest } = props;
  const typeTag = type ? type.toLowerCase() : 'primary';

  return (
    <IconButton
      ref={ref}
      className={`text-center 
        ${styles[typeTag]}
        ${className ? className : ''}
      `}
      {...rest}
    >
      {children}
    </IconButton>
  );
});

export default IconButtonComponent;
