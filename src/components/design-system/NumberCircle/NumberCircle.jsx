
import { Avatar } from '@mui/material';

const NumberCircleComponent = ({ 
  numero = 0,
  className,
  style,
  variant,
  ...rest

}) => {
  return (
    <Avatar
      className={className}
      style={style}
      variant={variant || 'circular'}
      {...rest}
    >
      {numero}
    </Avatar>
  );
};

export default NumberCircleComponent;
