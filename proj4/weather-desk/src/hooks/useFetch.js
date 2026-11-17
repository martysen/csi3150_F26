import { useEffect, useState } from "react";

/**
 * Generic data-fetching hook (async/await + useEffect).
 *
 *   const { data, loading, error } = useFetch(url)
 *
 * - Pass `null` as the url to skip fetching (e.g. nothing typed yet).
 * - Whenever `url` changes, the previous request is cancelled and a new one
 *   starts.
 *
 * WHY THE CLEANUP FUNCTION MATTERS (race conditions)
 *   Imagine the user types "Lon", then "London". Two requests are in flight.
 *   Nothing guarantees the first one finishes first. If the slow "Lon"
 *   response arrives last, it would overwrite the "London" results with stale
 *   data. React runs the cleanup function returned from the effect BEFORE the
 *   next effect run, so we use it to abort the old request.
 *
 * WHY THE EFFECT CALLBACK IS NOT async
 *   An async function returns a Promise, but React expects an effect to
 *   return either nothing or a cleanup function. So we define an async
 *   function INSIDE the effect and call it.
 *
 * STRICTMODE NOTE
 *   In development, <StrictMode> mounts, unmounts and re-mounts every
 *   component once, so each request appears twice in the Network tab (the
 *   first one shows as "cancelled"). That is the cleanup working. It does
 *   not happen in a production build.
 *
 * @param {string|null} url
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nothing to fetch: reset and stop.
    if (!url) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    // One AbortController per request. Calling controller.abort() makes the
    // pending fetch() reject with an AbortError.
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        // fetch() resolves as soon as HEADERS arrive...
        const response = await fetch(url, { signal: controller.signal });

        // ...and does NOT reject on 404/500, so check response.ok ourselves.
        if (!response.ok) {
          throw new Error(`Request failed (HTTP ${response.status})`);
        }

        // ...then reading the body is a second asynchronous step.
        const json = await response.json();
        setData(json);
      } catch (err) {
        // An abort is expected (we caused it). Ignore it.
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
      } finally {
        // Runs on success and on error. Skip it for aborted requests, since
        // a newer request is already in charge of the loading flag.
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    // Cleanup: runs before the next effect and on unmount.
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
