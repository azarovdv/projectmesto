import { initialCards } from "./cards.js";
import { closePopup } from "./utils.js";
import { content } from "./constans.js";

const listItemTemplate = document.querySelector("#template-list-item").content;
const popupOpenCard = document.querySelector(".popup__open-cards");
const popupAddCards = document.querySelector(".popup__add-cards");
const imgOpenCard = popupOpenCard.querySelector(".popup__image");
const captionOpenCard = popupOpenCard.querySelector(".caption");
const nameCard = popupAddCards.querySelector(".popup__item_type_name-card");
const linkCard = popupAddCards.querySelector(".popup__item_type_link");

const listElement = content.querySelector(".list");

//удаление карточки
function deleteCard(evt) {
  evt.target.closest(".list__item").remove();
}

//создание карточки + открытие попап карточки
function createCard(nameValue, linkValue) {
  const listItemElement = listItemTemplate
    .querySelector(".list__item")
    .cloneNode(true);
  listItemElement.querySelector(".list__text").textContent = nameValue;
  listItemElement.querySelector(".list__img").src = linkValue;
  listItemElement.querySelector(".list__img").alt = nameValue;

  listItemElement
    .querySelector(".list__img")
    .addEventListener("click", function () {
      popupOpenCard.classList.add("popup_opened");

      imgOpenCard.src = linkValue;
      captionOpenCard.textContent = nameValue;
    });

  return listItemElement;
}

// добавление карточки
function renderCard(name, link) {
  const newCard = createCard(name, link);
  listElement.prepend(newCard);
}

// добавление карточки
function addCardSubmit(evt) {
  evt.preventDefault();

  renderCard(nameCard.value, linkCard.value);

  closePopup(popupAddCards);
  evt.target.reset();
}

//перебор массива
const arrCards = initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

//лайк
function handlLikeCard(evt) {
  evt.target.classList.toggle("list__like_active");
}

export {
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
};
