import React, { useState, useEffect } from 'react';
import AppBar2 from '../components/appBar/appBar2';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Switch, FormControlLabel, TextField, Button, CircularProgress, Skeleton } from '@mui/material';
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
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);
    const [availability, setAvailability] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchAvailability = async () => {
            setFetching(true);
            try {
                const response = await axios.get(`${ApiUrl}/getAvailaibility`, {
                    headers: { Authorization: `${token}` },
                });

                if (response.data.availability) {
                    setAvailability(response.data.availability);
                }
            } catch (error) {
                toast.error('An error occurred while fetching availability');
            } finally {
                setFetching(false);
            }
        };

        fetchAvailability();
    }, [token]);

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

        try {
            await axios.put(`${ApiUrl}/updateAvalaibility`, payload, {
                headers: { Authorization: `${token}` },
            });
            toast.success('Updated');
        } catch (error) {
            console.error('Error updating availability:', error);
            toast.error('Failed to update availability settings.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <h2>Please log in to access this page.</h2>;
    }

    return (
        <div>
            <AppBar2 />
            <ToastContainer />
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5" pt={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {fetching ? (
                        <Box className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-md gap-6">
                            <Skeleton variant="text" width="60%" height={30} />
                            <Skeleton variant="rectangular" width="100%" height={40} />
                            <Skeleton variant="rectangular" width="100%" height={40} />
                            <Skeleton variant="rectangular" width="100%" height={40} />
                            <Skeleton variant="rectangular" width="50%" height={40} />
                        </Box>
                    ) : (
                        <Formik
                            initialValues={{
                                isAvailable: availability?.isAvailable || false,
                                startTime: availability?.hours?.start
                                    ? dayjs(availability.hours.start)
                                    : dayjs().hour(8).minute(0),
                                endTime: availability?.hours?.end
                                    ? dayjs(availability.hours.end)
                                    : dayjs().hour(16).minute(0),
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                            enableReinitialize
                        >
                            {(formik) => (
                                <Form className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-md gap-6">
                                    <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
                                        Update Availability
                                    </Typography>

                                    {/* Availability Toggle */}
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formik.values.isAvailable}
                                                onChange={(e) => formik.setFieldValue('isAvailable', e.target.checked)}
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
                                                margin="normal"
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
                                                margin="normal"
                                                error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                                                helperText={formik.touched.endTime && formik.errors.endTime}
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
                                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                </LocalizationProvider>
            </Box>
        </div>
    );
};

export default Availability;
