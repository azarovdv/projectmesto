import {
  content,
  popupNameProfile,
  popupHobbyProfile,
  popupProfile,
} from "./constans.js";

import { closePopup } from "./utils.js";

const ProfileName = content.querySelector(".profile__name");
const ProfileHobby = content.querySelector(".profile__hobby");

// редактирование данных профайла
function handleFormSubmit(evt) {
  evt.preventDefault();

  ProfileName.textContent = popupNameProfile.value;
  ProfileHobby.textContent = popupHobbyProfile.value;

  closePopup(popupProfile);
}

export { handleFormSubmit, ProfileName, ProfileHobby };
