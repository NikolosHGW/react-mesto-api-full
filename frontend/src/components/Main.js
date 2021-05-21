import React from "react";
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardList = React.useMemo(() => cards.map(card => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  )), [cards, onCardClick, onCardLike, onCardDelete]);

  return (
  <main className="content">
    <section className="profile">
      <div className="profile__container">
        <div className="profile__avatar-cover">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
          <button className="profile__avatar-button" type="button" aria-label="edit" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" aria-label="edit" onClick={onEditProfile}></button>
        </div>
      </div>
      <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button>
    </section>

    <section className="elements content__elements">
      {cardList}
    </section>
  </main>
  );
}
