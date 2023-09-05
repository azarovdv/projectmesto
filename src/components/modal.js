import {
  content,
  popupNameProfile,
  popupHobbyProfile,
  popupProfile,
} from "./constans.js";

import { closePopup } from "./utils.js";

const profileName = content.querySelector(".profile__name");
const profileHobby = content.querySelector(".profile__hobby");

// редактирование данных профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameProfile.value;
  profileHobby.textContent = popupHobbyProfile.value;

  closePopup(popupProfile);
}

export { handleProfileFormSubmit, profileName, profileHobby };
