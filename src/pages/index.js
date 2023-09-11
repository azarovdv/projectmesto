import "./index.css";

import { enableValidation, clearFormError } from "../components/validate.js";

import {
  popupAddCards,
  content,
  addCardSubmit,
  renderCard,
} from "../components/card.js";

import { openPopup, closePopup } from "../components/utils.js";

import {
  handleProfileFormSubmit,
  editPhotoAva,
  profileName,
  profileHobby,
  imgAva,
} from "../components/modal.js";

import {
  popupProfile,
  popupNameProfile,
  popupHobbyProfile,
  popupAva,
} from "../components/constans.js";

import { getUser, getInitialsCards } from "../components/api.js";

const popups = document.querySelectorAll(".popup");

const formElementProfile = popupProfile.querySelector(".popup__form");
const formElementCard = popupAddCards.querySelector(".popup__form");
const formElementAva = popupAva.querySelector(".popup__form");

const editProfileButton = content.querySelector(".profile__edit-button");
const newCardButton = content.querySelector(".profile__add-button");
const editAvaButton = content.querySelector(".profile__ava-button");

const removeDisabledAttrButton = (popup) => {
  const button = popup.querySelector(".popup__form-button");
  if (button.hasAttribute("disabled")) {
    button.removeAttribute("disabled");
  }
};

Promise.all([getUser(), getInitialsCards()])
  .then((values) => {
    const [userData, cardsData] = values;

    const { name, about, avatar, _id } = userData;
    window.userId = _id;
    profileName.textContent = name;
    profileHobby.textContent = about;
    imgAva.src = avatar;

    cardsData.forEach((item) => {
      renderCard(item);
    });

    return values;
  })
  .catch((err) => console.log(err));

// открыть попап профайла
editProfileButton.addEventListener("click", () => {
  clearFormError();
  popupNameProfile.value = profileName.textContent;
  popupHobbyProfile.value = profileHobby.textContent;
  openPopup(popupProfile);
  removeDisabledAttrButton(popupProfile);
});

//открыть попап добавления карточек
newCardButton.addEventListener("click", () => {
  openPopup(popupAddCards);
});

//открыть попап изменение авы
editAvaButton.addEventListener("click", () => {
  openPopup(popupAva);
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

// сохрать данные профайла
formElementProfile.addEventListener("submit", handleProfileFormSubmit);

// сохранить карточку
formElementCard.addEventListener("submit", addCardSubmit);

// сохранить аву
formElementAva.addEventListener("submit", editPhotoAva);

//настройки объектом
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active",
});
