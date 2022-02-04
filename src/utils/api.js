class Api {
  constructor({ serverUrl, headers }) {
    this._url = serverUrl;
    this._headers = headers;
  }

  _parseResponse(res, errorText) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${errorText}. Статус ошибки:${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось загрузить данные пользователя');
      });
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось загрузить карточки');
      });
  }

  editProfile({ name, description }) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось загрузить данные профиля');
      });
  }

  updateUserAvatar(link) {
    return fetch(this._url + '/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось загрузить аватар');
      });
  }

  addCard({ name, link }) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось добавить карточку');
      });
  }

  deleteCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось удалить карточку');
      });
  }

  addLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes/', {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось поставить like');
      });
  }

  removeLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes/', {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._parseResponse(res, 'Не удалось убрать лайк');
      });
  }
}

// Экземпляр класса Api
export const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: 'c5326610-ed33-45d9-9066-edfd682961dc',
    'Content-Type': 'application/json'
  }
});