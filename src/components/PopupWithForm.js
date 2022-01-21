function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_show' : ''}`}>
      <div className="popup__window">
        <button type="button" onClick={props.onClose}
                className={`popup__close-button popup__close-button_${props.name}`}>{}</button>
        <form className={`popup__form popup__form_${props.name}`}
              name={props.name}
              id={props.name}
              noValidate>
          <h2 className={`popup__title ${props.name === 'update-avatar-form'?
                         'popup__title_avatar'
                          : ''}`}>{props.title}</h2>
          {props.children}
          <button type="submit" 
                  className={`popup__save-button popup__save-button_type_${props.name}`}>
                           {props.submitName}
                         </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;