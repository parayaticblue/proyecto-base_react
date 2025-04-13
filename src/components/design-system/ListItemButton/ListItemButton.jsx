import React from 'react';
import styles from './listitembutton.module.css';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { DICTONARY } from 'const/Dictonary';

const ListItemButtonComponent = props => {
  const { nivel, icon, label, children, type = 'primary', ...rest } = props;

  return (
    <ListItemButton
      className={`
        ${
          nivel === DICTONARY.LIST.SECONDARY_LEVEL
            ? `${styles.root} ${styles.rootLevelTwo}`
            : styles.root
        }
        ${type === 'primary' ? styles.rootPrimary : styles.rootSecondary}
      `}
      {...rest}
    >
      {nivel === DICTONARY.LIST.SECONDARY_LEVEL ? (
        <ListItemText className={styles.itemTextLevelTwo}>
          <span className={styles.itemTextLevelTwo}>{label}</span>
        </ListItemText>
      ) : (
        <>
          <ListItemIcon className={styles.icon}>{icon}</ListItemIcon>

          <ListItemText
            className={`
              ${styles.itemText}
              ${
                type === 'primary'
                  ? styles.itemTextPrimary
                  : styles.itemTextSecondary
              }
            `}
          >
            <span className={styles.itemText}>{label}</span>
          </ListItemText>
        </>
      )}

      {children}
    </ListItemButton>
  );
};

export default ListItemButtonComponent;
