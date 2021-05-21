import React from "react";
import AuthForm from "./AuthForm";

export default React.memo(({ onLogin }) => {

  return (
    <AuthForm
      title="Вход"
      name="login"
      textButton="Войти"
      onSubmit={onLogin}
    />
  );
});
