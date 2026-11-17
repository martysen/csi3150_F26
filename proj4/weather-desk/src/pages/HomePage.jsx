import SearchBar from "../components/SearchBar";
import SavedCities from "../components/SavedCities";

/**
 * Landing page: search at the top, favorites below.
 *
 * The page itself holds no state and passes no props. Each child gets what
 * it needs on its own (SearchBar from local state + the API, SavedCities
 * from the store).
 */
export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Weather, without the noise.</h1>
        <p className="muted">
          Search any city, check the forecast, save your favorites.
        </p>
      </section>

      <SearchBar />
      <SavedCities />
    </>
  );
}
