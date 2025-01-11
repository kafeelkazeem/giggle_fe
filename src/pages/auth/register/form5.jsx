import React from 'react';
import { Box, Typography, Switch, FormControlLabel, TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Prev_nxtBtn from '../../../components/button/prev_nxtBtn';
import { useFormContext } from '../../../context/registerFormContext';
import dayjs from 'dayjs';
import { darkBrown } from '../../../util/colors';

const Form5 = ({ onNext, onPrev }) => {
  // Use form context to save data
  const { value, setValue } = useFormContext();

  // Initial form values
  const initialValues = {
    isAvailable: value.isAvailable || false,
    startTime: value.startTime ? dayjs(value.startTime) : dayjs('2022-04-17T08:00'),
    endTime: value.endTime ? dayjs(value.endTime) : dayjs('2022-04-17T16:00'),
  };

  // Validation schema
  const validationSchema = Yup.object({
    startTime: Yup.mixed().nullable().required('Start time is required'),
    endTime: Yup.mixed()
      .nullable()
      .required('End time is required')
      .test('is-after-start', 'End time must be after start time', function (value) {
        const { startTime } = this.parent;
        return startTime && value && value.isAfter(startTime);
      }),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Format times to ISO strings before saving
          const formattedValues = {
            ...values,
            startTime: values.startTime?.toISOString(),
            endTime: values.endTime?.toISOString(),
          };

          // Save formatted values to context
          setValue((prev) => ({ ...prev, ...formattedValues }));

          // Navigate to the next page
          onNext();
        }}
      >
        {(formik) => (
          <Form className="flex justify-center items-center">
            <div className={`lg:w-[80%] w-full flex flex-col bg-[#f9f9f9] border-[${darkBrown}] rounded-xl border shadow-xl h-fit mt-3 lg:mt-10 p-2 justify-center items-center`}>
            <Typography
              variant="h3"
              className="tracking-wider"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mb: 3,
                color: darkBrown,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
                Availability
              </Typography>
              <Box className="w-full flex flex-col max-w-md space-y-6 mt-5">
                {/* Availability Toggle */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.isAvailable}
                      onChange={(e) =>
                        formik.setFieldValue('isAvailable', e.target.checked)
                      }
                      name="isAvailable"
                      color="primary"
                    />
                  }
                  label={formik.values.isAvailable ? 'Available' : 'Not Available'}
                />

                {/* Start Time Picker */}
                <MobileTimePicker
                  label="Start Time"
                  value={formik.values.startTime}
                  onChange={(newValue) => formik.setFieldValue('startTime', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                      helperText={formik.touched.startTime && formik.errors.startTime}
                    />
                  )}
                />

                {/* End Time Picker */}
                <MobileTimePicker
                  label="End Time"
                  value={formik.values.endTime}
                  onChange={(newValue) => formik.setFieldValue('endTime', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                      helperText={formik.touched.endTime && formik.errors.endTime}
                    />
                  )}
                />
              </Box>
              <Prev_nxtBtn onNext={formik.handleSubmit} onPrev={onPrev} />
            </div>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default Form5;
