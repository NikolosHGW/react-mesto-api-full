import React from "react";

export default function PopupWithForm({ name, title, textButton, isOpen, onClose, onSubmit, isValid, children }) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => setIsLoading(false), [isOpen]);

  return (
    <div className={`popup popup_${name}${isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={evt => {onSubmit(evt); setIsLoading(true)}}
          noValidate
        >
          {children}
          <button
            className={`popup__save-button${
              isValid ? '' : ' popup__save-button_inactive'}`}
            disabled={!isValid || isLoading}
            type="submit"
          >
            {isLoading ? (
              <div className="popup__spinner"></div>
            ) : textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
