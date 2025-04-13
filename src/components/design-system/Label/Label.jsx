import React from 'react';
import styles from './label.module.css';
import { TooltipComponent } from '../Tooltip/Tooltip';
import Help from '@mui/icons-material/Help';

/**
 *
 * @param esOpcional
 * @param tooltipText
 * @returns
 */
const LabelComponent = props => {
  const { className, esOpcional, children, tooltipText, ...rest } = props;
  const ES_OPCIONAL = esOpcional ? true : false;

  return (
    <label
      className={`
        ${className ? className : ''}
        ${styles.label}
      `}
      {...rest}
    >
      {children}{' '}
      {tooltipText && (
        <TooltipComponent className="float-right" title={tooltipText}>
          <Help className="text-uv-secondary-0" fontSize="small" />
        </TooltipComponent>
      )}
      {ES_OPCIONAL && <span className="text-uv-secondary-0">(opcional)</span>}
    </label>
  );
};

export default LabelComponent;
