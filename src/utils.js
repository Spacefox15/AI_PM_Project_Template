// ============================================================
// utils.js — Helper functions for app logic
// ============================================================

/**
 * Maps WMO Weather codes to a descriptive string and matching emoji icon.
 * @param {number} code - The WMO code provided by Open-Meteo
 * @returns {Object} { label: "Condition", icon: "🌤️" }
 */
export function getWeatherDetails(code) {
    const mapping = {
        0: { label: "Clear", icon: "☀️" },
        1: { label: "Mostly Clear", icon: "🌤️" },
        2: { label: "Partly Cloudy", icon: "⛅" },
        3: { label: "Overcast", icon: "☁️" },
        45: { label: "Fog", icon: "🌫️" },
        48: { label: "Freezing Fog", icon: "🌫️" },
        51: { label: "Light Drizzle", icon: "🌧️" },
        53: { label: "Drizzle", icon: "🌧️" },
        55: { label: "Heavy Drizzle", icon: "🌧️" },
        56: { label: "Light Freezing Drizzle", icon: "🌧️" },
        57: { label: "Heavy Freezing Drizzle", icon: "🌧️" },
        61: { label: "Light Rain", icon: "🌦️" },
        63: { label: "Rain", icon: "🌧️" },
        65: { label: "Heavy Rain", icon: "🌧️" },
        66: { label: "Light Freezing Rain", icon: "🌧️" },
        67: { label: "Heavy Freezing Rain", icon: "🌧️" },
        71: { label: "Light Snow", icon: "🌨️" },
        73: { label: "Snow", icon: "❄️" },
        75: { label: "Heavy Snow", icon: "❄️" },
        77: { label: "Snow Grains", icon: "❄️" },
        80: { label: "Light Showers", icon: "🌦️" },
        81: { label: "Showers", icon: "🌧️" },
        82: { label: "Heavy Showers", icon: "🌧️" },
        85: { label: "Light Snow Showers", icon: "🌨️" },
        86: { label: "Heavy Snow Showers", icon: "❄️" },
        95: { label: "Thunderstorm", icon: "⛈️" },
        96: { label: "Thunderstorm + Hail", icon: "⛈️" },
        99: { label: "Heavy Thunderstorm", icon: "⛈️" }
    };

    return mapping[code] || { label: "Unknown", icon: "❓" };
}

/**
 * Formats an ISO 8601 date string into a short hour (e.g., "3 PM")
 */
export function formatHour(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: 'numeric' });
}

/**
 * Formats an ISO 8601 date string into a short weekday name (e.g., "Mon")
 */
export function formatDay(isoString) {
    const date = new Date(isoString);
    // Add timezone offset to prevent shifting a day backwards on conversion
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() + userTimezoneOffset);

    return localDate.toLocaleDateString([], { weekday: 'short' });
}
