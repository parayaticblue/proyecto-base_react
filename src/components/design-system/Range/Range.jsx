import { Slider } from "@mui/material"
import styles from './range.module.css';

export const Range = (
  props
) => {

  return(
    <Slider
      classes={{
        root:   styles.root,
        marked: styles.marked,
        mark:  styles.mark,
        rail:  styles.rail,
        markLabel: styles.markLabel,
        valueLabel: styles.valueLabel,
        thumb:      styles.thumb
      }}
      {...props}
    />
  )
}