import {useState} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupState(true);
  }
  function closeAllPopups() {
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setSelectedCard(null)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}/>
      <Footer />
      
      <PopupWithForm name={'edit-profile-form'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen}
                     onClose={closeAllPopups}>
                       <fieldset className={'popup__fieldset'}>
                         <input type="text"
                                className="popup__input popup__input_type_name"
                                name="name"
                                placeholder="Имя"
                                id="name-input"
                                minLength="2"
                                maxLength="40"
                                required/>
                         <span className="popup__input-error name-input-error">{}</span>
                         <input type="text"
                                className="popup__input popup__input_type_job"
                                name="description"
                                placeholder="О себе"
                                id="description-input"
                                minLength="2"
                                maxLength="200"
                                required/>
                         <span className="popup__input-error description-input-error">{}</span>
                         <button type="submit"
                                 className="popup__save-button popup__save-button_type_profile">
                           Сохранить
                         </button>
                       </fieldset> </PopupWithForm>

      <PopupWithForm name={'add-card-form'} title={'Новое место'} isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}>
                       <fieldset className={'popup__fieldset'}>
                         <input type="text"
                                className="popup__input popup__input_type_card-name"
                                name="name"
                                placeholder="Название"
                                id="card-name-input"
                                minLength="2"
                                maxLength="20"
                                required/>
                         <span className="popup__input-error card-name-input-error">{}</span>
                         <input type="url"
                                className="popup__input popup__input_type_link"
                                name="link"
                                placeholder="Ссылка на картинку"
                                id="image-link-input"
                                required/>
                         <span className="popup__input-error image-link-input-error">{}</span>
                         <button type="submit"
                                 className="popup__save-button popup__save-button_type_card">
                           Создать
                         </button>
                       </fieldset></PopupWithForm>
                       
      <PopupWithForm name={'update-avatar-form'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen}
                     onClose={closeAllPopups}>
                       <fieldset className={'popup__fieldset'}>
                         <input type="url"
                                className="popup__input popup__input_type_avatar"
                                name="link"
                                placeholder="Ссылка на картинку"
                                id="avatar-link-input"
                                required/>
                         <span className="popup__input-error avatar-link-input-error">{}</span>
                         <button type="submit"
                                 className="popup__save-button popup__save-button_type_avatar">
                           Сохранить
                         </button>
                       </fieldset></PopupWithForm>

      <PopupWithForm name={'confirm-delete-form'} title={'Вы уверены?'}>
                       <fieldset className={'popup__fieldset'}>
                         <button type="submit"
                                 className="popup__save-button popup__save-button_type_confirmation">Да
                         </button>
                       </fieldset></PopupWithForm>
      <PopupWithImage card={selectedCard} onClose={closeAllPopups}/>
    </div>
  )
}

export default App;
