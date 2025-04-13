import React from 'react';
import styles from './../Autocomplete/autocomplete.module.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 *
 * @param options object {value: any, name: string }
 * @returns
 */
const SelectComponent = props => {
  const { options, disabled, label, children, styleOpt, ...rest } = props;

  return (
    <>
      <div
        className={`
        ${styles.root}
        ui-uv-select
      `}
      >
        {label}
        <Select
          classes={{
            popper: styles.popper,
            listbox: styles.listbox,
            option: styles.option,
            paper: styles.paper,
            notchedOutline: styles.outline
          }}
          disabled={disabled ? disabled : false}
          size="small"
          {...rest}
        >
          {options.map(item => (
            <MenuItem
              value={item.value}
              key={item.value}
              style={styleOpt ? styleOpt : {}}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
};

export default SelectComponent;
