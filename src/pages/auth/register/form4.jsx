import React from 'react';
import { TextField, Box, Typography, Button, IconButton } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { darkBrown } from '../../../util/colors';
import Prev_nxtBtn from '../../../components/button/prev_nxtBtn';
import { useFormContext } from '../../../context/registerFormContext';

const Form4 = ({ onNext, onPrev }) => {

  // Use form context to save data
  const { value, setValue } = useFormContext();

  // Initial form values
  const initialValues = {
    phoneNumber: value.phoneNumber ? value.phoneNumber : '',
    whatsappNumber: value.whatsappNumber ? value.whatsappNumber : '',
    socialLinks: value.socialLinks ? value.socialLinks : [''],
  };

  // Validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number')
      .required('Phone number is required'),
    whatsappNumber: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, 'Invalid WhatsApp number'),
    socialLinks: Yup.array().of(
      Yup.string().url('Invalid URL').notRequired()
    ),
  });

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
          <div className={`lg:w-[80%] w-full flex flex-col bg-[#f9f9f9] border-[${darkBrown}] rounded-xl border shadow-xl h-fit mt-5 lg:mt-10 p-2 justify-center items-center`}>
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
              Contact Information
            </Typography>
            <Box className="w-full max-w-md space-y-6 mt-2">
              {/* Phone Number Field */}
              <TextField
                fullWidth
                label="Phone Number*"
                name="phoneNumber"
                variant="outlined"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                className="bg-transparent rounded"
              />

              {/* WhatsApp Number Field */}
              <TextField
                fullWidth
                label="WhatsApp Number"
                name="whatsappNumber"
                variant="outlined"
                value={formik.values.whatsappNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.whatsappNumber && Boolean(formik.errors.whatsappNumber)}
                helperText={formik.touched.whatsappNumber && formik.errors.whatsappNumber}
                className="bg-transparent rounded"
              />

              {/* Social Links Field Array */}
              <FieldArray name="socialLinks">
                {({ push, remove }) => (
                  <div>
                    {formik.values.socialLinks.map((link, index) => (
                      <Box key={index} className="flex items-center space-x-2 mb-4">
                        <TextField
                          fullWidth
                          label={`Social Link ${index + 1}`}
                          name={`socialLinks[${index}]`}
                          variant="outlined"
                          value={formik.values.socialLinks[index]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.socialLinks?.[index] &&
                            Boolean(formik.errors.socialLinks?.[index])
                          }
                          helperText={
                            formik.touched.socialLinks?.[index] &&
                            formik.errors.socialLinks?.[index]
                          }
                          className="bg-transparent rounded"
                          placeholder="e.g., https://facebook.com/yourprofile"
                        />
                        <IconButton
                          color="secondary"
                          onClick={() => remove(index)}
                          disabled={formik.values.socialLinks.length === 1}
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="outlined"
                      color={darkBrown}
                      startIcon={<AddCircleIcon />}
                      onClick={() => push('')}
                    >
                      Add Social Link
                    </Button>
                  </div>
                )}
              </FieldArray>
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

export default Form4;
