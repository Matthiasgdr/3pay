import React from "react";
import Login from "../components/account/Login";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
