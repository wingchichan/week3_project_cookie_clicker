let totalCookies = 5000;
let cookies = 1;

// creating h2 and p tag elements and storing it into a variable
const totalHeader = document.createElement("h2");
const cookieDisplay = document.createElement("p");

// appending the h2 and p tag variables to the DOM/ body
document.body.appendChild(totalHeader);
document.body.appendChild(cookieDisplay);
totalHeader.innerText = "Cookie Jar";
cookieDisplay.innerText = totalCookies;

// creating the h3 and p tag for the cps bit and appending the relevant values to display
const cpsHeader = document.createElement("h3");
const cps = document.createElement("p");
document.body.appendChild(cpsHeader);
document.body.appendChild(cps);
cpsHeader.innerText = "Cookies Added per Second";
cps.innerText = cookies;

// appending the above inside a container
const headerContainer = document.createElement("div");
headerContainer.setAttribute("id", "headerContainer");
document.body.appendChild(headerContainer);
headerContainer.appendChild(totalHeader);
headerContainer.appendChild(cookieDisplay);
headerContainer.appendChild(cpsHeader);
headerContainer.appendChild(cps);

const cookieButton = document.getElementById("cookieButton");
cookieButton.addEventListener("click", function () {
  totalCookies += 1;
  // within the pTag we want to show the number of cookies i.e. the global cookie variable
  cookieDisplay.innerText = totalCookies;
  localStorage.setItem("totalCookies", totalCookies);
});

// make totalCookies increment every second
const timerInterval = setInterval(function () {
  totalCookies += 1;
  cookieDisplay.innerText = totalCookies;
  localStorage.setItem("totalCookies", totalCookies);
}, 1000);

async function fetchData() {
  const data = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  // api data is read in json
  // jvsdata now holds the meaningful data that we want
  const jvsdata = await data.json();
  // can see the data we want in the console
  //   console.log(jvsdata);

  // we have given this function an argument of the data above so when we call it below the function knows it needs to look for that data, regardless of what we call it below.
  displayShop(jvsdata);
}
fetchData();

const shopContainer = document.createElement("div");
shopContainer.setAttribute("id", "shopContainer");
// document.body.appendChild(shopContainer);
// shopContainer.innerText = displayShop(shopProduct);

//   we want to display the jvsdata on screen which is an array. need to pass in an argument in the function so the function knows there's data
function displayShop(shopProduct) {
  for (let i = 0; i < shopProduct.length; i++) {
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";
    document.body.appendChild(shopContainer).appendChild(buyButton);
    buyButton.addEventListener("click", function () {
      totalCookies = totalCookies - shopProduct[i].cost;
      cookieDisplay.innerText = totalCookies;
      cookies = cookies + shopProduct[i].increase;
      cps.innerText = cookies;
    });
    // creating p tag
    const shopItemName = document.createElement("p");
    // appending p tag into DOM
    document.body.appendChild(shopContainer).appendChild(shopItemName);
    // populating the p tag
    shopItemName.innerText = shopProduct[i].name;

    const shopItemCost = document.createElement("p");
    document.body.appendChild(shopContainer).appendChild(shopItemCost);
    shopItemCost.innerText = shopProduct[i].cost;

    const increaseCookiesBy = document.createElement("p");
    document.body.appendChild(shopContainer).appendChild(increaseCookiesBy);
    increaseCookiesBy.innerText = shopProduct[i].increase;
  }
}
