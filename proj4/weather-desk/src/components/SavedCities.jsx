import { Link } from "react-router-dom";
import { useWeatherStore } from "../store/useWeatherStore";
import { cityPath } from "../utils/city";

/**
 * List of favorite cities, read straight from the global store.
 *
 * HomePage renders this component without passing it a single prop. CityPage
 * (a completely different branch of the component tree) adds cities to the
 * same store, and this list updates automatically.
 */
export default function SavedCities() {
  const savedCities = useWeatherStore((s) => s.savedCities);
  const removeCity = useWeatherStore((s) => s.removeCity);

  return (
    <section className="panel">
      <h2 className="panel__title">Saved cities</h2>

      {savedCities.length === 0 ? (
        <p className="muted">
          Nothing saved yet. Open a city and press “Save city” to pin it here.
        </p>
      ) : (
        <ul className="saved">
          {savedCities.map((city) => (
            <li key={city.id} className="saved__item">
              <Link className="saved__link" to={cityPath(city)}>
                {city.label}
              </Link>
              <button
                type="button"
                className="icon-btn"
                onClick={() => removeCity(city.id)}
                aria-label={`Remove ${city.label}`}
                title="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
