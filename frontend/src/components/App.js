import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { authorize, register } from '../utils/auth';
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [selectedCardForDelete, setSelectedCardForDelete] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState({isLoggedIn: false, loggedEmail: ''});
  const [infoToolOpen, setInfoToolOpen] = React.useState({
    isOpen: false,
    isSuccess: true,
    text: 'Вы успешно зарегистрировались!'
  });
  const history = useHistory();

  let isConnected = localStorage.getItem('isConnected');

  React.useEffect(() => {
    if(isConnected === 'true') {
      api.getInfoUser()
        .then(data => {
          setCurrentUser({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            _id: data._id
          });
          setLoggedIn({isLoggedIn: true, loggedEmail: data.email});
          history.push('/');
        })
        .catch(res => console.log(res));
    }
  }, [history, isConnected]);

  React.useEffect(() => {
    if (isConnected === 'true') {
      api.getInitialCard()
        .then(data => {
          setCards(data);
        })
        .catch(res => console.log(res));
      }
  }, [isConnected]);

  const setLogout = React.useCallback(() => setLoggedIn(
    {isLoggedIn: false, loggedEmail: ''}
  ), []);

  const closeAllPopups = React.useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(false);
  }, []);

  const handleCardLike = React.useCallback(card => {
    const isLiked = card.likes
      .some(user => user === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(prevState => prevState
          .map(c => c._id === card._id ? newCard : c));
      })
      .catch(res => console.log(res));
  }, [currentUser._id]);

  const handleCardDelete = React.useCallback(card => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCardForDelete(card);
  }, []);

  const handleConfirmCardDelete = React.useCallback(card => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(prevState => prevState
          .filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }, [closeAllPopups]);

  const handleEditProfileClick = React.useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = React.useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const handleEditAvatarClick = React.useCallback(() => {
    setIsEditAvatarPopupOpen(true);
  }, []);

  const handleCardClick = React.useCallback(card => {
    setSelectedCard(card);
  }, []);

  const handleUpdateUser = React.useCallback(({ name, about }) => {
    api.setInfoUser(name, about)
      .then(res => {
        setCurrentUser(prev => ({
          ...prev,
          'name': res.name,
          'about': res.about
        }));
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }, [closeAllPopups]);

  const handleUpdateAvatar = React.useCallback(({ avatar }) => {
    api.changeAvatar(avatar)
      .then(res => {
        setCurrentUser(prev => ({
          ...prev,
          'avatar': res.avatar,
        }));
        closeAllPopups();
      })
      .catch(res => console.log(res));
  }, [closeAllPopups]);

  const handleAddPlaceSubmit = React.useCallback(({ name, link }) => {
    api.createCard({name, link})
      .then(res => {
        setCards(prev => [res, ...prev]);
        closeAllPopups();
      })
      .catch(res => console.log(res))
  }, [closeAllPopups]);

  const handleCloseTool = React.useCallback(() => {
    setInfoToolOpen(prev => ({...prev, isOpen: false}));
  }, []);

  const handleRegister = React.useCallback((email, password) => {
    register(email, password)
      .then(() => {
        setInfoToolOpen({
          isOpen: true,
          isSuccess: true,
          text: 'Вы успешно зарегистрировались!',
        });
        history.push('/sign-in');
      })
      .catch(() => {
        setInfoToolOpen({
          isOpen: true,
          isSuccess: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }, [history]);

  const handleLogin = React.useCallback((email, password) => {
    authorize(email, password)
      .then(res => {
        if(res.tokenStatus === 'ok') {
          localStorage.setItem('isConnected', true);
          setLoggedIn(prev => ({...prev, isLoggedIn: true}));
          history.push('/');
        }
        else {
          return Promise.reject('Почему-то не нашелся token.');
        }
      })
      .catch(() => {
        setInfoToolOpen({
          isOpen: true,
          isSuccess: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }, [history]);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header
        email={loggedIn.loggedEmail}
        logout={setLogout}
      />
      <Switch>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn.isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
      </Switch>
      <Footer />
    </div>

    <InfoTooltip
      isOpen={infoToolOpen.isOpen}
      onClose={handleCloseTool}
      isSuccess={infoToolOpen.isSuccess}
      text={infoToolOpen.text}
    />

    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />

    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
    />

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    <ConfirmDeletePopup
      isOpen={isConfirmDeletePopupOpen}
      onClose={closeAllPopups}
      onConfirmCardDelete={handleConfirmCardDelete}
      card={selectedCardForDelete}
    />

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

  </CurrentUserContext.Provider>
  );
}

export default App;
