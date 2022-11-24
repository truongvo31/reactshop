import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../redux/features/userSlice";
import Form from "../components/Form";
import Helmet from "../components/Helmet";
import Loading from "../components/Loading";

const formArr = [
  {
    label: "Firstname",
    placeholder: "Your firstname",
    name: "firstname",
    type: "text",
  },
  {
    label: "Lastname",
    placeholder: "Your lastname",
    name: "lastname",
    type: "text",
  },
  {
    label: "Email",
    placeholder: "Example: account@example.com",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
  {
    label: "Confirm Password",
    placeholder: "Confirm password",
    name: "confirm_password",
    type: "password",
  },
];

const redirect = {
  label: "Already have an account?",
  link: {
    label: "Login",
    to: "/login",
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { user, error, loading } = userLogin;
  const navigate = useNavigate();

  const [formError, setFormError] = useState(undefined);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmitHandler = (form) => {
    if (
      document.getElementById("password").value !==
      document.getElementById("confirm_password").value
    ) {
      setFormError("Password and Confirm password does not match");
    } else {
      dispatch(registerUser(form));
    }
  };

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  return (
    <Helmet title="Login">
      {loading && <Loading />}
      <Form
        title="register"
        formArr={formArr}
        submitBtn="submit"
        redirect={redirect}
        onSubmit={onSubmitHandler}
        error={formError ? formError : undefined}
      ></Form>
    </Helmet>
  );
};

export default Register;
