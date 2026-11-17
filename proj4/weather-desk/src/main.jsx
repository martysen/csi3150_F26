import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// The ONLY stylesheet in the project. Every class used in the app lives here.
import "./styles.css";

/**
 * Entry point.
 *
 * <BrowserRouter> must wrap the whole app so that <Routes>, <Link>,
 * useParams() and useNavigate() work in any descendant component.
 *
 * Note: there is NO store provider here. Unlike React Context, a zustand
 * store is just a hook (useWeatherStore) that any component can import.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
