import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useInput from '../utils/formValidator'

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const name = useInput(currentUser.name, isOpen);
  const description = useInput(currentUser.about, isOpen);
  const showDescriptionError = !description.isCorrect && description.error;
  const showNameError = !name.isCorrect && name.error;
  const showDisabledSubmitButton = name.disabledSubmitButton || description.disabledSubmitButton || isLoading;


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name.value, description.value)
  }


  useEffect(() => {
    name.handleChange(currentUser.name);
    description.handleChange(currentUser.about)
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
      onLoading={props.onLoading} buttonText={'Сохранить'} loadingText={'Сохранение...'}
      classConditions={`popup__save-button ${(showDisabledSubmitButton) && 'popup__save-button_disabled'}`}>
      <input type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" value={name.value} onChange={name.handleChange}
        id="nameInput" minLength="2" maxLength="40" required
      />
      <span className={`popup__input-error name-input-error ${showNameError && 'popup__input-error_active'}`}>
        {name.error}
      </span>
      <input type="text" className="popup__input popup__input_type_job" name="description" value={description.value} onChange={description.handleChange}
        placeholder="О себе" id="description-input" minLength="2" maxLength="200" required
      />
      <span className={`popup__input-error description-input-error ${showDescriptionError && 'popup__input-error_active'}`}>
        {description.error}
      </span>

    </PopupWithForm>
  )
}

export default EditProfilePopup;