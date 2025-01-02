import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Container, ThemeProvider, createTheme } from '@mui/material';
import {Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { darkBrown } from '../../../util/colors';
import Form1 from './form1';
import { orange, red } from '@mui/material/colors';
import Form2 from './form2';
import Form3 from './form3';
import Form4 from './form4';
import Form5 from './form5';
import Form6 from './form6';

const theme = createTheme({
    palette: {
      primary: red, 
    },
  });

const StepperPage = () => {

    const navigate = useNavigate()
  
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step of the stepper
    
    const handleNext = () => {
      activeStep === 5 ? navigate('/') :  setActiveStep((prevActiveStep) => prevActiveStep + 1) // Move to the next step
    };
  
    const handleBack = () => {
      activeStep === 0 ? navigate('/') : setActiveStep((prevActiveStep) => prevActiveStep - 1); // Move to the previous step
    };

    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return <Form1 onNext={handleNext}/>;
        case 1:
          return <Form2 onNext={handleNext} onPrev={handleBack} />;
        case 2:
          return <Form3 onNext={handleNext} onPrev={handleBack} />;
        case 3:
          return <Form4 onNext={handleNext} onPrev={handleBack} />;
        case 4:
          return <Form5 onNext={handleNext} onPrev={handleBack} />;
        case 5:
          return <Form6 onNext={handleNext} onPrev={handleBack} />;
        default:
          return 'Unknown step';
      }
    };
  
    return (
      <>
      <div className='flex justify-center mt-7'>
      <Container>
        <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel><p>Personal Details</p></StepLabel>
          </Step>
          <Step>
            <StepLabel>Business Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Location</StepLabel>
          </Step>
          <Step>
            <StepLabel>Contact/Socials</StepLabel>
          </Step>
          <Step>
            <StepLabel>Availability</StepLabel>
          </Step>
          <Step>
            <StepLabel><p>Password</p></StepLabel>
          </Step>
        </Stepper>
        </ThemeProvider>
        <Container maxWidth="none" className='min-h-[60vh] flex flex-col'>
          {getStepContent(activeStep)}
        </Container>
      </Container>
      </div>
      </>
    );
  };

const S = () => { 
  return (
    <Container maxWidth="none" className='min-h-[80vh] flex flex-col justify-between overflow-hidden w-full h-screen bg-white'>
        <Stack mt={3} spacing={4}>
          <StepperPage />
        </Stack>    
    </Container>
  )
}

export default S