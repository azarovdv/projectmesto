//открыть попап
function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

//закрыть попап
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function renderLoading(isLoading, element, initialText = "Сохранить") {
  element.textContent = isLoading ? "Сохранение..." : initialText;
}

export { openPopup, closePopup, renderLoading };
