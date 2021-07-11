const weatherContainer = document.querySelector("#weatherContainer");
const spans = document.querySelectorAll("#weather span");
const API_KEY = "373c39ecf1996e1a457d029cf06778cd";
const onGeoOK = (position) => {
  const {
    coords: { latitude: lat, longitude: lon },
  } = position;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr`;
  fetch(url).then((res) =>
    res.json().then((data) => {
      const img = document.createElement("img");
      const {
        name,
        weather,
        main: { temp },
      } = data;
      img.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      weatherContainer.prepend(img);
      spans[0].innerText = `${weather[0].description} ${temp}℃`;
      spans[1].innerText = name;
    })
  );
};

const onGeoError = () => {
  alert("Can't find you. No weather for you.");
};

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
