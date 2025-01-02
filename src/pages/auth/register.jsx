import React, { useState } from "react";
import Img from "../../assets/imgaes/default.png";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = [
  "Personal Details",
  "Contact Details",
  "Location",
  "Availability",
  "Profile Picture",
];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  // Initial form values
  const initialValues = {
    fullName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    WhatsAppNumber: "",
    socialLinks: [""],
    category: "",
    bio: "",
    skill: "",
    description: "",
    address: "",
    state: "Kano State",
    latitude: "",
    longitude: "",
    isAvailable: true,
    hours: { start: "", end: "" },
    password: "",
    profilePicture: null,
  };

  // Validation schema for Formik
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    businessName: Yup.string().required("Business Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  // Navigate between steps
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle profile picture preview
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("profilePicture", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Stepper content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Business Name"
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              error={
                formik.touched.businessName &&
                Boolean(formik.errors.businessName)
              }
              helperText={formik.touched.businessName && formik.errors.businessName}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="mb-4"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber &&
                Boolean(formik.errors.phoneNumber)
              }
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="WhatsApp Number"
              name="WhatsAppNumber"
              value={formik.values.WhatsAppNumber}
              onChange={formik.handleChange}
              className="mb-4"
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              error={formik.touched.longitude && Boolean(formik.errors.longitude)}
              helperText={formik.touched.longitude && formik.errors.longitude}
              className="mb-4"
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <TextField
              fullWidth
              label="Availability (Start Time)"
              name="hours.start"
              value={formik.values.hours.start}
              onChange={formik.handleChange}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Availability (End Time)"
              name="hours.end"
              value={formik.values.hours.end}
              onChange={formik.handleChange}
              className="mb-4"
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography className="mb-4" variant="h6">
              Upload Profile Picture
            </Typography>
            {profilePicturePreview && (
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className="mb-4 w-24 h-24 rounded-full object-cover"
              />
            )}
            <Button
              variant="contained"
              component="label"
              color="primary"
              className="mb-4"
            >
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </Button>
            {formik.errors.profilePicture && (
              <Typography color="error">{formik.errors.profilePicture}</Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-row">
      <div className="basis-1/2 hidden lg:block">
        <img src={Img} className="w-full h-full" alt="Default" />
      </div>
      <div className="basis-full lg:basis-1/2 flex flex-col items-center p-6">
        <Typography variant="h4" className="mb-6 text-green-600">
          Technician Registration
        </Typography>
        <Stepper activeStep={activeStep} className="w-full mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}
          <Box className="flex justify-between mt-6">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              type={activeStep === steps.length - 1 ? "submit" : "button"}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Register;
