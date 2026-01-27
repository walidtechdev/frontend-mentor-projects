const slider = document.querySelector(".password__slider");
const displayValue = document.querySelector(".length__number");
const inputCase = document.querySelectorAll(".case");
const copyButton = document.querySelector(".password__copy");
const passwordDisplay = document.querySelector(".password__display");
const btnGenerate = document.querySelector(".btn__generate");
const strengthBars = document.querySelectorAll(".rectangle");

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function sliderDisplay() {
  displayValue.textContent = slider.value;
  slider.addEventListener("input", () => {
    displayValue.textContent = slider.value;
  });
}

function checkboxColor() {
  inputCase.forEach((element) => {
    element.addEventListener("change", () => {
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

function buildCharacterPool() {
  let pool = "";

  inputCase.forEach((checkbox) => {
    if (checkbox.checked) {
      if (checkbox.name === "uppercase") pool += UPPERCASE;
      if (checkbox.name === "lowercase") pool += LOWERCASE;
      if (checkbox.name === "numbers") pool += NUMBERS;
      if (checkbox.name === "symbols") pool += SYMBOLS;
    }
  });

  return pool;
}

function generatePassword(length, pool) {
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }

  return password;
}

function calculateStrength(password, checkedCount) {
  let score = 0;

  // Length scoring: 0-3 points
  const length = password.length;
  if (length >= 10) score += 3;
  else if (length >= 8) score += 2;
  else if (length >= 4) score += 1;

  // Diversity scoring: 0-3 points
  if (checkedCount === 4) score += 3;
  else if (checkedCount === 3) score += 2;
  else if (checkedCount === 2) score += 1;

  // Maximum total: 6 points
  if (score >= 6) return "very-strong";
  if (score >= 5) return "strong";
  if (score >= 3) return "medium";
  return "weak";
}

function updateStrengthIndicator(strength) {
  // Reset all bars
  strengthBars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
    bar.style.borderColor = "white";
  });

  let barsToFill = 0;
  let color = "";

  if (strength === "weak") {
    barsToFill = 1;
    color = "#F64A4A";
  } else if (strength === "medium") {
    barsToFill = 2;
    color = "#FB7C58";
  } else if (strength === "strong") {
    barsToFill = 3;
    color = "#F8CD65";
  } else if (strength === "very-strong") {
    barsToFill = 4;
    color = "#A4FFAF";
  }

  // Fill bars based on strength
  for (let i = 0; i < barsToFill; i++) {
    strengthBars[i].style.backgroundColor = color;
    strengthBars[i].style.borderColor = color;
  }
}

btnGenerate.addEventListener("click", () => {
  const isValid = validateCheckboxes();
  if (!isValid) return;

  const pool = buildCharacterPool();
  const length = slider.value;

  let checkedCount = 0;
  inputCase.forEach((checkbox) => {
    if (checkbox.checked) checkedCount++;
  });

  const password = generatePassword(length, pool);
  const strength = calculateStrength(password, checkedCount);

  passwordDisplay.textContent = password;
  updateStrengthIndicator(strength);
});

sliderDisplay();
checkboxColor();
copyPaste();
