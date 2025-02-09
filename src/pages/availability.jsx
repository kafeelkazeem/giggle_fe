import React, { useState } from 'react';
import AppBar2 from '../components/appBar/appBar2';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Switch, FormControlLabel, TextField, Button, CircularProgress } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import axios from 'axios';
import { ApiUrl } from '../util/apiUrl';
import { toast, ToastContainer } from 'react-toastify';

const Availability = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(false);

    if (!user) {
        return <h2>Please log in to access this page.</h2>;
    }

    const initialValues = {
        isAvailable: true,
        startTime: dayjs().hour(8).minute(0), // Default to 8:00 AM
        endTime: dayjs().hour(16).minute(0),  // Default to 4:00 PM
    };

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

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        const payload = {
          isAvailable: values.isAvailable,
          startTime: values.startTime.toISOString(),
          endTime: values.endTime.toISOString(),
      };
       console.log(payload.isAvailable)
        try {
            const response = await axios.put(`${ApiUrl}/updateAvalaibility`, {isAvailable: payload.isAvailable, startTime: payload.startTime, endTime: payload.endTime}, {
              headers: {
                Authorization: `${token}`,
            },
            })
            toast.success('Updated')
        } catch (error) {
            console.error('Error updating availability:', error);
            toast.error('Failed to update availability settings.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <AppBar2 />
            <ToastContainer />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="#f5f5f5"
                pt={8}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {(formik) => (
                            <Form className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-md gap-6">
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    color="primary"
                                    textAlign="center"
                                    gutterBottom
                                >
                                    Update Availability
                                </Typography>

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
                                    onChange={(newValue) =>
                                        formik.setFieldValue('startTime', newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                            error={
                                                formik.touched.startTime &&
                                                Boolean(formik.errors.startTime)
                                            }
                                            helperText={
                                                formik.touched.startTime &&
                                                formik.errors.startTime
                                            }
                                        />
                                    )}
                                />

                                {/* End Time Picker */}
                                <MobileTimePicker
                                    label="End Time"
                                    value={formik.values.endTime}
                                    onChange={(newValue) =>
                                        formik.setFieldValue('endTime', newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                            error={
                                                formik.touched.endTime &&
                                                Boolean(formik.errors.endTime)
                                            }
                                            helperText={
                                                formik.touched.endTime &&
                                                formik.errors.endTime
                                            }
                                        />
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, px: 10 }}
                                    disabled={isLoading}
                                    startIcon={
                                        isLoading && (
                                            <CircularProgress size={20} color="inherit" />
                                        )
                                    }
                                >
                                    {isLoading ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </LocalizationProvider>
            </Box>
        </div>
    );
};

export default Availability;
