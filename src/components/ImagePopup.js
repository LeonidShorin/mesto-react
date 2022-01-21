function ImagePopup(props) {

  return (
    <div className={`popup popup_type_image ${props.card? 'popup_show' : ''}`}>
      <div className="popup__window popup__window_img">
        <figure className="popup__image-block">
          <img src={props.card ? props.card.link : ''}
               alt={props.card ? props.card.name : ''}
               className="popup__image"/>
          <figcaption className="popup__image-caption">{props.card? props.card.name : ''}</figcaption>
          <button type="button" onClick={props.onClose}
                className="popup__close-button popup__close-button_image">{}</button>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;