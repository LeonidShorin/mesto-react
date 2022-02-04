import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useInput from '../utils/formValidator';

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const isOpen = props.isOpen;
  const isLoading = props.onLoading;
  const avatar = useInput('', isOpen);
  const showAvatarError = !avatar.isCorrect && avatar.error;
  const showDisabledSubmitButton = avatar.disabledSubmitButton || isLoading;

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value)
  }

  useEffect(() => {
    !isOpen && (avatarRef.current.value = '')
  }, [isOpen])

  return (
    <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} onLoading={props.onLoading} buttonText={'Сохранить'} loadingText={'Сохранение...'}
      classConditions={`popup__save-button ${(showDisabledSubmitButton) && 'popup__save-button_disabled'}`}>
      <fieldset className={'popup__fieldset'}>
        <input type="url" className="popup__input popup__input_type_avatar" name="link" ref={avatarRef}
          onChange={(e) => {
            avatar.handleError(e.target);
          }}
          placeholder="Ссылка на картинку"
          id="avatar-link"
          required
        />
        <span className={`popup__input-error ${showAvatarError && 'popup__input-error_active'}
        avatar-link-error`}>{avatar.error}
        </span>

      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;