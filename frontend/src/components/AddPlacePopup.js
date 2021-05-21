import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [inputValues, setInputValues] = React.useState({
    name: '',
    link: '',
    nameValid: false,
    linkValid: false,
    nameValidMessage: '',
    linkValidMessage: '',
  });

  function handleInputsChange(evt) {
    setInputValues({
      ...inputValues,
      [evt.target.name]: evt.target.value,
      [`${evt.target.name}Valid`]: evt.target.validity.valid,
      [`${evt.target.name}ValidMessage`]: evt.target.validationMessage,
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(inputValues);
  }

  React.useEffect(() => {
    setInputValues({
      name: '',
      link: '',
      nameValid: false,
      linkValid: false,
      nameValidMessage: '',
      linkValidMessage: '',
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={inputValues.nameValid && inputValues.linkValid}
    >
      <fieldset className="popup__input-text">
        <label className="popup__field">
          <input
            id="card-name-input"
            className={`popup__input popup__input_el_card-name${
              inputValues.nameValidMessage ? ' popup__input_type_error' : ''}`}
            placeholder="Название"
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputsChange}
            required
            minLength="2"
            maxLength="30"
          />
          <span className={`popup__input-error card-name-input-error${
            inputValues.nameValid ? '' : ' popup__input-error_active'}`}
          >
            {inputValues.nameValid ? '' : inputValues.nameValidMessage}
          </span>
        </label>
        <label className="popup__field">
          <input
            id="img-link-input"
            className={`popup__input popup__input_el_img-link${
              inputValues.linkValidMessage ? ' popup__input_type_error' : ''}`}
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            value={inputValues.link}
            onChange={handleInputsChange}
            required
          />
          <span className={`popup__input-error img-link-input-error${
            inputValues.linkValid ? '' : ' popup__input-error_active'}`}
          >
            {inputValues.linkValid ? '' : inputValues.linkValidMessage}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
