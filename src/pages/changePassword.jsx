import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppBar2 from '../components/appBar/appBar2';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff, Lock, LockOpen } from '@mui/icons-material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { ApiUrl } from '../util/apiUrl';
import { toast, ToastContainer } from 'react-toastify';

const ChangePassword = () => {
    const token = localStorage.getItem('token')
    const { user } = useAuth();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(5, 'Password must be at least 5 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                const response = await axios.put(`${ApiUrl}/changeTechnicianPassword`, {
                    currentPassword: values.oldPassword,
                    newPassword: values.newPassword,
                }, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                toast.success(response.data.message || 'Password changed successfully!');
                resetForm();
            } catch (error) {
                console.log(error)
                toast.error('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
    });

    if (!user) {
        return <h2>Please log in to access this page.</h2>;
    }

    return (
        <div>
            <ToastContainer />
            <AppBar2 />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="#f5f5f5"
            >
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        p: 4,
                        bgcolor: 'white',
                        boxShadow: 3,
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Change Password
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Old Password"
                        type={showOldPassword ? 'text' : 'password'}
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        edge="end"
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpen />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpen />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isLoading ? 'Changing...' : 'Change Password'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default ChangePassword;
