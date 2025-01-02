// import React from "react";

// const HeroSection = () => {
//   return (
//     <div className="relative bg-gradient-to-b from-green-50 to-green-100">
//       <header className="absolute inset-x-0 top-0 z-10 w-full">
//         <div className="px-4 mx-auto sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             <div className="flex-shrink-0">
//               <a href="#" title="" className="flex">
//                 <img
//                   className="w-auto h-8"
//                   src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/logo.svg"
//                   alt="Logo"
//                 />
//               </a>
//             </div>

//             <button
//               type="button"
//               className="inline-flex items-center p-2 text-sm text-white uppercase transition-all duration-200 bg-black lg:hidden focus:bg-gray-800 hover:bg-gray-800"
//             >
//               <svg
//                 className="block w-6 h-6 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>

//               <svg
//                 className="hidden w-6 h-6 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>

//               Menu
//             </button>

//             <div className="hidden lg:flex lg:items-center lg:justify-center lg:ml-10 lg:mr-auto lg:space-x-10">
//               <a
//                 href="#"
//                 title=""
//                 className="text-base text-black transition-all duration-200 hover:text-opacity-80"
//               >
//                 Features
//               </a>
//               <a
//                 href="#"
//                 title=""
//                 className="text-base text-black transition-all duration-200 hover:text-opacity-80"
//               >
//                 Solutions
//               </a>
//               <a
//                 href="#"
//                 title=""
//                 className="text-base text-black transition-all duration-200 hover:text-opacity-80"
//               >
//                 Resources
//               </a>
//               <a
//                 href="#"
//                 title=""
//                 className="text-base text-black transition-all duration-200 hover:text-opacity-80"
//               >
//                 Pricing
//               </a>
//             </div>

//             <a
//               href="#"
//               title=""
//               className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
//               role="button"
//             >
//               Try for free
//             </a>
//           </div>
//         </div>
//       </header>

//       <section className="overflow-hidden">
//         <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
//           <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
//             <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
//               <div className="flex flex-col justify-between flex-1 h-full">
//                 <div>
//                   <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">
//                     Take control <br />
//                     on your daily expenses
//                   </h1>
//                   <p className="mt-6 text-base text-black sm:text-xl">
//                     Our A.I helps you to predict your expenses based on your
//                     previous activity and shares how you should manage your
//                     money.
//                   </p>
//                   <a
//                     href="#"
//                     title=""
//                     className="inline-flex items-center px-6 py-5 text-base font-semibold text-black transition-all duration-200 bg-green-300 mt-9 hover:bg-green-400 focus:bg-green-400"
//                     role="button"
//                   >
//                     Get started for free
//                   </a>
//                 </div>

//                 <div className="mt-8 border-t-2 border-black lg:mt-auto sm:mt-14">
//                   <div className="pt-8 sm:flex sm:items-center sm:justify-between sm:pt-14">
//                     <p className="text-base font-semibold text-black">
//                       App available on
//                     </p>

//                     <div className="flex items-center mt-5 space-x-5 sm:mt-0">
//                       <a
//                         href="#"
//                         title=""
//                         className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
//                         role="button"
//                       >
//                         <img
//                           className="w-auto rounded h-14 sm:h-16"
//                           src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/app-store-button.png"
//                           alt="App Store"
//                         />
//                       </a>
//                       <a
//                         href="#"
//                         title=""
//                         className="block transition-all duration-200 hover:opacity-80 focus:opacity-80"
//                         role="button"
//                       >
//                         <img
//                           className="w-auto rounded h-14 sm:h-16"
//                           src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/play-store-button.png"
//                           alt="Play Store"
//                         />
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
//             <div className="lg:absolute lg:bottom-0 lg:left-0">
//               <img
//                 className="w-full"
//                 src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/4/phone-mockup.png"
//                 alt="Phone Mockup"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Personal Details", "Contact Details", "Location", "Skills & Bio"];

const TechnicianSignUp = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Initial values for Formik
  const initialValues = {
    fullName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    WhatsAppNumber: "",
    socialLinks: [],
    address: "",
    state: "Kano State",
    latitude: "",
    longitude: "",
    skill: [],
    bio: "",
    password: "",
  };

  // Validation Schema with Yup
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
      console.log("Form Values: ", values);
      // Submit logic here
    },
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Stepper Content
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
              label="Bio"
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Skills (comma-separated)"
              name="skill"
              value={formik.values.skill}
              onChange={(e) =>
                formik.setFieldValue(
                  "skill",
                  e.target.value.split(",").map((skill) => skill.trim())
                )
              }
              className="mb-4"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="mb-4"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="p-8">
      <Typography variant="h4" className="mb-4">
        Technician Sign-Up
      </Typography>
      <Stepper activeStep={activeStep} className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={formik.handleSubmit}>
        {getStepContent(activeStep)}
        <Box className="flex justify-between mt-4">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default TechnicianSignUp;
