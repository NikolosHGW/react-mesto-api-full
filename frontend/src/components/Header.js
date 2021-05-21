import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import logo from '../images/Vector.svg';
import LogHeader from "./LogHeader";

export default React.memo(({ email, logout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogOut = React.useCallback(() => {
    localStorage.setItem('isConnected', false);
    logout();
    setIsOpen(false);
  }, [logout]);

  return (
    <header className="header">
      {isOpen && (
        <LogHeader
          openedSelector=" header__login_opened"
          email={email}
          onLogOut={handleLogOut}
        />
      )}
      <div className="header__container">
        <Link className="header__link" to="/">
          <img className="header__logo" src={logo} alt="логотип Место Россия"/>
        </Link>
        <Route exact path="/">
          <LogHeader
            openedSelector=""
            email={email}
            onLogOut={handleLogOut}
          />
          {isOpen ? (
            <button
              className="header__menu-close-button"
              type="button"
              aria-label="close"
              onClick={() => setIsOpen(false)}
            ></button>
          ) : (
            <button
              className="header__menu-button"
              type="button"
              aria-label="open menu"
              onClick={() => setIsOpen(true)}
            >
              <span className="header__menu-line"></span>
            </button>
          )}
        </Route>
        <Route path="/sign-in">
          <Link
            className="header__nav-link header__nav-link_color"
            to="/sign-up"
          >Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link
            className="header__nav-link header__nav-link_color"
            to="/sign-in"
          >Войти</Link>
        </Route>
      </div>
    </header>
  );
});
