// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

//Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  fetch(`${weatherApi}${state}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data);
      clearError();
      stateInput.value = "";
    })
    .catch((errorObject) => {
      console.log(errorObject.message);
      showError(errorObject.message);
    });
}

function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = `${data.title}: ${data.features.length}`;
  alertsDisplay.append(summary);

  const list = document.createElement("ul");
  data.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature.properties.headline;
    list.append(item);
  });
  alertsDisplay.append(list);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});
