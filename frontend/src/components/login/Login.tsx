import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthenticatorForm from "./AuthenticatorForm";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";

type LoginProps = {
  id: number;
  secret?: string;
  otpauth_url?: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [loginData, setLoginData] = useState<LoginProps>({ id: 0 });

  const success = () => {
    setRedirect(true);
    dispatch(setAuth(true));
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  let form;
  if (loginData?.id == 0) {
    form = <LoginForm loginData={setLoginData} success={success} />;
  } else {
    form = <AuthenticatorForm loginData={loginData} success={success} />;
  }
  return <>{form}</>;
};

export default Login;
