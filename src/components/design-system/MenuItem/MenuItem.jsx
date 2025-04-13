import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Text from '../Text/Text';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListComponent from '../List/List';

export const MenuItemComponente = ({
  nombre,
  icono,
  subItems,
  collapsable,
  onClickBotonPadre,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        onClick={ev => (collapsable ? setOpen(!open) : onClickBotonPadre(ev))}
      >
        <ListItemIcon className="min-w-[40px]">{icono}</ListItemIcon>
        <ListItemText
          primary={
            <Text
              className="font-secondary text-uv-primary-0 tracking-wider"
              size="M"
            >
              {nombre}
            </Text>
          }
        />
        {collapsable && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
      </ListItemButton>
      {collapsable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListComponent
            disablePadding
            className="bg-neutral-90 rounded"
            {...rest}
          >
            {subItems}
          </ListComponent>
        </Collapse>
      ) : null}
    </>
  );
};
