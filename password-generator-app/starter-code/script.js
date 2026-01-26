const slider = document.querySelector(".password__slider");
const displayValue = document.querySelector(".length__number");
const inputCase = document.querySelectorAll(".case");
const copyButton = document.querySelector(".password__copy");
const passwordDisplay = document.querySelector(".password__display");

function sliderDisplay() {
  displayValue.textContent = slider.value;
  slider.addEventListener("input", () => {
    displayValue.textContent = slider.value;
    console.log(slider.value);
  });
}

function checkboxColor() {
  inputCase.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.checked) {
        element.classList.add("case--active");
      } else {
        element.classList.remove("case--active");
      }
    });
  });
}
function copyPaste() {
  copyButton.addEventListener("click", () => {
    const copy = passwordDisplay.textContent;
    navigator.clipboard.writeText(copy);
  });
}

function validateCheckboxes() {
  let checkedCount = 0;

  inputCase.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCount++;
    }
  });

  if (checkedCount === 0) {
    alert("Please select at least one option");
    return false;
  }

  return true;
}

copyPaste();
checkboxColor();
sliderDisplay();
