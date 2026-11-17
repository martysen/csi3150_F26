import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * GLOBAL STATE (zustand)
 *
 * This single store holds the two pieces of state that many unrelated
 * components care about:
 *
 *   units        'celsius' | 'fahrenheit'
 *                Read by: Navbar (toggle), CityPage (decides which API
 *                units to request).
 *
 *   savedCities  Array of city objects: { id, label, latitude, longitude }
 *                Read by: SavedCities (list), CityPage (save button state).
 *
 * Neither Navbar nor SavedCities is a parent/child of CityPage. Without a
 * global store we would have to lift this state to <App> and pass it down
 * through props ("prop drilling"). With zustand, each component just asks
 * the store for the slice it needs.
 *
 * HOW zustand WORKS
 *   create((set, get) => ({ ...state, ...actions }))
 *   returns a React hook. Calling the hook with a *selector* subscribes the
 *   component to that slice only:
 *
 *       const units = useWeatherStore((s) => s.units)
 *
 *   The component re-renders only when the selected value changes.
 *
 * RULES OF THUMB
 *   1. Always pass a selector. Calling useWeatherStore() with no argument
 *      subscribes to the whole store, so the component re-renders on every
 *      change.
 *   2. Never mutate state. set() merges the object you return into the
 *      store, so return NEW arrays/objects (spread, filter, map).
 *   3. In zustand v5, a selector that builds a new object or array on every
 *      call (e.g. s => ({ a: s.a, b: s.b })) causes an infinite render loop.
 *      Use one selector per value, or useShallow from 'zustand/react/shallow'.
 *
 * PERSISTENCE
 *   The persist middleware mirrors the store into localStorage under the key
 *   'weather-desk-store', so units and saved cities survive a page refresh.
 *   Functions are not serializable, so only the data fields are saved.
 */
export const useWeatherStore = create(
  persist(
    (set) => ({
      // ---------- state ----------
      units: "celsius",
      savedCities: [],

      // ---------- actions ----------

      /** Flip between celsius and fahrenheit. */
      toggleUnits: () =>
        set((state) => ({
          units: state.units === "celsius" ? "fahrenheit" : "celsius",
        })),

      /**
       * Add a city unless one with the same id is already saved.
       * Returning the same `state` object tells zustand nothing changed,
       * so no component re-renders.
       */
      saveCity: (city) =>
        set((state) =>
          state.savedCities.some((c) => c.id === city.id)
            ? state
            : { savedCities: [...state.savedCities, city] },
        ),

      /** Remove a city by id. filter() returns a new array. */
      removeCity: (id) =>
        set((state) => ({
          savedCities: state.savedCities.filter((c) => c.id !== id),
        })),
    }),
    { name: "weather-desk-store" },
  ),
);
