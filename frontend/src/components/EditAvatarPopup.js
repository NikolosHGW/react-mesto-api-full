import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="refresh"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    >
      <fieldset className="popup__input-text">
        <label className="popup__field">
          <input
            id="avatar-link-input"
            className="popup__input popup__input_el_avatar-link"
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            ref={inputRef}
            required
          />
          <span className="popup__input-error avatar-link-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
