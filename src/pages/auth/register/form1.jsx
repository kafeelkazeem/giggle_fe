import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { darkBrown } from '../../../util/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFormContext } from '../../../context/registerFormContext';

const Form1 = ({ onNext }) => {
  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    bio: '',
  };

  const { value, setValue } = useFormContext();

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    bio: Yup.string(),
  });

  // Form submission handler
  const handleSubmit = (values) => {
    setValue((prev) => ({ ...prev, ...values })); // Merge values with existing context state
    console.log(value)
    onNext(); // Move to the next page
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="w-full h-screen flex justify-center items-center px-4 lg:px-20 bg-transparent">
            <div
              className={`w-4/5 h-fit border-4 rounded-lg p-5 flex justify-start items-center flex-col -mt-20 border-[${darkBrown}]`}
            >
              <Typography variant="h5" className="mb-10 text-gray-800 font-bold">
                Personal Details
              </Typography>
              <Box className="w-full max-w-md space-y-6 mt-5">
                {/* Full Name Field */}
                <TextField
                  fullWidth
                  label="Full Name*"
                  name="fullName"
                  variant="outlined"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  className="bg-transparent rounded"
                />
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email*"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  className="bg-transparent rounded"
                />
                {/* Bio Field */}
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  variant="outlined"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                  className="bg-transparent rounded"
                  placeholder="I am an experienced electrician with 10+ years of experience. I provide ......"
                  multiline
                  rows={4}
                />
              </Box>
              <div className="w-full flex justify-end p-2 px-6">
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={`px-6 py-2 bg-[${darkBrown}] text-white rounded`}
                >
                  <ArrowForwardIcon />
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form1;
