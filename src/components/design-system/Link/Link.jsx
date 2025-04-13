import React from 'react';
import styles from './link.module.css';
import { Link } from 'react-router-dom';

/**
 * LinkComponent
 * Componente que renderiza un <a></a> con diseño de tipo texto 'a' o tipo 'button'
 *
 * @param type 'a' 'button'
 * @param className tailwind className
 */
const LinkComponent = props => {
  const { type, className, href, children, ...rest } = props;
  const typeTag = type ? type.toLowerCase() : 'a';

  return (
    <Link
      to={href ? href : '#'}
      className={`
      ${className ? className : ''}
      ${styles[typeTag]}
    `}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
