import { options } from './utils.js';

export default class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }

  setInfoUser(name, job){
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      ...this.options.optionsForFetch,
      body: JSON.stringify({
        name,
        about: job
      })
    })
      .then(this._checkResponse);
  }

  getInitialCard() {
    return fetch(`${this.options.baseUrl}/cards`, {
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }

  createCard({name, link}) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      ...this.options.optionsForFetch,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }

  putLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      ...this.options.optionsForFetch,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const currentMethod = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.options.baseUrl}/cards/${id}/likes`, {
      method: currentMethod,
      ...this.options.optionsForFetch,
    })
      .then(this._checkResponse);
  }
}

export const api = new Api(options);
