import { Tabs } from '@mui/material';
import styles from './tabs.module.css';

const TabsComponent = props => {
  const { children, ...rest } = props;

  return (
    <Tabs
      {...rest}
      classes={{
        indicator: styles.indicator
      }}
    >
      {children}
    </Tabs>
  );
};

export default TabsComponent;
