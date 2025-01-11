import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormContext } from "../../../context/registerFormContext";
import { darkBrown } from "../../../util/colors";

const Form1 = ({ onNext }) => {
  const { value, setValue } = useFormContext();

  // Initial form values
  const initialValues = {
    fullName: value.fullName ? value.fullName : "",
    email: value.email ? value.email : "",
    bio: value.bio ? value.bio : "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bio: Yup.string(),
  });

  // Form submission handler
  const handleSubmit = (values) => {
    setValue((prev) => ({ ...prev, ...values })); // Merge values with existing context state
    onNext(); // Move to the next page
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="flex justify-center items-center">
          <div
            className={`lg:w-[80%] w-full flex flex-col bg-[#f9f9f9] border-[${darkBrown}] rounded-xl border-2 h-fit mt-5 p-2 justify-center items-center`}
          >
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
              Personal Details
            </Typography>
            <div className="w-[75%] bg-transparent flex flex-col gap-2">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-gray-800 font-semibold text-sm">Full Name*</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className={`block lg:w-[90%] w-full h-10 lg:h-14 rounded-md py-1.5 px-2 ring-1 ring-gray-400 ring-inset${
                      formik.touched.fullName && formik.errors.fullName
                        ? "ring-red-500"
                        : "ring-gray-400"
                    } focus:text-gray-800`}
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                  <label className="pt-1 block text-red-500 text-sm">
                    {formik.errors.fullName}
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Email*
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`block lg:w-[90%] w-full h-10 lg:h-14 rounded-md py-1.5 px-2 ring-1 ring-gray-400 ring-inset ${
                      formik.touched.email && formik.errors.email
                        ? "ring-red-500"
                        : "ring-gray-400"
                    } focus:text-gray-800`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <label className="pt-1 block text-red-500 text-sm">
                    {formik.errors.email}
                  </label>
                )}
              </div>

              {/* Bio Field */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    placeholder="I am an experienced electrician with 10+ years of experience. I provide ......"
                    className={`block rounded-md py-1.5 px-2 ring-1 ring-inset lg:w-[90%] w-full ${
                      formik.touched.bio && formik.errors.bio
                        ? "ring-red-500"
                        : "ring-gray-400"
                    } focus:text-gray-800`}
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>
                {formik.touched.bio && formik.errors.bio && (
                  <label className="pt-1 block text-red-500 text-sm">
                    {formik.errors.bio}
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end mt-2 p-3">
              <Button
                type="submit"
                variant="contained"
                className='px-4 py-1 rounded-md'
                sx={{
                  backgroundColor: darkBrown,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: darkBrown,
                    opacity: 0.9,
                  },
                }}
                >
                Next <ArrowForwardIcon />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Form1;
