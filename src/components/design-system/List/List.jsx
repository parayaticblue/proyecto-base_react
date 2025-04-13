import React from 'react';
import styles from './list.module.css';
import { List } from '@mui/material';

const ListComponent = (props) => {
  const { children, ...rest } = props;

  return(
    <List 
      className={styles.root}
      {...rest}
    >
      {children}
    </List>
  )
};

export default ListComponent;