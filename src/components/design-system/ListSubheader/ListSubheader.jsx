import React from 'react';
import styles from './listsubheader.module.css';
import { ListSubheader } from '@mui/material'

const ListSubheaderComponent = (props) => {
  const { children, className, ...rest } = props;

  return (
    <ListSubheader
      disableSticky={true}
      className={styles.root + ' ' + className}
      {...rest}
    >
      {children}
    </ListSubheader>
  )
};

export default ListSubheaderComponent;