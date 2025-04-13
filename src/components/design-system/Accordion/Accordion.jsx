import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import IconButtonComponent from '../IconButton/IconButton';

const AccordionComponent = ({
  direction,
  previewContent,
  className,
  children
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`
      flex
      ${direction === 'col' ? 'flex-col' : 'flex-row'}
    `}
    >
      <div className="mr-2 mb-2">
        <IconButtonComponent
          size="small"
          type="neutral"
          className={className}
          onClick={handleChange}
        >
          {expanded ? (
            <ExpandLess className="text-uv-secondary-0" />
          ) : (
            <ExpandMore className="text-uv-secondary-0" />
          )}
        </IconButtonComponent>
      </div>
      <div>{expanded ? children : previewContent}</div>
    </div>
  );
};

export default AccordionComponent;
