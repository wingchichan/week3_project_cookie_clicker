let totalCookies = 0;
let cookies = 1;

const cookieDisplay = document.getElementById("totalNumber");

const cps = document.getElementById("cpsNumber");

function setup() {
  const existingTotalCookies = localStorage.getItem("totalCookies");
  if (existingTotalCookies != null) {
    totalCookies = +existingTotalCookies;
  }
  cookieDisplay.innerText = totalCookies;

  const existingCPScookies = localStorage.getItem("cookies");
  if (existingCPScookies != null) {
    cookies = +existingCPScookies;
  }
  cps.innerText = cookies;

  const cookieButton = document.getElementById("cookieButton");
  cookieButton.addEventListener("click", addCPStoTotal);

  // make totalCookies increment every second
  const timerInterval = setInterval(addCPStoTotal, 1000);
}

function addCPStoTotal() {
  totalCookies += cookies;
  cookieDisplay.innerText = totalCookies;
  localStorage.setItem("totalCookies", totalCookies);
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
  setup();
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
      if (totalCookies < shopProduct[i].cost) {
        alert("You don't have enough cookies!");
      } else {
        totalCookies = totalCookies - shopProduct[i].cost;
        cookieDisplay.innerText = totalCookies;
        cookies = cookies + shopProduct[i].increase;
        localStorage.setItem("cookies", cookies);
        cps.innerText = cookies;
      }
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
    productDiv.appendChild(buyButton);

    shopContainer.appendChild(productDiv);
  }
}

// function resetGame() {
//   totalCookies = 0;
//   cookieDisplay.innerText = totalCookies;
//   cookies = 0;
//   cps.innerText = cookies;
//   localStorage.setItem("totalCookies", totalCookies);
//   localStorage.setItem("cookies", cookies);
// }

// const resetGame = document.getElementById("reset");
// resetGame.addEventListener("click", resetGame);
