import { describeWeather } from "../utils/weatherCodes";

/**
 * Turn "2026-11-10" into "Tue". Appending T00:00:00 makes JavaScript parse
 * the date in LOCAL time. Without it, a bare "YYYY-MM-DD" string is read as
 * UTC and can display as the previous day for users west of Greenwich.
 */
function formatDay(isoDate, index) {
  if (index === 0) return "Today";
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
  });
}

/**
 * Purely presentational: receives the API response as a prop and renders it.
 * It knows nothing about fetching, routing or the store, which is why the
 * same component can display either live data or the offline fallback.
 *
 * Units are read from the response itself (`current_units`), so the labels
 * always match the numbers the API actually returned.
 *
 * @param {{ weather: object }} props  Open-Meteo forecast response.
 */
export default function WeatherCard({ weather }) {
  const { current, current_units: units, daily } = weather;
  const now = describeWeather(current.weather_code);
  const degree = units.temperature_2m;

  return (
    <div className="weather">
      <section className="panel weather__now">
        <div className="weather__icon" aria-hidden="true">
          {now.icon}
        </div>
        <div>
          <div className="weather__temp">
            {Math.round(current.temperature_2m)}
            <span className="weather__unit">{degree}</span>
          </div>
          <div className="weather__desc">{now.label}</div>
        </div>

        <dl className="weather__stats">
          <div>
            <dt>Feels like</dt>
            <dd>
              {Math.round(current.apparent_temperature)}
              {degree}
            </dd>
          </div>
          <div>
            <dt>Humidity</dt>
            <dd>
              {current.relative_humidity_2m}
              {units.relative_humidity_2m}
            </dd>
          </div>
          <div>
            <dt>Wind</dt>
            <dd>
              {Math.round(current.wind_speed_10m)} {units.wind_speed_10m}
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <h2 className="panel__title">5-day forecast</h2>
        <ul className="forecast">
          {/* daily.* are parallel arrays: index i is the same day in each. */}
          {daily.time.map((day, i) => {
            const info = describeWeather(daily.weather_code[i]);
            return (
              <li key={day} className="forecast__day">
                <span className="forecast__name">{formatDay(day, i)}</span>
                <span className="forecast__icon" title={info.label}>
                  {info.icon}
                </span>
                <span className="forecast__temps">
                  <strong>{Math.round(daily.temperature_2m_max[i])}°</strong>{" "}
                  <span className="muted">
                    {Math.round(daily.temperature_2m_min[i])}°
                  </span>
                </span>
                <span className="forecast__rain muted">
                  💧 {daily.precipitation_probability_max[i]}%
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
