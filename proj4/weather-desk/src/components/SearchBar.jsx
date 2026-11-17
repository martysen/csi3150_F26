import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { buildSearchUrl } from "../api/openMeteo";
import { cityFromGeocode, cityPath } from "../utils/city";

/**
 * City search with live suggestions.
 *
 * Data flow (each arrow is one concept from the course):
 *
 *   keystroke -> query                 controlled input (useState)
 *   query     -> debounced             useDebounce (effect + cleanup)
 *   debounced -> url | null            plain derived value, no state needed
 *   url       -> { data, loading }     useFetch (async/await + AbortController)
 *   data      -> list of <Link>s       conditional rendering
 *   Enter     -> navigate(...)         useNavigate
 *
 * Local state vs global state: the text in this box matters to no other
 * component, so it stays in plain useState. Only state that several distant
 * components share belongs in the zustand store.
 */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Wait until the user pauses typing before hitting the API.
  const debouncedQuery = useDebounce(query.trim(), 400);

  // The API needs at least 2 characters to be useful. Passing null to
  // useFetch means "don't fetch".
  const url =
    debouncedQuery.length >= 2 ? buildSearchUrl(debouncedQuery) : null;
  const { data, loading, error } = useFetch(url);

  // When nothing matches, the API omits `results` entirely.
  const cities = (data?.results ?? []).map(cityFromGeocode);

  /** Pressing Enter jumps straight to the top suggestion. */
  function handleSubmit(event) {
    event.preventDefault(); // stop the browser's full-page form submit
    if (cities.length > 0) {
      navigate(cityPath(cities[0]));
      setQuery("");
    }
  }

  return (
    <section className="panel">
      <form className="search" onSubmit={handleSubmit}>
        <label htmlFor="city-search" className="label">
          Search for a city
        </label>
        <div className="search__row">
          <input
            id="city-search"
            className="input"
            type="text"
            placeholder="e.g. Detroit, Tokyo, Lisbon"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" type="submit" disabled={cities.length === 0}>
            Go
          </button>
        </div>
      </form>

      {/* Suggestion area: exactly one of these states shows at a time. */}
      {loading && <p className="muted status">Searching…</p>}

      {error && <p className="error status">Search failed: {error}</p>}

      {!loading && !error && url && cities.length === 0 && (
        <p className="muted status">No cities found for “{debouncedQuery}”.</p>
      )}

      {cities.length > 0 && (
        <ul className="results">
          {cities.map((city) => (
            <li key={city.id}>
              <Link
                className="results__link"
                to={cityPath(city)}
                onClick={() => setQuery("")}
              >
                {city.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
