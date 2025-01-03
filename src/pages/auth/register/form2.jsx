import React from 'react';
import { TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { darkBrown } from '../../../util/colors';
import Prev_nxtBtn from '../../../components/button/prev_nxtBtn';
import { useFormContext } from '../../../context/registerFormContext';

const Form2 = ({ onNext, onPrev }) => {
  // Initial form values
  const initialValues = {
    businessName: '',
    profession: '',
    description: '',
  };

  // Validation schema
  const validationSchema = Yup.object({
    businessName: Yup.string().required('Input your business name'),
    profession: Yup.string().required('Please select a profession'),
    description: Yup.string()
      .min(10, 'Description should be at least 10 characters')
      .required('Job description is required'),
  });

  // Professions list
  const professions = [
    'Tailor',
    'Carpenter',
    'Electrician',
    'Plumber',
    'Painter',
  ];

  // Use form context to save data
  const { value, setValue } = useFormContext();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setValue((prev) => ({ ...prev, ...values })); // Save current form data to context
        onNext(); // Navigate to the next page
      }}
    >
      {(formik) => (
        <Form>
          <div className="w-full h-screen flex justify-center items-center px-4 lg:px-20 bg-transparent">
            <div
              className={`w-4/5 h-fit border-4 rounded-lg p-5 flex justify-start items-center flex-col -mt-20 border-[${darkBrown}]`}
            >
              <Typography variant="h5" className="mb-10 text-gray-800 font-bold">
                Business Information
              </Typography>
              <Box className="w-full max-w-md space-y-6 mt-5">
                {/* Business Name Field */}
                <TextField
                  fullWidth
                  label="Business Name*"
                  name="businessName"
                  variant="outlined"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                  helperText={formik.touched.businessName && formik.errors.businessName}
                  className="bg-transparent rounded"
                />

                {/* Profession Dropdown */}
                <TextField
                  select
                  fullWidth
                  label="Profession*"
                  name="profession"
                  variant="outlined"
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.profession && Boolean(formik.errors.profession)}
                  helperText={formik.touched.profession && formik.errors.profession}
                  className="bg-transparent rounded"
                >
                  {professions.map((profession) => (
                    <MenuItem key={profession} value={profession}>
                      {profession}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Description Field */}
                <TextField
                  fullWidth
                  label="Job Description*"
                  name="description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  className="bg-transparent rounded"
                  multiline
                  rows={4}
                  placeholder="I am an experienced professional with..."
                />
              </Box>

              {/* Navigation Buttons */}
              <Prev_nxtBtn
                onNext={formik.handleSubmit} // Trigger form submission before moving to the next page
                onPrev={onPrev} // Navigate to the previous page
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form2;
