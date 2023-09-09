import { openPopup, closePopup } from "./utils.js";
import { content } from "./constans.js";

import {
  getInitialsCards,
  createNewCard,
  setLike,
  deleteLike,
  removeCard,
} from "../api.js";

const listItemTemplate = document.querySelector("#template-list-item").content;
const popupOpenCard = document.querySelector(".popup__open-cards");
const popupAddCards = document.querySelector(".popup__add-cards");
const imgOpenCard = popupOpenCard.querySelector(".popup__image");
const captionOpenCard = popupOpenCard.querySelector(".caption");
const nameCard = popupAddCards.querySelector(".popup__item_type_name-card");
const linkCard = popupAddCards.querySelector(".popup__item_type_link");

const listElement = content.querySelector(".list");

function createTrash(listItemElement) {
  const newTrash = document.createElement("button");
  newTrash.classList.add("trash");
  newTrash.setAttribute("type", "button");
  newTrash.setAttribute("aria-label", "Корзина");
  const element = listItemElement.querySelector(".list__img");
  element.after(newTrash);
}

//создание карточки + открытие попап карточки
function createCard(info) {
  const { name: nameValue, link: linkValue, likes, _id, owner } = info;
  const listItemElement = listItemTemplate
    .querySelector(".list__item")
    .cloneNode(true);
  const img = listItemElement.querySelector(".list__img");
  listItemElement.querySelector(".list__text").textContent = nameValue;
  img.src = linkValue;
  img.alt = nameValue;

  const likesElement = listItemElement.querySelector(".list__like-counter");
  likesElement.textContent = likes.length;

  //лайк
  listItemElement
    .querySelector(".list__like-button")
    .addEventListener("click", (e) => {
      handlLikeCard(e, _id, likesElement);
    });

  //удалить

  if (window.userId === owner._id) {
    createTrash(listItemElement);
    listItemElement.querySelector(".trash").addEventListener("click", (evt) => {
      removeCard(_id)
        .then(() => evt.target.closest(".list__item").remove())
        .catch((err) => content.log(err));
    });
  }

  img.addEventListener("click", function () {
    openPopup(popupOpenCard);

    imgOpenCard.src = linkValue;
    imgOpenCard.alt = nameValue;
    captionOpenCard.textContent = nameValue;
  });

  return listItemElement;
}

// добавление карточки
function renderCard(info) {
  const newCard = createCard(info);
  listElement.prepend(newCard);
}

// добавление карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  createNewCard(nameCard.value, linkCard.value)
    .then((res) => {
      renderCard(res);
      closePopup(popupAddCards);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      evt.submitter.textContent = "Создать";
      evt.submitter.classList.add("popup__form-button_inactive");
      evt.submitter.disabled = true;
      evt.target.reset();
    });
}

// карточки с сервера
getInitialsCards()
  .then((res) => {
    res.forEach((item) => {
      renderCard(item);
    });
  })
  .catch((err) => console.log(err));

//лайк
function handlLikeCard(evt, id, likesElement) {
  if (evt.target.classList.contains("list__like-button_active")) {
    deleteLike(id)
      .then((res) => {
        likesElement.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    setLike(id)
      .then((res) => {
        likesElement.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
  evt.target.classList.toggle("list__like-button_active");
}

export { popupAddCards, content, addCardSubmit };
