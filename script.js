"use strict";
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputLocator = document.querySelector(".form__input--locator");

// Global variable
let map;
let mapEvent;
let locations = [];

// Render locations
function renderLoc(val) {
  let html = `<li class="workout">
    <h2>${val}</h2>
  </li>`;
  form.insertAdjacentHTML("afterend", html);
}

navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];

    // loading the map
    map = L.map("map").setView(coords, 13);
    // rendering the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // adding a marker
    L.marker(coords)
      .addTo(map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          maxWidth: 250,
          minWidth: 100,
          className: "running-popup",
        })
      )
      .setPopupContent("Your Location")
      .openPopup();
    // click event on map
    map.on("click", (mapE) => {
      form.classList.remove("hidden");
      inputLocator.focus();
      mapEvent = mapE;
    });
  },
  () => {
    alert("Can't get the current location");
  }
);
// Form event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = inputLocator.value;
  // Clear the input fields
  inputLocator.value = "";
  // display the market
  const { lat, lng } = mapEvent.latlng;
  form.classList.add("hidden");
  // marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent(`${val}`)
    .openPopup();
  // location array
  locations.push(val);
  // render from list in sidebar
  renderLoc(val);
});
