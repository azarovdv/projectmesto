const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-28",
  headers: {
    authorization: "3f27fbc7-1295-4006-b957-4324314762dc",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// 3 пункт Загрузка информации о пользователе с сервера
function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

// 4 пункт Загрузка карточек с сервера
function getInitialsCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

// 5 пункт Редактирование профиля
function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

// 6 пункт
function createNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
}

function editAva(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

export {
  getUser,
  getInitialsCards,
  editProfile,
  createNewCard,
  setLike,
  deleteLike,
  removeCard,
  editAva,
};
