import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

export default React.memo(({ onRegister }) => {

  return (
    <AuthForm
      title="Регистрация"
      name="register"
      textButton="Зарегистрироваться"
      onSubmit={onRegister}
    >
      <span className="auth__span">
        Уже зарегистрированы? <Link
          className="auth__link"
          to="/sign-in"
        >Войти</Link>
      </span>
    </AuthForm>
  );
});
