import PopupWithForm from './PopupWithForm.js';
import useInput from '../utils/formValidator.js'

function AddPlacePopup(props) {
  const isLoading = props.onLoading;
  const isOpen = props.isOpen;
  const cardName = useInput('', isOpen);
  const cardLink = useInput('', isOpen);
  const showCardNameError = !cardName.isCorrect && cardName.error;
  const showCardLinkError = !cardLink.isCorrect && cardLink.error;
  const showDisabledSubmitButton = cardName.disabledSubmitButton || cardLink.disabledSubmitButton
    || isLoading;


  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardName.value, cardLink.value)
  }

  return (
    <PopupWithForm name={'card'} title={'Новое место'} isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} onLoading={props.onLoading} buttonText={'Создать'} loadingText={'Сохранение...'}
      classConditions={`popup__save-button ${showDisabledSubmitButton && 'popup__save-button_disabled'}`}>
      <input type="text" className="popup__input popup__input_type_card-name" name="name" value={cardName.value}
        onChange={cardName.handleChange} placeholder="Название" id="card" minLength="2" maxLength="20" required
      />
      <span className={`popup__input-error name-error ${showCardNameError && 'popup__input-error_active'}`}>{cardName.error}
      </span>
      <input type="url" className="popup__input popup__input_type_link" name="link" value={cardLink.value} onChange={cardLink.handleChange}
        placeholder="Ссылка на картинку" id="link" required
      />
      <span className={`popup__input-error link-error ${showCardLinkError && 'popup__input-error_active'}`}>
        {cardLink.error}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;