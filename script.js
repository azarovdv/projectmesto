const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');

const popupAva = document.querySelector('.popup__ava');
const popupAddCards = document.querySelector('.popup__add-cards');
const popupOpenCards = document.querySelector('.popup__open-cards');
const popupCloseAva = popupAva.querySelector('.popup__close');
const popupCloseAddCards = popupAddCards.querySelector('.popup__close');
const popupCloseOpenCards = popupOpenCards.querySelector('.popup__close');


const formElementProfile = popupAva.querySelector('.popup__form');
const formElementCard = popupAddCards.querySelector('.popup__form');

const nameInput = content.querySelector('.profile__name');
const hobbyInput = content.querySelector('.profile__hobby');

const newCardButton = content.querySelector('.profile__add-button');

const listElement = content.querySelector('.list');

const popupName = popupAva.querySelector('.popup__item_type_name');
const popupHobby = popupAva.querySelector('.popup__item_type_hobby');

const listItemTemplate = document.querySelector('#template-list-item').content;

const img = popupOpenCards.querySelector('.popup__image');
const caption = popupOpenCards.querySelector('.caption');

const nameCard = popupAddCards.querySelector('.popup__item_type_name-card');
const linkCard = popupAddCards.querySelector('.popup__item_type_link');

//лайк
function handlLikeCard(evt) {
  evt.target.classList.toggle('list__like_active');
};

//удаление карточки
function deleteCard(evt) {
  evt.target.closest('.list__item').remove();
};

//открыть попап
function openPopup(item) {
  item.classList.add('popup_opened');
};

//закрыть попап
function closePopup(item) {
  item.classList.remove('popup_opened');
};

// открыть попап профайла
editButton.addEventListener('click', function () {
  openPopup(popupAva);
});

//закрыть попап профайла
popupCloseAva.addEventListener('click', function () {
  closePopup(popupAva);
});

//открыть попап добавления карточек
newCardButton.addEventListener('click', function () {
  openPopup(popupAddCards);
});

//закрыть попап добавления карточек
popupCloseAddCards.addEventListener('click', function () {
  closePopup(popupAddCards);
});

//закрыть попап карточки
popupCloseOpenCards.addEventListener('click', function () {
  closePopup(popupOpenCards);
});


//создание карточки + слушатели
function createCard(nameValue, linkValue) {
  const listItemElement = listItemTemplate.querySelector('.list__item').cloneNode(true);
  listItemElement.querySelector('.list__text').textContent = nameValue;
  listItemElement.querySelector('.list__img').src = linkValue;
  listItemElement.querySelector('.list__img').alt = nameValue;

  listItemElement.querySelector('.list__like').addEventListener('click', handlLikeCard);

  listItemElement.querySelector('.trash').addEventListener('click', deleteCard);

  listItemElement.querySelector('.list__img').addEventListener('click', function () {
    popupOpenCards.classList.add('popup_opened')

    img.src = linkValue;
    caption.textContent = nameValue;
  });

  return listItemElement
};


// добавление карточки
function renderCard(name, link) {
  const newCard = createCard(name, link);
  listElement.prepend(newCard);
};


//перебор массива
initialCards.forEach((item) => {
  renderCard(item.name, item.link)
});


popupName.value = nameInput.textContent;
popupHobby.value = hobbyInput.textContent;


// редактирование данных профайла
function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = popupName.value;
  hobbyInput.textContent = popupHobby.value;

  closePopup(popupAva);
}
// сохрать данные профайла
formElementProfile.addEventListener('submit', handleFormSubmit);


// добавление карточки
function addCardSubmit(evt) {
  evt.preventDefault();

  renderCard(nameCard.value, linkCard.value);

  closePopup(popupAddCards);
  evt.target.reset();
}
// сохранить карточку
formElementCard.addEventListener('submit', addCardSubmit);