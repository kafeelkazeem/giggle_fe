import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFormContext } from '../../../context/registerFormContext';
import axios from 'axios';
import { ApiUrl } from '../../../util/apiUrl';
import { darkBrown } from '../../../util/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Form6 = ({ onPrev }) => {
  const { value, setValue } = useFormContext();
  const [loading, setLoading] = useState(false); // Loading state

  // Initial form values
  const initialValues = {
    password: value.password ? value.password : '',
    confirmPassword: value.confirmPassword ? value.confirmPassword : '',
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

  // Form submission handler
  const handleSubmit = async (values) => {
    setLoading(true); // Start loading
    try {
      await setValue((prev) => ({ ...prev, ...values }));

      const updatedValues = { ...value, ...values };

      await axios.post(`${ApiUrl}/registerTechnician`, updatedValues);

      alert('Submitted');
    } catch (error) {
      alert('An error occurred');
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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

            <Box className="flex w-full justify-between mt-6 lg:px-4 px-1">
              <Button variant="outlined" sx={{color: darkBrown, borderColor: darkBrown}} onClick={onPrev} startIcon={<ArrowBackIcon />} disabled={loading}>
                Back
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Submitting...' : 'Register'}
              </Button>
            </Box>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form6;
