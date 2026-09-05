const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",

  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",

  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",

  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "*",
  "(",
  ")",
  "_",
  "+",
  "-",
  "=",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  ",",
  ".",
  "<",
  ">",
  "?",
  "&",
  "~",
];

const generatePasswordButtonElement = document.querySelector("#generate-password");
const firstPasswordElement = document.querySelector("#first-password");
const secondPasswordElement = document.querySelector("#second-password");
const firstPasswordCopyIcon = document.querySelector("#first-password-copy");
const secondPasswordCopyIcon = document.querySelector("#second-password-copy");
const themeToggleElement = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const footerElement = document.querySelector("footer");
const THEME_KEY = "theme";

function generatePassword() {
  firstPasswordElement.textContent = "";
  secondPasswordElement.textContent = "";

  for (let i = 1; i <= 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    firstPasswordElement.textContent += characters[randomIndex];
  }

  for (let i = 1; i <= 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    secondPasswordElement.textContent += characters[randomIndex];
  }
}

generatePasswordButtonElement.addEventListener("click", generatePassword);

async function copyPassword(passwordElement, copyIcon) {
  try {
    await navigator.clipboard.writeText(passwordElement.textContent);

    copyIcon.classList.remove("ph-copy");
    copyIcon.classList.add("ph-check");

    setTimeout(() => {
      copyIcon.classList.remove("ph-check");
      copyIcon.classList.add("ph-copy");
    }, 2000);
  } catch (error) {
    console.error("Erro ao copiar a senha:", error);
  }
}

firstPasswordCopyIcon.addEventListener("click", () => {
  copyPassword(firstPasswordElement, firstPasswordCopyIcon);
});

secondPasswordCopyIcon.addEventListener("click", () => {
  copyPassword(secondPasswordElement, secondPasswordCopyIcon);
});

function setTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.classList.toggle("dark", isDark);
  
  themeIcon.classList.toggle("ph-sun", !isDark);
  themeIcon.classList.toggle("ph-moon", isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  
  setTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

themeToggleElement.addEventListener("click", toggleTheme);

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applySystemTheme(e) {
  if (!localStorage.getItem(THEME_KEY)) {
    setTheme(e.matches ? "dark" : "light");
  }
}

mediaQuery.addEventListener("change", applySystemTheme);

const savedTheme = localStorage.getItem(THEME_KEY);
const initialTheme = savedTheme || (mediaQuery.matches ? "dark" : "light");

setTheme(initialTheme);

footerElement.innerHTML = `<p>&copy ${new Date().getFullYear()} - Made with ❤️ and ☕ by Álisson</p>`;