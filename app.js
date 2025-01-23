let totalCookies = 500;
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
  localStorage.setItem("totalCookies", totalCookies);
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
// const timerInterval = setInterval(function () {
//   totalCookies += 1;
//   cookieDisplay.innerText = totalCookies;
//   localStorage.setItem("totalCookies", totalCookies);
// }, 1000);

async function fetchData() {
  const data = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  // api data is read in json
  // jvsdata now holds the meaningful data that we want
  const jvsdata = await data.json();
  // can see the data we want in the console
  //   console.log(jvsdata);

  // we want to display the jvsdata on screen which is an array
  for (let i = 0; i < jvsdata.length; i++) {
    const buyButton = document.createElement("button");
    document.body.appendChild(buyButton);
    buyButton.innerText = "Buy";
    buyButton.addEventListener("click", function () {
      totalCookies = totalCookies - jvsdata[i].cost;
      cookieDisplay.innerText = totalCookies;
      cookies = cookies + jvsdata[i].increase;
      cps.innerText = cookies;
    });
    // creating p tag
    const shopItemName = document.createElement("p");
    // appending p tag into DOM
    document.body.appendChild(shopItemName);
    // populating the p tag
    shopItemName.innerText = jvsdata[i].name;

    const shopItemCost = document.createElement("p");
    document.body.appendChild(shopItemCost);
    shopItemCost.innerText = jvsdata[i].cost;

    const increaseCookiesBy = document.createElement("p");
    document.body.appendChild(increaseCookiesBy);
    increaseCookiesBy.innerText = jvsdata[i].increase;
  }
}
fetchData();
