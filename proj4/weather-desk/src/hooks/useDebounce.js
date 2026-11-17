import { useEffect, useState } from "react";

/**
 * Returns `value`, but only after it has stopped changing for `delay` ms.
 *
 * Used by the search box so we call the API once the user pauses typing,
 * not on every keystroke (typing "London" would otherwise fire 6 requests).
 *
 * This is the smallest example of an effect with a cleanup: every keystroke
 * schedules a timer, and the cleanup cancels the previous timer. Only the
 * last timer survives long enough to fire.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay=400]  Milliseconds of silence to wait for.
 * @returns {T}
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounced;
}
