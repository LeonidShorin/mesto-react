function Card (props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    (<div className="element">
      <img className="element__photo"
           src={props.card.link}
           alt={props.card.name}
           onClick={handleClick}/>
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-block">
          <button type="button" className="element__like-button">{}</button>
          <span className="element__likes-num">{props.card.likes.length}</span>
        </div>
      </div>
      <button type="button" className="element__delete-button">{}</button>
    </div>)
  )
}

export default Card;