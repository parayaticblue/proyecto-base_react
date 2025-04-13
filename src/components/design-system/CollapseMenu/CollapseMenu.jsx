import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import ListItemButtonComponent from '../ListItemButton/ListItemButton';

export const CollapseMenu = ({
  nombre,
  icono,
  children
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return(
    <>
      <ListItemButtonComponent
        onClick={handleClick}
        icon={icono}
        label={nombre}
      >
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonComponent>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}