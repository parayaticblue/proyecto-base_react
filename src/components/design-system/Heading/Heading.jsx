import { DICTONARY } from 'const/Dictonary';
import React from 'react';
import styles from './heading.module.css';

/**
 * Heading
 * @param type 'h1' 'h2' 'h3' 'h4' 'h5'
 * @param className tailwind className
 */
const Heading = ({
  disabled = false,
  type = DICTONARY.HEADING.SIZE_DEFAULT,
  className,
  children,
  ...rest
}) => {

  const TagName = type ? type.toLowerCase() : 'h1';

  return(
    <TagName 
    className={`
      ${className ? className : "" }
      ${styles[TagName]}
      ${disabled ? styles.disabled : null }
    `}
    {...rest}>
    {children}
  </TagName>
  )
};

export default Heading;