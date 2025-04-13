import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';
import styles from './stepper.module.css';

const StepperComponent = ({
  activeStep,
  steps
}) => {

  return(
    <Stepper 
      activeStep={activeStep} 
      orientation="vertical"
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            optional={
              index === 4 ? (
                <Text size="s">Opcional</Text>
              ) : null
            }
            StepIconComponent={QontoStepIcon}
            className={"m-0 py-1"}
          >
            <Heading 
              type="h5" 
              className={`
              ${activeStep < index ? 'opacity-50' : 'opacity-100'} mb-0 text-uv-primary-0`}
            >{step.label}</Heading>
            
          </StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

export default StepperComponent;


function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <div className={`${styles.root} ${active ? styles.active : ''}`}>
      {completed ? (
        <div className={styles.completed}>
          <svg width="16" height="10" viewBox="0 0 14 10">
            <defs>
              <clipPath id="clip-check-small">
                <rect width="14" height="10"/>
              </clipPath>
            </defs>
            <g id="check-small" clipPath="url(#clip-check-small)">
              <path id="Trazado_1302" data-name="Trazado 1302" d="M4.983,8.28,0,3.3l1.61-1.61,3.373,3.3L9.967,0l1.61,1.61Z" transform="translate(1.212 0.859)" fill="#fff"/>
            </g>
        </svg>
        </div>
      ) : (
        <div className={styles.circle} />
      )}
    </div>
  );
}