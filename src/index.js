import "./index.css";

import {
  showInputError,
  hideInputError,
  isValid,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
  clearFormError,
} from "./components/validate.js";

import {
  deleteCard,
  listItemTemplate,
  createCard,
  popupOpenCard,
  imgOpenCard,
  captionOpenCard,
  nameCard,
  linkCard,
  popupAddCards,
  arrCards,
  renderCard,
  listElement,
  content,
  addCardSubmit,
  handlLikeCard,
} from "./components/card.js";

import { openPopup, closePopup } from "./components/utils.js";

import {
  handleFormSubmit,
  ProfileName,
  ProfileHobby,
} from "./components/modal.js";

import {
  popupProfile,
  popupNameProfile,
  popupHobbyProfile,
} from "./components/constans.js";

const popups = document.querySelectorAll(".popup");

//const popupProfile = document.querySelector(".popup__ava");

const formElementProfile = popupProfile.querySelector(".popup__form");
const formElementCard = popupAddCards.querySelector(".popup__form");

const editProfileButton = content.querySelector(".profile__edit-button");
const newCardButton = content.querySelector(".profile__add-button");

//const popupNameProfile = popupProfile.querySelector(".popup__item_type_name");
//const popupHobbyProfile = popupProfile.querySelector(".popup__item_type_hobby");

// открыть попап профайла
editProfileButton.addEventListener("click", function () {
  clearFormError();
  popupNameProfile.value = ProfileName.textContent;
  popupHobbyProfile.value = ProfileHobby.textContent;
  openPopup(popupProfile);
});

//открыть попап добавления карточек
newCardButton.addEventListener("click", function () {
  openPopup(popupAddCards);
});

// закрытие ВСЕХ попапов по Х и overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//делегирование лайка
listElement.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("list__like")) {
    handlLikeCard(evt);
  }
});

//делигирование удаления карточки
listElement.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("trash")) {
    deleteCard(evt);
  }
});

// сохрать данные профайла
formElementProfile.addEventListener("submit", handleFormSubmit);

// сохранить карточку
formElementCard.addEventListener("submit", (evt) => {
  addCardSubmit(evt);
  formElementCard.reset();
});

// настройки объектом
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});
