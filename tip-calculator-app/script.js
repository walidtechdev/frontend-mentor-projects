//**Bill management**
const billInput = document.querySelector(".bill__input");
const peopleInput = document.querySelector(".people__input");
const inputs = document.querySelectorAll(".input");
const buttons = document.querySelectorAll(".btn");
const error = document.querySelector(".error__message");

//*Manage buttons activation color*
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn--active")) {
      btn.classList.remove("btn--active");
    } else {
      buttons.forEach((button) => {
        button.classList.remove("btn--active");
      });

      btn.classList.add("btn--active");
    }
    checkConditions();
  });
});

//*Manage the color of the input*
inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    validateInput(event);
    checkConditions();
  });
});
//The value need to be >0
function validateInput(event) {
  const inputElement = event.target;
  const value = Number(inputElement.value);

  if (!Number.isNaN(value) && value > 0) {
    inputElement.style.border = "2px solid var(--clr-valid)";
    error.style.display = "none";
  } else {
    inputElement.style.border = "2px solid var(--clr-error)";
    error.style.display = "block";
  }
}

//**Tip management**
const priceAmount = document.querySelector(".price__amount");
const priceTotal = document.querySelector(".price__total");
const btnReset = document.querySelector(".btn__reset");

function checkConditions() {
  //Bill verification
  const billValue = Number(billInput.value);
  const billValide = !Number.isNaN(billValue) && billValue > 0;

  //People verification
  const peopleValue = Number(peopleInput.value);
  const peopleValide = !Number.isNaN(peopleValue) && peopleValue > 0;

  //Tip verification
  const tipActive = document.querySelector(".btn--active") !== null;

  if (tipActive && billValide && peopleValide) {
    btnReset.classList.add("btn__reset--active");
    calculateTip();
  } else {
    btnReset.classList.remove("btn__reset--active");
  }
}

btnReset.addEventListener("click", clearAll);
function clearAll() {
  if (!btnReset.classList.contains("btn__reset--active")) {
    return;
  } else {
    inputs.forEach((input) => {
      input.value = "";
      input.style.border = "";
    });

    buttons.forEach((btn) => {
      btn.classList.remove("btn--active");
    });

    btnReset.classList.remove("btn__reset--active");

    priceAmount.textContent = "0.00";
    priceTotal.textContent = "0.00";
  }
}
function calculateTip() {
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  let tipPercent;
  let noPercent;
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("btn--active")) {
      noPercent = buttons[i].textContent.replace("%", "");
      tipPercent = Number(noPercent);
      break;
    }
  }
  const tipAmount = ((bill * tipPercent) / 100 / people).toFixed(2);
  const tipTotal = (bill / people + Number(tipAmount)).toFixed(2);
  priceAmount.textContent = tipAmount.toString();
  priceTotal.textContent = tipTotal.toString();
}
