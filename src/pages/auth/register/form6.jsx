import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Form6 = ({ onNext, onPrev }) => {
  // Initial form values
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  // Validation schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form Values:', values);
        onNext(values);
      }}
    >
      {(formik) => (
        <Form>
          <div className="w-full h-screen flex justify-center items-center px-4 lg:px-20 bg-transparent">
            <div className="w-4/5 h-fit border-4 rounded-lg p-5 flex flex-col items-center -mt-20 border-gray-500">
              <Typography variant="h5" className="mb-10 text-gray-800 font-bold">
                Set Your Password
              </Typography>
              <Box className="w-full max-w-md space-y-6 mt-5">
                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password*"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                {/* Confirm Password Field */}
                <TextField
                  fullWidth
                  label="Confirm Password*"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                  }
                />
              </Box>

              <Box className="flex w-full justify-between mt-6 px-4">
                <Button variant="outlined" onClick={onPrev}>
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  endIcon={<ArrowForwardIcon />}
                >
                  Register
                </Button>
              </Box>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form6;