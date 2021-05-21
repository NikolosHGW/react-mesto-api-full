import { options } from './utils.js';

const BASE_URL = 'https://api.express.mesto.nomoredomains.rocks';

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка. Status: ${res.status}; Status text: ${res.statusText}`);
}

function getPromise(email, password, endPoint) {
  return fetch(`${BASE_URL}${endPoint}`, {
    method: 'POST',
    ...options.optionsForFetch,
    body: JSON.stringify({
      password,
      email
    })
  })
    .then(checkResponse);
}

export function register(email, password) {
  return getPromise(email, password, '/signup');
}

export function authorize(email, password) {
  return getPromise(email, password, '/signin');
}
