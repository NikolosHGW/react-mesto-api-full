import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_img${card ? ' popup_opened' : ''}`}>
      <div className="popup-img">
        <img className="popup-img__img" src={card.link} alt={`Загруженная картинка в большем разрешении: ${card.name}`}/>
        <p className="popup-img__caption">{card.name}</p>
        <button className="popup__close-icon" type="button" aria-label="close" onClick={onClose}></button>
      </div>
    </div>
  );
}

