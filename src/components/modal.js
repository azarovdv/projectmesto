import { content } from "./constans.js";

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
