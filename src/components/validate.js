// показать ошибки форм
const showInputError = ({
  formElement,
  inputElement,
  errorMesage,
  inputErrorClass,
  errorClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMesage;
};

// скрыть ошибки форм
const hideInputError = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

// проверка и вызов ф-ции
const isValid = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      errorMesage: inputElement.validationMessage,
      inputErrorClass,
      errorClass,
    });
  } else {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  }
};

// невалидный импут
const hasInvalidInput = (inputList) => {
  return inputList?.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// активация кнопки
const toggleButtonState = ({
  inputList,
  buttonElement,
  inactiveButtonClass,
}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// слушатель
const setEventListeners = ({
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState({ inputList, buttonElement, inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid({ formElement, inputElement, inputErrorClass, errorClass });
      toggleButtonState({ inputList, buttonElement, inactiveButtonClass });
    });
  });
};

// вкл проверки
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submint", (evt) => {
      evt.preventDefault();
    });
    setEventListeners({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
};

// сброс ошибок валидации после закрытия попапов
function clearFormError() {
  const spanLists = document.querySelectorAll(".popup__item-error_active");
  const inputLists = document.querySelectorAll(".popup__item_type_error");
  spanLists.forEach((span) => {
    span.classList.remove("popup__item-error_active");
  });
  inputLists.forEach((input) => {
    input.classList.remove("popup__item_type_error");
  });
}

export {
  showInputError,
  hideInputError,
  isValid,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
  clearFormError,
};
