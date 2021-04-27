import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { signUpAsync } from 'features/auth/authSlice';
import { routes } from 'routes';
import { Input } from 'components/atoms/Input';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: ({ email, password }) => {
      dispatch(signUpAsync({ email, password }));
    },
  });
  if (user) {
    return <Redirect to={routes.home} />;
  }
  return (
    <AuthTemplate>
      <Heading>Sign up</Heading>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledInput
          id-="email"
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <StyledInput
          id-="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <Button activecolor="notes" type="submit">
          Register
        </Button>
      </StyledForm>
      <StyledLink to={routes.login}>I want to log in!</StyledLink>
    </AuthTemplate>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 40px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

export default LoginPage;
