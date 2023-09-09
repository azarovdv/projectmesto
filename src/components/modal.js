import {
  content,
  popupNameProfile,
  popupHobbyProfile,
  popupProfile,
  popupAva,
} from "./constans.js";

import { closePopup } from "./utils.js";

import { editProfile, editAva } from "../api.js";

const profileName = content.querySelector(".profile__name");
const profileHobby = content.querySelector(".profile__hobby");

// редактирование данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохрание...";

  editProfile(popupNameProfile.value, popupHobbyProfile.value)
    .then((res) => {
      const { name, about } = res;
      profileName.textContent = name;
      profileHobby.textContent = about;
      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

const imgAva = content.querySelector(".profile__img");
const linkOnAva = popupAva.querySelector(".popup__item_type_ava");

// редактировать фото авы
function editPhotoAva(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохрание...";

  editAva(linkOnAva.value)
    .then((res) => {
      imgAva.src = res.avatar;
      closePopup(popupAva);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
      evt.target.reset();
    });
}

export {
  handleProfileFormSubmit,
  editPhotoAva,
  profileName,
  profileHobby,
  imgAva,
};
