import { Tooltip } from '@mui/material';
import styles from './tooltip.module.css';

export const TooltipComponent = props => {
  const { children, className, title, ...rest } = props;

  return (
    <Tooltip
      classes={{
        tooltip: styles.tooltip
      }}
      className={className}
      style={{
        marginLeft: '5px'
      }}
      title={title}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

/* 
  <HelpOutline
    color="primary"
    fontSize="small"
  /> 
*/
