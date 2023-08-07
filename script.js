const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');

const popupAva = document.querySelector('.popup__ava');
const popupCards = document.querySelector('.popup__add-cards');
const popupClose = document.querySelectorAll('.popup__close');


const formElementProfile = popupAva.querySelector('.popup__form');
const formElementCard = popupCards.querySelector('.popup__form');

const nameInput = content.querySelector('.profile__name');
const hobbyInput = content.querySelector('.profile__hobby');

const newCardButton = content.querySelector('.profile__add-button');

const listElement = content.querySelector('.list');

const listItemTemplate = document.querySelector('#template-list-item').content;


//лайк
function handlLikeCard(evt) {
  evt.target.classList.toggle('list__like_active');
}

//удаление карточки
function deleteCard(evt) {
  evt.target.closest('.list__item').remove();
}

// открыть редактор профайла
function openPopupAva() {
  popupAva.classList.add('popup_opened');
};
editButton.addEventListener('click', openPopupAva);

//открытие popup-карточка
function openPopupCards() {
  popupCards.classList.add('popup_opened');
}
newCardButton.addEventListener('click', openPopupCards);

// закрытие попап-ов через Х
popupClose.forEach((el) => {
  el.addEventListener('click', function () {
    let popup = Array.from(document.querySelectorAll('.popup'));
    for (let index = 0; index < popup.length; index++) {
      popup[index].classList.remove('popup_opened');
    }
  });
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// добавление 6 карточек
function newCard() {
  initialCards.forEach((item) => {
    const listItemElement = listItemTemplate.cloneNode(true);

    listItemElement.querySelector('.list__text').textContent = item.name;
    listItemElement.querySelector('.list__img').src = item.link;
    listItemElement.querySelector('.list__img').alt = item.name;


    // лайк
    listItemElement.querySelector('.list__like').addEventListener('click', handlLikeCard);


    listElement.prepend(listItemElement);


    // удаление карточки
    listElement.querySelector('.trash').addEventListener('click', deleteCard)


    // открыть карточку
    const openCards = document.querySelector('.list__img');
    openCards.addEventListener('click', function () {
      let popupCard = document.querySelector('.popup__open-cards');
      popupCard.classList.add('popup_opened')

      let img = popupCard.querySelector('.popup__image');
      let caption = popupCard.querySelector('.caption');

      img.src = item.link;
      caption.textContent = item.name;
    })

  });

};
newCard();


// редактирование данных профайла
function handleFormSubmit(evt) {
  evt.preventDefault();

  let popupName = popupAva.querySelector('.popup__item_type_name');
  let popupHobby = popupAva.querySelector('.popup__item_type_hobby');


  if (popupName.value.length === 0 || popupHobby.value.length === 0) {
    return alert('Необходимо ввести свое имя и хобби');
  };

  nameInput.textContent = popupName.value;
  hobbyInput.textContent = popupHobby.value;

  popupAva.classList.remove('popup_opened');
}
// сохрать данные профайла
formElementProfile.addEventListener('submit', handleFormSubmit);


// добавление карточки
function addCardSubmit(evt) {
  evt.preventDefault();

  const nameCard = popupCards.querySelector('.popup__item_type_name-card').value;
  const linkCard = popupCards.querySelector('.popup__item_type_link').value;

  if (nameCard.length === 0 || linkCard.length === 0) {
    return alert('Необходимо ввести название и ссылку');
  };

  const newArray = { name: nameCard, link: linkCard };

  initialCards.splice(0, 6, newArray);

  newCard();

  popupCards.classList.remove('popup_opened');
  evt.target.reset();
}
// сохранить карточку
formElementCard.addEventListener('submit', addCardSubmit);