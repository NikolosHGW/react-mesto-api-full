import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__del-button${isOwn ? ' element__del-button_visible' : ''}`;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button${isLiked ? ' element__like-button_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <button className="element__img-button" type="button" onClick={handleClick}>
        <img className="element__img" src={card.link} alt={`загруженная картинка: ${card.name}`}/>
      </button>
      <button className={cardDeleteButtonClassName} type="button" aria-label="delete" onClick={handleDeleteClick}></button>
      <div className="element__info">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__group">
          <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button>
          <p className="element__count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
