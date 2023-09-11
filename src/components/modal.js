import {
  content,
  popupNameProfile,
  popupHobbyProfile,
  popupProfile,
  popupAva,
} from "./constans.js";

import { closePopup, renderLoading } from "./utils.js";

import { editProfile, editAva } from "./api.js";

const profileName = content.querySelector(".profile__name");
const profileHobby = content.querySelector(".profile__hobby");

// редактирование данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  evt.submitter.disabled = true;

  editProfile(popupNameProfile.value, popupHobbyProfile.value)
    .then((res) => {
      const { name, about } = res;
      profileName.textContent = name;
      profileHobby.textContent = about;
      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

const imgAva = content.querySelector(".profile__img");
const linkOnAva = popupAva.querySelector(".popup__item_type_ava");

// редактировать фото авы
function editPhotoAva(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  editAva(linkOnAva.value)
    .then((res) => {
      imgAva.src = res.avatar;
      closePopup(popupAva);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, evt.submitter);
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
