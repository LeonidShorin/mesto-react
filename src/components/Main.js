import {useEffect, useState} from 'react';
import {api} from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(()=>{
    api.getInitialCards()
      .then(data => {
        setCards(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-block" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>{}</button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}>{}</button>
      </section>
      <section className="elements">
      {cards.map(item => <Card key={item._id}
                               card={item}
                               onCardClick={props.onCardClick}/>)}
      </section>
    </main>
  )
}

export default Main;