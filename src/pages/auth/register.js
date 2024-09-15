import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Business, Email, Phone, Home, Visibility, VisibilityOff, Lock } from '@mui/icons-material';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serviceCategory, setServiceCategory] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleServiceCategoryChange = (event) => {
    setServiceCategory(event.target.value);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-fit p-5 flex flex-col overflow-hidden bg-white rounded-md shadow-md gap-4">
        <h1 className="text-2xl lg:text-4xl tracking-wide text-left font-bold">Register</h1>
        <div className="w-full flex flex-row gap-5">
          <TextField
            fullWidth
            label="Business name"
            placeholder="Business name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="service-category-label">Select a service category</InputLabel>
          <Select
            labelId="service-category-label"
            value={serviceCategory}
            onChange={handleServiceCategoryChange}
            label="Select a service category"
            variant="outlined"
          >
            <MenuItem value="carpenter">Carpenter</MenuItem>
            <MenuItem value="painter">Painter</MenuItem>
            <MenuItem value="electrician">Electrician</MenuItem>
            <MenuItem value="tailor">Tailor</MenuItem>
            <MenuItem value="plumber">Plumber</MenuItem>
          </Select>
        </FormControl>
        <div className="flex flex-row w-full gap-5">
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Phone Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="State"
            placeholder="State"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <TextField
          fullWidth
          label="Address"
          placeholder="Enter your address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <div className="w-full flex flex-row gap-5">
          <TextField
            fullWidth
            label="Password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700"
          >
            Create account
          </button>
        </div>
        <div className="text-center">
          <p className="text-base text-gray-600">
            Already have an account? <a href="#" className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
