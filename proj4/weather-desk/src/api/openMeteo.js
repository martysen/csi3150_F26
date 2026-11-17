/**
 * Open-Meteo API helpers.
 *
 * Open-Meteo is free for non-commercial use and needs NO API key. We use two
 * of its endpoints:
 *
 *   1. Geocoding  - turns a text query ("Paris") into coordinates.
 *   2. Forecast   - turns coordinates into current conditions + daily forecast.
 *
 * These functions only BUILD URLs. They do not call fetch(). Keeping URL
 * construction separate from fetching makes the URLs easy to inspect (paste
 * one into the browser!) and lets the useFetch hook stay generic.
 */

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * URL for the geocoding search.
 *
 * Response shape (abridged):
 *   { results: [ { id, name, latitude, longitude, country, admin1 }, ... ] }
 *
 * Gotcha: when nothing matches, the `results` key is ABSENT (not an empty
 * array), so callers should use `data.results ?? []`.
 *
 * @param {string} name  Text typed by the user.
 */
export function buildSearchUrl(name) {
  const params = new URLSearchParams({
    name,
    count: "6",
    language: "en",
    format: "json",
  });
  return `${GEOCODING_URL}?${params}`;
}

/**
 * URL for the forecast.
 *
 * `units` comes from the zustand store. Open-Meteo converts on the server,
 * so toggling units means requesting NEW data, not converting locally. That
 * is why `units` ends up in the dependency array of the fetch effect.
 *
 * Response shape (abridged):
 *   {
 *     current_units: { temperature_2m: '°C', wind_speed_10m: 'km/h', ... },
 *     current: { temperature_2m, apparent_temperature, relative_humidity_2m,
 *                wind_speed_10m, weather_code },
 *     daily: { time: [...], weather_code: [...], temperature_2m_max: [...],
 *              temperature_2m_min: [...], precipitation_probability_max: [...] }
 *   }
 * `daily` holds parallel arrays: index 0 of every array is the same day.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {'celsius'|'fahrenheit'} units
 */
export function buildForecastUrl(latitude, longitude, units) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    temperature_unit: units, // 'celsius' | 'fahrenheit'
    wind_speed_unit: units === "fahrenheit" ? "mph" : "kmh",
    timezone: "auto", // day boundaries in the city's own time zone
    forecast_days: "5",
  });
  return `${FORECAST_URL}?${params}`;
}

/**
 * Hardcoded response used when the real request fails (offline, rate limit,
 * classroom Wi-Fi...). It mimics the shape of the real response so
 * <WeatherCard> does not need to know the difference.
 *
 * @param {'celsius'|'fahrenheit'} units
 */
export function getFallbackWeather(units) {
  const fahrenheit = units === "fahrenheit";
  const t = (celsius) =>
    fahrenheit ? Math.round((celsius * 9) / 5 + 32) : celsius;

  const today = Date.now();
  const days = [0, 1, 2, 3, 4].map((i) =>
    new Date(today + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  );

  return {
    current_units: {
      temperature_2m: fahrenheit ? "°F" : "°C",
      apparent_temperature: fahrenheit ? "°F" : "°C",
      relative_humidity_2m: "%",
      wind_speed_10m: fahrenheit ? "mp/h" : "km/h",
    },
    current: {
      temperature_2m: t(18),
      apparent_temperature: t(16),
      relative_humidity_2m: 62,
      wind_speed_10m: fahrenheit ? 9 : 14,
      weather_code: 2,
    },
    daily: {
      time: days,
      weather_code: [2, 3, 61, 1, 0],
      temperature_2m_max: [t(20), t(19), t(16), t(21), t(23)],
      temperature_2m_min: [t(11), t(10), t(9), t(12), t(13)],
      precipitation_probability_max: [10, 20, 70, 5, 0],
    },
  };
}
