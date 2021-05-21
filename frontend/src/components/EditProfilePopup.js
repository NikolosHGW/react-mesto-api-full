import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [info, setInfo] = React.useState({
    name: '',
    description: '',
    nameValid: true,
    descriptionValid: true,
    nameValidMessage: '',
    descriptionValidMessage: '',
  });

  const currentUser = React.useContext(CurrentUserContext);

  function handleInfoChange(evt) {
    setInfo({
      ...info,
      [evt.target.name]: evt.target.value,
      [`${evt.target.name}Valid`]: evt.target.validity.valid,
      [`${evt.target.name}ValidMessage`]: evt.target.validationMessage,
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: info.name,
      about: info.description
    });
  }

  React.useEffect(() => {
    setInfo(prev => currentUser.name && currentUser.about
      ? {
        ...prev,
        name: currentUser.name,
        description: currentUser.about
      } : prev);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edd"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={info.nameValid && info.descriptionValid}
    >
      <fieldset className="popup__input-text">
        <label className="popup__field">
          <input
            id="name-input"
            className={`popup__input popup__input_el_name${
              info.nameValidMessage ? ' popup__input_type_error' : ''}`}
            value={info.name}
            onChange={handleInfoChange}
            type="text"
            name="name"
            required
            minLength="2"
            maxLength="40"
          />
          <span className={`popup__input-error name-input-error${
            info.nameValid ? '' : ' popup__input-error_active'}`}
          >
            {info.nameValid ? '' : info.nameValidMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            id="job-input"
            className={`popup__input popup__input_el_job${
              info.descriptionValidMessage ? ' popup__input_type_error' : ''}`}
            value={info.description}
            onChange={handleInfoChange}
            type="text"
            name="description"
            required
            minLength="2"
            maxLength="200"
          />
          <span className={`popup__input-error job-input-error${
            info.descriptionValid ? '' : ' popup__input-error_active'}`}
          >
            {info.descriptionValid ? '' : info.descriptionValidMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
