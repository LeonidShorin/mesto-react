import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false)
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    link: ''
  });
  const [isEditAvatarLoading, setEditAvatarLoading] = useState(false)
  const [isEditProfileLoading, setEditProfileLoading] = useState(false);
  const [isAddPlaceLoading, setAddPlaceLoading] = useState(false);
  const [isConfirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);


  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function closeAllPopups() {
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setConfirmPopupState(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(name, description) {
    setEditProfileLoading(true)
    api.editProfile({ name, description })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setEditProfileLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setEditAvatarLoading(true);
    api.updateUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setEditAvatarLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function handleCardDeleteSubmit(card) {
    setConfirmDeleteLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter(c => {
            return c._id !== card._id
          });
        });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setConfirmDeleteLoading(false);
      })
  }

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleAddPlaceSubmit(name, link) {
    setAddPlaceLoading(true);
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setAddPlaceLoading(false);
      })
  }

  function handleConfirmCardDelete(card) {
    setConfirmPopupState(true);
    setDeletedCard(card);
  }

  return (<div className="page">
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmCardDelete} />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onLoading={isEditProfileLoading} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onLoading={isEditAvatarLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onLoading={isAddPlaceLoading} />
      <ConfirmPopup isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onLoading={isConfirmDeleteLoading}
        card={deletedCard}
        onSubmit={handleCardDeleteSubmit} />
      <ImagePopup card={selectedCard}
        onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  </div>)
}

export default App;

