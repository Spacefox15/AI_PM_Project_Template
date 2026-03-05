import { fetchCoordinates, fetchWeather } from './api.js';
import { getWeatherDetails, formatHour, formatDay } from './utils.js';

// ============================================================
// app.js — Core application logic for Desktop Weather App
// ============================================================

const DOM = {
  form: document.getElementById('location-form'),
  input: document.getElementById('city-input'),
  refreshBtn: document.getElementById('refresh-btn'),
  weatherContent: document.getElementById('weather-content'),
  loadingState: document.getElementById('loading-state'),
  errorState: document.getElementById('error-state'),
  currentWeather: document.getElementById('current-weather'),
  hourlyForecast: document.getElementById('hourly-forecast'),
  dailyForecast: document.getElementById('daily-forecast'),

  // Data elements
  locationName: document.getElementById('location-name'),
  currentTemp: document.getElementById('current-temp'),
  weatherCondition: document.getElementById('weather-condition'),
  feelsLike: document.getElementById('feels-like'),
  tempHigh: document.getElementById('temp-high'),
  tempLow: document.getElementById('temp-low'),
};

const REFRESH_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
let refreshTimer = null;

// --- INITIALIZATION ---
function init() {
  attachEventListeners();

  const savedLocation = localStorage.getItem('weather_app_location');
  if (savedLocation) {
    DOM.input.value = savedLocation;
    loadWeatherForCity(savedLocation);
  } else {
    // Show form but no weather yet
    DOM.weatherContent.classList.remove('hidden');
    DOM.currentWeather.classList.add('hidden');
    DOM.errorState.classList.add('hidden');
    DOM.loadingState.classList.add('hidden');
  }
}

function attachEventListeners() {
  DOM.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = DOM.input.value.trim();
    if (city) {
      loadWeatherForCity(city);
    }
  });

  DOM.refreshBtn.addEventListener('click', () => {
    const city = localStorage.getItem('weather_app_location') || DOM.input.value.trim();
    if (city) {
      loadWeatherForCity(city);
    }
  });
}

// --- LOGIC ---
async function loadWeatherForCity(city) {
  showLoading();

  try {
    const coords = await fetchCoordinates(city);
    if (!coords) throw new Error("Location not found");

    // Save successful query
    localStorage.setItem('weather_app_location', city);
    localStorage.setItem('weather_app_display_name', coords.name);

    await updateWeatherData(coords.lat, coords.lon, coords.name);

    // Reset auto-refresh timer
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(() => updateWeatherData(coords.lat, coords.lon, coords.name), REFRESH_INTERVAL_MS);

  } catch (error) {
    showError();
  }
}

async function updateWeatherData(lat, lon, displayName) {
  showLoading();
  try {
    const data = await fetchWeather(lat, lon);
    renderWeather(data, displayName);
  } catch (error) {
    showError();
  }
}

// --- RENDERING ---
function renderWeather(data, displayName) {
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  // 1. Render Current View
  DOM.locationName.textContent = displayName;
  DOM.currentTemp.textContent = Math.round(current.temperature_2m);
  DOM.feelsLike.textContent = `${Math.round(current.apparent_temperature)}°`;

  DOM.tempHigh.textContent = Math.round(daily.temperature_2m_max[0]);
  DOM.tempLow.textContent = Math.round(daily.temperature_2m_min[0]);

  const currentDetails = getWeatherDetails(current.weather_code);
  DOM.weatherCondition.textContent = `${currentDetails.icon} ${currentDetails.label}`;

  // 2. Render Hourly Forecast (Next 24 Hours)
  renderHourlyForecast(hourly);

  // 3. Render Daily Forecast (Next 5 Days starting from tomorrow)
  renderDailyForecast(daily);

  // Show Content
  DOM.loadingState.classList.add('hidden');
  DOM.errorState.classList.add('hidden');
  DOM.currentWeather.classList.remove('hidden');
  DOM.hourlyForecast.classList.remove('hidden');
  DOM.dailyForecast.classList.remove('hidden');
}

function renderHourlyForecast(hourly) {
  DOM.hourlyForecast.innerHTML = '';

  // Find current hour index based on current time (rough estimation simply taking first 24 items starting near now)
  // For simplicity since open-meteo returns based on hour 0 of today, we find the first index that is >= now.
  const now = new Date();
  let startIndex = 0;
  for (let i = 0; i < hourly.time.length; i++) {
    const time = new Date(hourly.time[i]);
    if (time >= now) {
      startIndex = i;
      break;
    }
  }

  // Render next 24 hours
  for (let i = startIndex; i < startIndex + 24 && i < hourly.time.length; i++) {
    const timeISO = hourly.time[i];
    const temp = Math.round(hourly.temperature_2m[i]);
    const details = getWeatherDetails(hourly.weather_code[i]);

    // If it's the exact start hour, label as "Now"
    let timeLabel = i === startIndex ? "Now" : formatHour(timeISO);

    const div = document.createElement('div');
    div.className = 'hourly-item';
    div.innerHTML = `
      <span class="hourly-time">${timeLabel}</span>
      <span class="hourly-icon">${details.icon}</span>
      <span class="hourly-temp">${temp}°</span>
    `;
    DOM.hourlyForecast.appendChild(div);
  }
}

function renderDailyForecast(daily) {
  DOM.dailyForecast.innerHTML = '';

  // Render next 5 days, starting from tomorrow (index 1)
  for (let i = 1; i <= 5 && i < daily.time.length; i++) {
    const timeISO = daily.time[i];
    const details = getWeatherDetails(daily.weather_code[i]);
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);

    const div = document.createElement('div');
    div.className = 'daily-item';
    div.innerHTML = `
      <span class="daily-day">${formatDay(timeISO)}</span>
      <span class="daily-icon">${details.icon}</span>
      <span class="daily-temps">${max}° <span class="daily-low">${min}°</span></span>
    `;
    DOM.dailyForecast.appendChild(div);
  }
}

// --- STATE MANAGEMENT ---
function showLoading() {
  DOM.weatherContent.classList.remove('hidden');
  DOM.loadingState.classList.remove('hidden');
  DOM.errorState.classList.add('hidden');
  DOM.currentWeather.classList.add('hidden');
  DOM.hourlyForecast.classList.add('hidden');
  DOM.dailyForecast.classList.add('hidden');
}

function showError() {
  DOM.weatherContent.classList.remove('hidden');
  DOM.errorState.classList.remove('hidden');
  DOM.loadingState.classList.add('hidden');
  DOM.currentWeather.classList.add('hidden');
  DOM.hourlyForecast.classList.add('hidden');
  DOM.dailyForecast.classList.add('hidden');
}

// Boot the app
document.addEventListener("DOMContentLoaded", init);
