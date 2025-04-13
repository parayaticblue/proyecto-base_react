import {
  CheckCircle,
  ErrorOutline,
  Info,
  WarningAmber
} from '@mui/icons-material';
import { Alert } from '@mui/material';
import styles from './alert.module.css';

/**
 * AlertComponent
 * @param type 'info', 'error', 'warning', 'success'
 * @param className tailwind className
 * @param size 'L', 'M', 'S'
 */
const AlertComponent = ({
  type = 'info',
  className,
  size = 'L',
  children,
  ...rest
}) => {
  return (
    <Alert
      severity={type}
      classes={{
        standard: styles.base,
        standardInfo: styles.info,
        standardSuccess: styles.success,
        standardError: styles.error,
        standardWarning: styles.warning
      }}
      iconMapping={{
        success: (
          <div className={`${styles.iconBase} bg-success hidden xs:block`}>
            <CheckCircle
              className="text-success-dark"
              fontSize={getIconsSize(size)}
            />
          </div>
        ),
        error: (
          <div className={`${styles.iconBase} bg-error hidden xs:block`}>
            <ErrorOutline
              className="text-error-dark"
              fontSize={getIconsSize(size)}
            />
          </div>
        ),
        info: (
          <div className={`${styles.iconBase} bg-info hidden xs:block`}>
            <Info className="text-info-dark" fontSize={getIconsSize(size)} />
          </div>
        ),
        warning: (
          <div className={`${styles.iconBase} bg-warning hidden xs:block`}>
            <WarningAmber
              className="text-warning-dark"
              fontSize={getIconsSize(size)}
            />
          </div>
        )
      }}
      className={`${className}`}
      {...rest}
    >
      {children}
    </Alert>
  );
};

const getIconsSize = size => {
  switch (size.toUpperCase()) {
    case 'L':
      return 'large';

    case 'M':
      return 'medium';

    case 'S':
      return 'small';

    default:
      return 'large';
  }
};

export default AlertComponent;
