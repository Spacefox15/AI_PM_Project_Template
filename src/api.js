// ============================================================
// api.js — API logic isolated per AI PM Portfolio Standards
// Open-Meteo API is used for both Geocoding and Weather
// ============================================================

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

/**
 * Converts a city name into latitude, longitude, and formatted name.
 * @param {string} city - The name of the city to search for.
 * @returns {Promise<Object|null>} { lat, lon, name } or null if not found.
 */
export async function fetchCoordinates(city) {
    try {
        const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const location = data.results[0];
            // Format the name nicely, e.g., "New York, New York, United States"
            const displayName = [location.name, location.admin1, location.country]
                .filter(Boolean)
                .join(", ");

            return {
                lat: location.latitude,
                lon: location.longitude,
                name: displayName
            };
        }

        return null; // No results found
    } catch (error) {
        console.error("Geocoding fetch error:", error);
        throw error;
    }
}

/**
 * Fetches current weather data for the given coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} The current weather data from Open-Meteo
 */
export async function fetchWeather(lat, lon) {
    try {
        // We request current temp, apparent temp (feels like), and today's high/low
        const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit&forecast_days=7`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Weather fetch failed");

        return await response.json();
    } catch (error) {
        console.error("Weather fetch error:", error);
        throw error;
    }
}
