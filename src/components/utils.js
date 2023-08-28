//открыть попап
function openPopup(item) {
  item.classList.add("popup_opened");
}

//закрыть попап
function closePopup(item) {
  item.classList.remove("popup_opened");
}

export { openPopup, closePopup };
