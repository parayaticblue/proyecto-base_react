import React from 'react';
import styles from './icon.module.css';

/**
 * IconComponent
 * @param color 'primary' 'secondary' 'terciary' 'default' 'black' 'white
 * @param className tailwind className
 */
const IconComponent = props => {
  const { icon, color, className, children, ...rest } = props;
  const colorStyle = color ? color.toLowerCase() : 'default';

  return (
    <span
      className={`text-center 
        ${className ? className : ''}
        ${styles[colorStyle]}
    `}
      {...rest}
    >
      {children}
    </span>
  );
};

export default IconComponent;
