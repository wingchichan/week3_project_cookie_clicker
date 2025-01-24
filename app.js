let totalCookies = 5000;
let cookies = 1;

const cookieDisplay = document.getElementById("totalNumber");

const cps = document.getElementById("cpsNumber");

function initHeader() {
  cookieDisplay.innerText = totalCookies;

  cps.innerText = cookies;

  const cookieButton = document.getElementById("cookieButton");
  cookieButton.addEventListener("click", function () {
    totalCookies += 1;
    cookieDisplay.innerText = totalCookies;
    localStorage.setItem("totalCookies", totalCookies);
  });

  // make totalCookies increment every second
  const timerInterval = setInterval(function () {
    totalCookies += cookies;
    cookieDisplay.innerText = totalCookies;
    localStorage.setItem("totalCookies", totalCookies);
  }, 1000);
}

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
function startGame() {
  initHeader();
  fetchData();
}

startGame();

const shopContainer = document.getElementById("shopContainer");

//   we want to display the jvsdata on screen which is an array. need to pass in an argument in the function so the function knows there's data
function displayShop(shopProduct) {
  for (let i = 0; i < shopProduct.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "product");
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";
    // appending the element inside the shopContainer
    productDiv.appendChild(buyButton);
    buyButton.addEventListener("click", function () {
      totalCookies = totalCookies - shopProduct[i].cost;
      cookieDisplay.innerText = totalCookies;
      cookies = cookies + shopProduct[i].increase;
      cps.innerText = cookies;
    });
    // creating p tag
    const shopItemName = document.createElement("p");
    // appending p tag into DOM
    productDiv.appendChild(shopItemName);
    // populating the p tag
    shopItemName.innerText = shopProduct[i].name;

    const shopItemCost = document.createElement("p");
    productDiv.appendChild(shopItemCost);
    shopItemCost.innerText = shopProduct[i].cost;

    const increaseCookiesBy = document.createElement("p");
    productDiv.appendChild(increaseCookiesBy);
    increaseCookiesBy.innerText = shopProduct[i].increase;

    shopContainer.appendChild(productDiv);
  }
}
