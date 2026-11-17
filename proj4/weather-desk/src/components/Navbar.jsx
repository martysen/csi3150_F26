import { Link } from "react-router-dom";
import { useWeatherStore } from "../store/useWeatherStore";

/**
 * Top bar with the brand link and the °C / °F toggle.
 *
 * This component is the "writer" of the global `units` value. It is not a
 * parent or child of CityPage, yet clicking the toggle makes CityPage
 * refetch in the new units. That cross-component link is exactly what the
 * store provides, with no props and no Provider.
 *
 * Two selectors, one value each: Navbar re-renders only when `units`
 * changes. (toggleUnits is a stable function, so it never triggers one.)
 */
export default function Navbar() {
  const units = useWeatherStore((s) => s.units);
  const toggleUnits = useWeatherStore((s) => s.toggleUnits);

  const isCelsius = units === "celsius";

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <span aria-hidden="true">🌤️</span> Weather Desk
        </Link>

        <button
          type="button"
          className="unit-toggle"
          onClick={toggleUnits}
          aria-label={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
        >
          <span
            className={
              isCelsius ? "unit-toggle__opt is-active" : "unit-toggle__opt"
            }
          >
            °C
          </span>
          <span
            className={
              !isCelsius ? "unit-toggle__opt is-active" : "unit-toggle__opt"
            }
          >
            °F
          </span>
        </button>
      </div>
    </header>
  );
}
