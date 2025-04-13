import { DICTONARY } from 'const/Dictonary';
import React from 'react';
import styles from './text.module.css';

/**
 *
 * @param type 'p' 'label' 'span'
 * @param size 'L', 'M', 'S'
 * @returns
 */
const Text = props => {
  const { type = 'p', size, className, children, ...rest } = props;
  const sizeTag = size ? size.toUpperCase() : DICTONARY.TEXT.SIZE_DEFAULT;

  return (
    <p
      className={`
        ${styles[type]}
        ${styles[sizeTag]}
        ${className ? className : ''}
      `}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Text;
