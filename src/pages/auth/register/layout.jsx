import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Container, ThemeProvider, createTheme } from '@mui/material';
import { Stack } from '@mui/material';
import Form1 from './form1';
import Form2 from './form2';
import Form3 from './form3';
import Form4 from './form4';
import Form5 from './form5';
import Form6 from './form6';
import { GlobalProvider } from '../../../context/registerFormContext';
import { darkBrown } from '../../../util/colors';
import ApBar from '../../../components/appBar';

const theme = createTheme({
  palette: {
    primary: {
      main: darkBrown, // Set the main primary color to darkBrown
    },
  },
  components: {
    // Customizing the Stepper component to use the primary color
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // Optionally, set a transparent background
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: darkBrown, // Change the label color to darkBrown
        },
      },
    },
  },
});

const StepperPage = () => {
  const [activeStep, setActiveStep] = useState(0); // Tracks the current step of the stepper

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to the next step
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // Move to the previous step
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form1 onNext={handleNext} />;
      case 1:
        return <Form2 onNext={handleNext} onPrev={handleBack} />;
      case 2:
        return <Form3 onNext={handleNext} onPrev={handleBack} />;
      case 3:
        return <Form4 onNext={handleNext} onPrev={handleBack} />;
      case 4:
        return <Form5 onNext={handleNext} onPrev={handleBack} />;
      case 5:
        return <Form6 onPrev={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="flex justify-center">
      <Container>
        <ThemeProvider theme={theme}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel><p className='hidden lg:block'>Personal Details</p></StepLabel>
            </Step>
            <Step>
              <StepLabel><p className='hidden lg:block'>Business Info</p></StepLabel>
            </Step>
            <Step>
              <StepLabel><p className='hidden lg:block'>Location</p></StepLabel>
            </Step>
            <Step>
              <StepLabel><p className='hidden lg:block'>Contact/Socials</p></StepLabel>
            </Step>
            <Step>
              <StepLabel><p className='hidden lg:block'>Availability</p></StepLabel>
            </Step>
            <Step>
              <StepLabel><p className='hidden lg:block'>Password</p></StepLabel>
            </Step>
          </Stepper>
        </ThemeProvider>
        <GlobalProvider>
          <Container maxWidth="none" className="h-fit flex flex-col">
            {getStepContent(activeStep)}
          </Container>
        </GlobalProvider>
      </Container>
    </div>
  );
};

const S = () => {
  return (
    <div>
      <ApBar />
      <Container maxWidth="none" className="h-fit flex flex-col justify-between overflow-hidden w-full bg-white">
        <Stack mt={3} spacing={4}>
          <StepperPage />
        </Stack>
      </Container>
    </div>
  );
};

export default S;
