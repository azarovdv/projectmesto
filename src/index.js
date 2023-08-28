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
  closePopup,
  handlLikeCard,
} from "./components/card.js";

import { openPopup } from "./components/utils.js";

import {
  handleFormSubmit,
  ProfileName,
  ProfileHobby,
} from "./components/modal.js";

const body = document.querySelector(".page");

const popupProfile = document.querySelector(".popup__ava");

const popupCloseProfile = popupProfile.querySelector(".popup__close");
const popupCloseAddCards = popupAddCards.querySelector(".popup__close");
const popupCloseOpenCard = popupOpenCard.querySelector(".popup__close");

const formElementProfile = popupProfile.querySelector(".popup__form");
const formElementCard = popupAddCards.querySelector(".popup__form");

const editProfileButton = content.querySelector(".profile__edit-button");
const newCardButton = content.querySelector(".profile__add-button");

const popupNameProfile = popupProfile.querySelector(".popup__item_type_name");
const popupHobbyProfile = popupProfile.querySelector(".popup__item_type_hobby");

// открыть попап профайла
editProfileButton.addEventListener("click", function () {
  popupNameProfile.value = ProfileName.textContent;
  popupHobbyProfile.value = ProfileHobby.textContent;
  openPopup(popupProfile);
});

//закрыть попап профайла
popupCloseProfile.addEventListener("click", function () {
  clearFormError();
  closePopup(popupProfile);
});

//открыть попап добавления карточек
newCardButton.addEventListener("click", function () {
  openPopup(popupAddCards);
});

//закрыть попап добавления карточек
popupCloseAddCards.addEventListener("click", function () {
  clearFormError();
  closePopup(popupAddCards);
  formElementCard.reset();
});

//закрыть попап карточки
popupCloseOpenCard.addEventListener("click", function () {
  closePopup(popupOpenCard);
});

//закрытие попапов по esc - 3 шт
content.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    clearFormError();
    closePopup(popupProfile);
  }
});

content.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    clearFormError();
    closePopup(popupAddCards);
    formElementCard.reset();
  }
});

body.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") closePopup(popupOpenCard);
});

//закрытие по overlay - 3шт
popupProfile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_opened")) {
    clearFormError();
    closePopup(popupProfile);
  }
});

popupAddCards.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_opened")) {
    clearFormError();
    closePopup(popupAddCards);
    formElementCard.reset();
  }
});

popupOpenCard.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(popupOpenCard);
  }
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
formElementCard.addEventListener("submit", addCardSubmit);

// настройки объектом
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});
