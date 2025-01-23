let totalCookies = 0;
let cookies = 1;

// creating h2 and p tag elements and storing it into a variable
const totalHeader = document.createElement("h2");
const cookieDisplay = document.createElement("p");

// appending the h2 and p tag variables to the DOM/ body
document.body.appendChild(totalHeader);
document.body.appendChild(cookieDisplay);
totalHeader.innerText = "Cookie Jar";
cookieDisplay.innerText = totalCookies;

const cookieButton = document.getElementById("cookieButton");
cookieButton.addEventListener("click", function () {
  totalCookies += 1;
  // within the pTag we want to show the number of cookies i.e. the global cookie variable
  cookieDisplay.innerText = totalCookies;
});

// creating the header and p tag for the cps bit and appending the relevant values to display
const cpsHeader = document.createElement("h3");
const cps = document.createElement("p");
cps.setAttribute("id", "cps");
document.body.appendChild(cpsHeader);
document.body.appendChild(cps);
cpsHeader.innerText = "Cookies Added per Second";
cps.innerText = cookies;

// make totalCookies increment every second
const timerInterval = setInterval(function () {
  totalCookies += 1;
  cookieDisplay.innerText = totalCookies;
}, 1000);
