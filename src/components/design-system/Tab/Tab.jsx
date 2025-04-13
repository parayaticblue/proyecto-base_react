import { Tab } from '@mui/material';
import styles from './tab.module.css';

const TabComponent = props => {
  const { label, selected, ...rest } = props;

  return (
    <Tab
      label={label}
      className={selected ? styles.selected : styles.unselected}
      {...rest}
    />
  );
};

export default TabComponent;
