import React from "react";

export default function AuthForm({ title, name, textButton, onSubmit, children }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    onSubmit(email, password);
  }

  return (
    <div className="auth page__auth">
      <h2 className="auth__heading">{title}</h2>
      <form
        className="auth__form"
        name={name}
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="auth__input-text">
          <label className="auth__field">
            <input
              id="email-input"
              className="auth__input"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
              minLength="2"
              maxLength="40"
            />
          </label>
          <label className="auth__field">
            <input
              id="password-input"
              className="auth__input"
              placeholder="Пароль"
              value={userData.password}
              onChange={handleChange}
              type="password"
              name="password"
              required
              minLength="2"
              maxLength="200"
            />
          </label>
        </fieldset>
        <button
          className="auth__save-button"
          type="submit"
        >
          {textButton}
        </button>
      </form>
      {children}
    </div>
  );
}
