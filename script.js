const API_KEY = "0c66c0c89d0b4639bec165726232003";

const $ = (selector) => document.querySelector(selector);

// Declarando variables para el escrito del uso de la API
let nameCity = $(".name");
let dateCity = $(".date");
let dayCity = $(".day");

let imageWeather = $(".location__image img");

let temperature = $(".info__box--temperature .temperature");
let condition__status = document.querySelectorAll(".info__box--status p");

let weatherdays = document.querySelector(".weekdays__container");
let weatherdays_image = document.querySelectorAll(".weekdays__box img");
let weatherdays_temperature = document.querySelectorAll(
  ".weekdays__box .temperature"
);
let weatherdays_date = document.querySelectorAll(".weekdays__box .date");
let weatherdays_day = document.querySelectorAll(".weekdays__box .day");

let main = $("#main");
let not__found = $(".not__found");

// Declaranado variables para los meses y días para dar formato a una fecha
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Cargar
window.onload = () => {
  fectchingWeather();
};

// Hacer una peticion
const fectchingWeather = (
  name = "Peru",
  url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${name}&days=7`
) => {
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          main.style.display = "none";
          not__found.style.display = "block";
        } else {
          main.style.display = "block";
          not__found.style.display = "none";

          const { location, current, forecast } = data;

          nameCity.innerText = location.country + ", " + location.name; // get name the city

          convertEpochDate(location.localtime_epoch, dateCity, dayCity);

          asignamentImageWeather(current.condition.text, imageWeather); // get url icon image

          temperature.textContent = current.temp_c + "°C"; // get temperature weather city

          // looping through the variable and printing on each paragraph
          condition__status.forEach(() => {
            condition__status[0].textContent = `Preasure, mm ${current.pressure_mb}`;
            condition__status[1].textContent = `Humidity, % ${current.humidity}`;
            condition__status[2].textContent = `Probability of precipitation, % ${current.precip_in}`;
            condition__status[3].textContent = `Wind, mph ${current.wind_mph}`;
          });

          const daysOfWeek = forecast.forecastday;
          weatherdays.innerHTML = "";

          daysOfWeek.map((e, index) => {
            let getDay = new Date(daysOfWeek[index].date).getDay();
            weatherdays.innerHTML += `<div class="weekdays__box">
            <img src="${asignamentImageWeather(
              daysOfWeek[index].day.condition.text,
              this
            )}" alt="${daysOfWeek[index].day.condition.text}">
            <h1 class="temperature">${daysOfWeek[index].day.maxtemp_c}°C</h1>
            <h1 class="date">${getMonthDay(daysOfWeek[index].date)}</h1>
            <h2 class="day">${days[getDay]}</h2>
          </div>`;
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

// get date format Epoch * 1000 == function
const convertEpochDate = (epoch, dateCity, dayCity) => {
  let timestamp = epoch * 1000;
  let date = new Date(timestamp);

  dateCity.textContent = `${months[date.getMonth()]} ${date.getDate()}`;
  dayCity.textContent = days[date.getDay()];
};

// Funcion para dar formato a una fecha mediante Date
const getMonthDay = (dateFormat) => {
  let day = dateFormat;
  let date = new Date(day);
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

// Funcion para asignar imagen
const asignamentImageWeather = (data, image) => {
  image.alt = data;
  switch (data) {
    case "Sunny":
    case "Clear":
      image.src = "/img/sunny.png";
      break;
    case "Cloudy":
    case "Overcast":
      image.src = "/img/overcast.png";
      break;
    case "Partly cloudy":
      image.src = "/img/cloudy-day.png";
      break;
    case "Heavy rain at times":
    case "Heavy rain":
    case "Light freezing rain":
    case "Light rain shower":
    case "Light rain":
    case "Moderate or heavy freezing rain":
    case "Moderate or heavy rain shower":
    case "Moderate rain at times":
    case "Moderate rain":
    case "Patchy light rain":
    case "Patchy rain possible":
    case "Torrential rain shower":
    case "Torrential rain shower":
      image.src = "/img/light-rain.png";
      break;
    case "Mist":
      image.src = "/img/mist.png";
      break;
    case "Light sleet showers":
    case "Light sleet":
    case "Moderate or heavy sleet showers":
    case "Moderate or heavy sleet":
    case "Patchy sleet possible":
    case "Sleet":
      image.src = "/img/sleet.png";
      break;
    case "Freezing drizzle":
    case "Heavy freezing drizzle":
    case "Light drizzle":
    case "Patchy freezing drizzle possible":
    case "Patchy light drizzle":
      image.src = "/img/drizzle.png";
      break;
    case "Blowing snow":
    case "Heavy snow":
    case "Light snow showers":
    case "Light snow":
    case "Moderate or heavy snow showers":
    case "Moderate snow":
    case "Patchy heavy snow":
    case "Patchy light snow":
    case "Patchy moderate snow":
      image.src = "/img/snow.png";
      break;
    case "Blizzard":
      image.src = "/img/blizzard.png";
      break;
    case "Fog":
    case "Freezing fog":
      image.src = "/img/fog.png";
      break;
    case "Ice pellets":
    case "Light showers of ice pellets":
    case "Moderate or heavy showers of ice pellets":
      image.src = "/img/granizo.png";
      break;
    case "Moderate or heavy rain with thunder":
    case "Moderate or heavy snow with thunder":
    case "Patchy light rain with thunder":
    case "Patchy light snow with thunder":
    case "Thundery outbreaks possible":
      image.src = "/img/storm.png";
      break;
    default:
      image.src = "";
      break;
  }
  return image.src;
};

// ** START : Impresion de datos mediante un Enter
let search = document.querySelector(".location");

search.addEventListener("keypress", (event) => {
  let name = search.value;
  if (event.key == "Enter") {
    fectchingWeather(name);
    searchResult__box.style.display = "none";
  }
});

// ** START : Listado de data de la ciudad mediante un input ingresado
let createFragment = document.createDocumentFragment();

let searchResult__box = document.querySelector(".searchResult__box");
let search__box = document.querySelector(".search__box");

search.addEventListener("input", async (e) => {
  searchResult__box.style.display = "block";
  searchResult__box.innerHTML =
    "<img class='loading--icon' src='/img/hearts.svg' alt='Loading...'>";
  try {
    let name = e.target.value;
    if (name.length == 0) {
      searchResult__box.style.display = "none";
    } else {
      response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${name}`
      );
      data = await response.json();

      // Si la data del json me arroja ningun resultado
      if (data.length === 0)
        return (searchResult__box.innerHTML =
          '<p style="text-align:center">No existen resultados</p>');
      else {
        data.forEach((item) => {
          let li = document.createElement("li"); // Creo un elemento
          li.textContent = `${item.region}, ${item.name}`; // Le asigno la data correspondiente
          li.onclick = () => {
            // Le doy un evento
            getLocation(item.lat, item.lon);
            searchResult__box.style.display = "none";
          };
          createFragment.appendChild(li); // Hago uso del fragment e imprimo los "li" dentro del fragment
        });
      }
      searchResult__box.innerHTML = ""; // Limpio mi caja principal
      searchResult__box.appendChild(createFragment); // Imprimo el fragment en mi caja principal
    }
  } catch (error) {
    console.log(error);
  }
});

// Obtener Ciudad mediante su latitud y longitud
getLocation = function (lat, lon) {
  let name = `${lat},${lon}`;
  fectchingWeather(name);
};
