import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  const isLoading = props.onLoading;

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card)
  }
  return (
    <PopupWithForm name={'confirm-delete-form'} title={'Вы уверены?'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
      onLoading={props.onLoading} card={props.card} buttonText={'Да'} loadingText={'Удаление...'}
      classConditions={`popup__save-button ${isLoading && 'popup__save-button_disabled'}`}>
    </PopupWithForm>
  )
}

export default ConfirmPopup;
