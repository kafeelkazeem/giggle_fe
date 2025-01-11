import React from 'react';
import { TextField, Box, Typography, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { darkBrown } from '../../../util/colors';
import Prev_nxtBtn from '../../../components/button/prev_nxtBtn';
import { useFormContext } from '../../../context/registerFormContext';

const Form3 = ({ onNext, onPrev }) => {

  // Use form context to save data
  const { value, setValue } = useFormContext();

  // Initial form values
  const initialValues = {
    address: value.address ? value.address : '',
    state: value.state ? value.state : '',
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
      initialValues={{ ...initialValues, ...value }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setValue((prev) => ({ ...prev, ...values })); // Save current form data to context
        onNext(); // Navigate to the next page
      }}
    >
      {(formik) => (
        <Form className="flex justify-center items-center">
          <div className={`lg:w-[80%] w-full flex flex-col bg-[#f9f9f9] border-[${darkBrown}] rounded-xl border-2 h-fit mt-5 lg:mt-10 p-2 justify-center items-center`}>
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

            {/* Navigation Buttons */}
            <Prev_nxtBtn
              onNext={formik.handleSubmit} // Trigger form submission before moving to the next page
              onPrev={onPrev} // Navigate to the previous page
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form3;
