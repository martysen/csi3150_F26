/**
 * City helpers.
 *
 * A "city" in this app is a plain object:
 *   { id: '48.853,2.349', label: 'Paris, Île-de-France, France',
 *     latitude: 48.853, longitude: 2.349 }
 *
 * The id is derived from the coordinates (rounded to 3 decimals, ~100 m).
 * That matters because the CityPage rebuilds the city from URL params, and
 * the id must come out identical to the one created from the search result.
 * Otherwise the "Saved" button could not tell whether this city is already
 * in the store.
 */

/**
 * Build a city object. Accepts numbers OR strings, because useParams()
 * always returns strings.
 */
export function makeCity(latitude, longitude, label) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  return {
    id: `${lat.toFixed(3)},${lon.toFixed(3)}`,
    label,
    latitude: lat,
    longitude: lon,
  };
}

/**
 * Convert one item of the geocoding API's `results` array into a city.
 * Joins name, region and country so "Paris, Texas" and "Paris, France"
 * are distinguishable.
 */
export function cityFromGeocode(result) {
  const label = [result.name, result.admin1, result.country]
    .filter(Boolean) // drop undefined/empty parts
    .join(", ");
  return makeCity(result.latitude, result.longitude, label);
}

/**
 * URL path of a city's page. Pairs with the route
 * "/city/:lat/:lon/:name" declared in App.jsx.
 * encodeURIComponent makes the label safe inside a URL segment.
 */
export function cityPath(city) {
  return `/city/${city.latitude}/${city.longitude}/${encodeURIComponent(city.label)}`;
}
