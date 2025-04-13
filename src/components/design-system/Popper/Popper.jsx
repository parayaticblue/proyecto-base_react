import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { Fade } from '@mui/material';
import { Close } from '@mui/icons-material';
import IconButtonComponent from '../IconButton/IconButton';

export const PopperComponent = ({ Button, children, showCloseButton }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const displayCloseButton = showCloseButton ? true : false;

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div ref={anchorRef}>
        <div onClick={handleToggle} className="p-0 !rounded">
          {Button}
        </div>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement={'bottom'}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <div className="loginPopUp">
                    <div className="relative">
                      {children}
                      {displayCloseButton && (
                        <div className="absolute right-2 top-0">
                          <IconButtonComponent
                            onClick={handleClose}
                            size="small"
                            type="neutral"
                          >
                            <Close />
                          </IconButtonComponent>
                        </div>
                      )}
                    </div>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
