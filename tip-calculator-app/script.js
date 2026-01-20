const inputs = document.querySelectorAll(".input");
const buttons = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn__reset");
const error = document.querySelector(".error__message");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("btn--active");
    });

    btn.classList.add("btn--active");
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", validateInput);
});

function validateInput(event) {
  const inputElement = event.target;
  const value = Number(inputElement.value);

  if (!Number.isNaN(value) && value > 0) {
    inputElement.style.border = "2px solid var(--clr-valid)";
  } else {
    inputElement.style.border = "2px solid var(--clr-error)";
  }
}

function buttonReset() {
  if (!Number.isNaN(value) && value > 0) {
    btnReset.classList.toggle("btn__reset--active");
  }
}

buttonReset();
