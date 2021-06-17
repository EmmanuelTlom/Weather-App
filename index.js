const body = document.querySelector("body");
const display = document.querySelector(".page");
const main = document.querySelector(".main");
const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const alertP = document.querySelector(".alert");
const loader = document.getElementById("loading");
const modeToggler = document.querySelector(".darkModeToggler");

const dark = localStorage.getItem("darkMode");

if (dark === "dark") {
  enableDarkMode();
}
function enableDarkMode() {
  localStorage.setItem("darkMode", "dark");
  body.classList.add("dark");
}

function disableDarkMode() {
  localStorage.setItem("darkMode", null);
  body.classList.remove("dark");
}

modeToggler.addEventListener("click", () => {
  mode = localStorage.getItem("darkMode");
  if (mode !== "dark") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

const apiKey = "ea2eca06fa9b529b226b117145404d05";

const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function fetchWeather(city) {
  displayLoader();
  const resp = await fetch(apiUrl(city));
  const responseData = await resp.json();

  if (city !== responseData.name) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    wrapper.innerHTML = `
  

        <section class="err-section">
          <div class="errMsg">
            <h1>${responseData.message}, Please enter a valid city.</h1>
          </div>
        </section>
  
  
  
  `;

    main.innerHTML = "";

    main.append(wrapper);
  }

  console.log(responseData);
  hideLoader();

  createUi(responseData);
  //hideLoader();
}

//fetchWeather("Lagos");

function createUi(data) {
  //const date = new Date().toString();
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  wrapper.innerHTML = `
  

        <section class="more-details">
          <div class="wrap">
            <div class="date">
              <h3>${data.name}</h3>
              
            </div>
            <p>${data.weather[0].main}</p>
          </div>

          <div class="img">
            <img class='image'  src="https://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png" alt="weather image" />
          </div>

          <h1>${conversion(data.main.temp)}°C</h1>
        </section>

        <section class="other-details">
          <h4 class="wind">Country:  ${data.sys.country} </h4>
          <h4 class="wind">Wind-speed:  ${data.wind.speed} </h4>
          <h4 class="wind">Humidity:  ${data.main.humidity}</h4>
        </section>
  
  
  
  `;

  main.innerHTML = "";

  main.append(wrapper);
}

function conversion(kelvin) {
  return Math.floor(kelvin - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alertFunction("Please enter a valid city", "danger");
  }

  searchInput.value = "";
});

function alertFunction(alertMsg, style) {
  alertP.textContent = alertMsg;
  alertP.classList.add(`${style}`);

  setTimeout(() => {
    alertP.textContent = "";
    alertP.classList.remove(`${style}`);
  }, 2000);
}

function displayLoader() {
  loader.classList.add("display");
  main.classList.add("hide");
  setTimeout(() => {
    loader.classList.remove("display");
    main.classList.remove("hide");
  }, 2000);
}

function hideLoader() {
  loader.classList.remove("display");
  main.classList.remove("hide");
}

/*
<h3 class="city-name">${data.name}</h3>
        <h6 class="date">${date}</h6>

        <div class="temperature">${conversion(data.main.temp)}°C</div>
        <hr />

        <div class='weather-details'>
        <p class="weather-type">${data.weather[0].main}</p>

        <img class='img' src='https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png'/>
        </div>

        <section class="weather-details">
          <h3>${data.name}</h3>
          <div class="img">
            <img class='image' src="https://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png" alt="weather image" />
          </div>

          <div class="temp">
            <h3>${conversion(data.main.temp)}°C</h3>
            <p>weather type</p>
          </div>
        </section>





*/
