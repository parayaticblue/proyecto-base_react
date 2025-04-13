import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

/**
 * 
 * @param size 'medium' 'small' 
 * @returns 
 */
const CheckboxComponent = (props) => {
  const { children, size = 'medium', disabled, ...rest } = props;

  const getSize = (size) => {    
    switch (size.toLowerCase()) {
      case 'medium': return { square: 30, check: 24 }
      case 'small': return { square: 24, check: 18 }
      default: break;
    }
    return { width: 24, height: 24 };
  }

  /**
   * Se utiliza styled CSS por complejidad para acceder a sub elementos.
   */
  const BpIcon = styled('span')(({ size }) => ({
    borderRadius: 4,
    width: size.square,
    height: size.square,
    border:'3px solid #D8D9E1',
    backgroundColor: 'white',
    '.Mui-focusVisible &': {
    },
    'input:hover ~ &': {
      borderColor:'#00875A'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      borderColor: '#D8D9E1',
      opacity:'0.5',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)(({ size }) => ({
    border:'3px solid #00875A',
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: size.check,
      height: size.check,
      backgroundImage:
        "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTciIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNyAxMiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwLU1lc2FfZGVfdHJhYmFqb18zIj48cmVjdCB3aWR0aD0iMTciIGhlaWdodD0iMTIiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBpZD0iTWVzYV9kZV90cmFiYWpvXzMiIGRhdGEtbmFtZT0iTWVzYSBkZSB0cmFiYWpvIOKAkyAzIiBjbGlwLXBhdGg9InVybCgjY2xpcC1NZXNhX2RlX3RyYWJham9fMykiPjxwYXRoIGlkPSJUcmF6YWRvXzEzMDMiIGRhdGEtbmFtZT0iVHJhemFkbyAxMzAzIiBkPSJNNi41LDEwLjgsMCw0LjMsMi4xLDIuMiw2LjUsNi41LDEzLDBsMi4xLDIuMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMC43MzYpIiBmaWxsPSIjMDA4NzVhIi8+PC9nPjwvc3ZnPg==)",
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#f2f2f2',
    },
  }));

  return(
    <Checkbox 
    disabled={disabled ? true : false}
    icon={<BpIcon size={getSize(size)} />}
    checkedIcon={<BpCheckedIcon size={getSize(size)} />}
    {...rest} />
  )
}

export default CheckboxComponent;