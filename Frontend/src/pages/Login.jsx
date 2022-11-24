import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUser } from "../redux/features/userSlice";
import Form from "../components/Form";
import Helmet from "../components/Helmet";
import Loading from "../components/Loading";

const formArr = [
  {
    label: "Email",
    placeholder: "account@example.com",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    placeholder: "password",
    name: "password",
    type: "password",
  },
];

const redirect = {
  label: "Don't have an account?",
  link: {
    label: "Register",
    to: "/register",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { user, error, loading } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmitHandler = (form) => {
    dispatch(getUser(form));
  };

  return (
    <Helmet title="Login">
      {loading && <Loading />}
      <Form
        title="login"
        formArr={formArr}
        submitBtn="submit"
        redirect={redirect}
        onSubmit={onSubmitHandler}
        error={error ? error : undefined}
      ></Form>
    </Helmet>
  );
};

export default Login;
