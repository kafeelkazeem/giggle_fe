import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import { darkBrown, darkGreen } from "../../util/colors";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values) => {
    const { email, password } = values;
    const success = await login(email, password); // Wait for login to complete
    if (success) {
      navigate('/home');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  return (
    <StyledWrapper>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="p-5 shadow-lg rounded-sm">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <p className="title">Login</p>
                <p className="message">Signup now and get full access to our app.</p>

                <label>
                  <Field name="email" type="email" className="input" placeholder="" />
                  <span>Email</span>
                  <ErrorMessage name="email" component="div" className="error" />
                </label>

                <label>
                  <Field name="password" type="password" className="input" placeholder="" />
                  <span>Password</span>
                  <ErrorMessage name="password" component="div" className="error" />
                </label>

                <button type="submit" className="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <p className="signin">
                  Don't have an account? <Link to="/">Register</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: ${darkBrown};
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: ${darkBrown};
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: ${darkBrown};
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: ${darkBrown};
}

.signin a:hover {
  text-decoration: underline ${darkBrown};
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: ${darkGreen};
}

.submit {
  border: none;
  outline: none;
  background-color: ${darkBrown};
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
`;

export default Login;
