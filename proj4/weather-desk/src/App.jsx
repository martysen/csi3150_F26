import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CityPage from "./pages/CityPage.jsx";

/**
 * Small fallback page for any URL that matches no <Route>.
 */
function NotFound() {
  return (
    <section className="panel center">
      <h1>Page not found</h1>
      <p className="muted">That address doesn't exist in this app.</p>
      <Link className="btn" to="/">
        Back to search
      </Link>
    </section>
  );
}

/**
 * App shell: persistent navbar + routed content + footer.
 *
 * Routes:
 *   /                          -> HomePage (search + saved cities)
 *   /city/:lat/:lon/:name      -> CityPage (weather for one place)
 *
 * The city is encoded in the URL on purpose. A URL like
 * /city/48.85/2.35/Paris%2C%20France can be refreshed or shared and the
 * page still knows what to load, because the data comes from useParams()
 * and not from in-memory state.
 */
export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:lat/:lon/:name" element={<CityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        Weather data by{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo.com
        </a>
      </footer>
    </div>
  );
}
