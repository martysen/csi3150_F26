import { Link, useParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import { useFetch } from "../hooks/useFetch";
import { useWeatherStore } from "../store/useWeatherStore";
import { buildForecastUrl, getFallbackWeather } from "../api/openMeteo";
import { makeCity } from "../utils/city";

/**
 * Weather page for one city, at /city/:lat/:lon/:name
 *
 * This page is where the three big ideas of the demo meet:
 *
 *   1. ROUTER STATE   useParams() says WHICH city to show.
 *   2. GLOBAL STATE   the store says which UNITS to use and whether this city
 *                     is already saved.
 *   3. SERVER STATE   useFetch() loads the forecast for (city, units).
 *
 * Because `units` is part of the URL passed to useFetch, flipping the
 * °C/°F toggle in the Navbar changes the URL, the effect re-runs, and the
 * new forecast is fetched. This component never receives `units` as a prop.
 */
export default function CityPage() {
  // useParams always returns STRINGS, even for numeric-looking segments.
  const { lat, lon, name } = useParams();

  // Global state (one selector per value).
  const units = useWeatherStore((s) => s.units);
  const saveCity = useWeatherStore((s) => s.saveCity);
  const removeCity = useWeatherStore((s) => s.removeCity);

  // Rebuild the city from the URL so a refresh or shared link still works.
  const city = makeCity(lat, lon, name);

  // This selector returns a boolean (a primitive), so it is safe and cheap:
  // the component re-renders only when saved-or-not actually flips.
  const isSaved = useWeatherStore((s) =>
    s.savedCities.some((c) => c.id === city.id),
  );

  // Guard against hand-edited URLs such as /city/abc/xyz/Nowhere.
  const hasValidCoords =
    Number.isFinite(city.latitude) && Number.isFinite(city.longitude);
  const url = hasValidCoords
    ? buildForecastUrl(city.latitude, city.longitude, units)
    : null;

  // Hooks must run on every render, so call useFetch BEFORE any early return.
  const { data, loading, error } = useFetch(url);

  if (!hasValidCoords) {
    return (
      <section className="panel center">
        <h1>Invalid location</h1>
        <p className="muted">
          The coordinates in this address could not be read.
        </p>
        <Link className="btn" to="/">
          Back to search
        </Link>
      </section>
    );
  }

  // Graceful degradation: if the request failed, show placeholder data
  // (clearly labeled) instead of a blank screen.
  const usingFallback = Boolean(error);
  const weather = data ?? (usingFallback ? getFallbackWeather(units) : null);

  return (
    <>
      <div className="city-header">
        <div>
          <Link className="back" to="/">
            ← Back
          </Link>
          <h1 className="city-header__name">{city.label}</h1>
        </div>

        <button
          type="button"
          className={isSaved ? "btn btn--ghost" : "btn"}
          onClick={() => (isSaved ? removeCity(city.id) : saveCity(city))}
        >
          {isSaved ? "★ Saved" : "☆ Save city"}
        </button>
      </div>

      {loading && (
        <section className="panel center">
          <div className="spinner" aria-hidden="true" />
          <p className="muted">Loading forecast…</p>
        </section>
      )}

      {usingFallback && (
        <div className="banner" role="alert">
          Couldn't reach the weather service ({error}). Showing sample data.
        </div>
      )}

      {weather && <WeatherCard weather={weather} />}
    </>
  );
}
