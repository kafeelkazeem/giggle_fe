import React from 'react';
import { TextField, Box, Typography, Button, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { darkBrown } from '../../../util/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Prev_nxtBtn from '../../../components/button/prev_nxtBtn';

const Form3 = ({ onNext, onPrev }) => {
  // Initial form values
  const initialValues = {
    address: '',
    state: '',
  };

  // Validation schema
  const validationSchema = Yup.object({
    address: Yup.string()
      .min(5, 'Address should be at least 5 characters')
      .required('Address is required'),
    state: Yup.string(),
  });

  // List of Nigerian states
  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT',
  ];

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
            <div
              className={`w-4/5 h-fit border-4 rounded-lg p-5 flex justify-start items-center flex-col -mt-20 border-[${darkBrown}]`}
            >
              <Typography variant="h5" className="mb-10 text-gray-800 font-bold">
                Address Information
              </Typography>
              <Box className="w-full max-w-md space-y-6 mt-5">
                {/* Address Field */}
                <TextField
                  fullWidth
                  label="Address*"
                  name="address"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  className="bg-transparent rounded"
                  multiline
                  rows={2}
                  placeholder="Enter your full address"
                />

                {/* State Field */}
                <TextField
                  select
                  fullWidth
                  label="State"
                  name="state"
                  variant="outlined"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  className="bg-transparent rounded"
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Prev_nxtBtn onNext={onNext} onPrev={onPrev} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form3;
