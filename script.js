const apiKeys = "004fe90161c37a001b5f67fdb51e9e2f";
const apiBase = "https://api.openweathermap.org/data/2.5/weather";
let city;
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let cancelButton = document.getElementById("cancel-btn");
let searchBtn = document.getElementById("search-btn");
let searchText = document.getElementById("search-text");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("btn-search");
let WeatherIcon = document.querySelector(".weather-icon");
let errorCity = document.getElementById("err-city");

searchButton.addEventListener("click", () => {
  modal.style.display = "block";
});
span.addEventListener("click", () => {
  modal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  modal.style.display = "none";
});

searchInput.addEventListener("input", () => {
  city = searchInput.value;
  console.log(city);
  document.getElementById("loader1").style.opacity = "1";
});

searchBtn.addEventListener("click", async () => {
  const loader = document.getElementById("loader2");

  if (city) {
    cancelButton.style.display = "none";
    document.getElementById("search-btn").style.opacity = "0.5";
    searchBtn.disabled = true;
    loader.style.display = "inline-block";
    searchText.style.display = "none";

    try {
      const response = await fetch(`${apiBase}?q=${city}&appid=${apiKeys}`);
      if (response.status === 404) {
        // document.getElementById("error1").style.opacity = "1";
        document.querySelector(".weather").style.display = "none";
        searchBtn.disabled = true;
        searchBtn.classList.add("disabled");
        console.log("error");
        errorCity.style.display = "block";
        modal.style.display = "block";
      } else {
        const data = await response.json();
        document.getElementById("error1").style.opacity = "0";
        console.log(data);

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp - 273) + "°C";
        document.getElementById("humidity").innerHTML =
          data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML =
          data.wind.speed + "m/s";

        if (data.weather[0].main === "Haze") {
          WeatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clouds") {
          WeatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
          WeatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Clear") {
          WeatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Snow") {
          WeatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main === "Mist") {
          WeatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
          WeatherIcon.src = "images/drizzle.png";
        }
        document.querySelector(".weather").style.display = "block";
        modal.style.display = "none";
        errorCity.style.display = "none";
      }
      // await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      searchBtn.disabled = false;
      searchBtn.classList.remove("disabled");
      cancelButton.style.display = "block";
      loader.style.display = "none";
      searchText.style.display = "block";
      document.getElementById("search-btn").style.opacity = "1";
    }
  }
});
