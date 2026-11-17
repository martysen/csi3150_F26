/*
 * ============================================================================
 * APPLICATION: React Async Data Fetching Demo
 *
 * PURPOSE:
 * This application demonstrates the standard architectural pattern for
 * retrieving external data from an API and rendering it safely in a React UI.
 *
 * CORE ENGINEERING DILEMMA:
 * React renders components synchronously and almost instantly. Network
 * requests are asynchronous and take an unpredictable amount of time. If we
 * don't manage this timing mismatch, our UI will crash trying to render data
 * that hasn't arrived yet.
 *
 * KEY CONCEPTS COVERED:
 * 1. useState: Tracking the three phases of data fetching (Loading, Error, Success).
 * 2. async/await: Pausing JavaScript execution to wait for network responses.
 * 3. useEffect: Isolating our network request "side effect" so it only runs
 *    once when the component mounts, preventing infinite render loops.
 * 4. Conditional Rendering: Using early returns to show fallback UIs (like
 *    loading spinners or error messages) while the data is in transit.
 * ============================================================================
 */

import React, { useState, useEffect } from "react";

export default function App() {
  /*
   * STEP 1: DEFINE THE COMPONENT'S MEMORY (STATE)
   * When fetching data, our UI always exists in one of three states.
   * We must track all three to provide a good user experience.
   */
  const [users, setUsers] = useState([]); // Holds the final data (starts empty)
  const [isLoading, setIsLoading] = useState(true); // Tracks if the network request is running
  const [error, setError] = useState(null); // Holds any error messages if things fail

  /*
   * STEP 2: HANDLE THE SIDE EFFECT
   * React's primary job is rendering UI based on state. Reaching out to the internet
   * is a "side effect". If we don't wrap this in a useEffect, React will fetch data
   * every single time the component re-renders, creating an infinite loop.
   */
  useEffect(() => {
    /*
     * STEP 3: THE ASYNC FUNCTION
     * We define the async operation inside the useEffect. We use async/await
     * because network requests take an unpredictable amount of time, and we
     * cannot pause the rest of the application while waiting.
     */
    const fetchUsers = async () => {
      try {
        /*
         * EDUCATIONAL DELAY:
         * JSONPlaceholder is incredibly fast. To actually see our loading state,
         * we artificially pause execution for 3 seconds (3000ms) by awaiting a timeout.
         * This simulates a slow 3G mobile connection or a sluggish database query.
         */
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // 'await' tells JavaScript to pause this specific function until the promise resolves
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        // CRITICAL CHECK: fetch() only throws an automatic error on network failures (like being offline).
        // It does NOT throw an error for 404 (Not Found) or 500 (Server Error). We must check manually.
        if (!response.ok) {
          throw new Error(`Server responded with a ${response.status} status.`);
        }

        // We must also 'await' the parsing of the JSON body
        const data = await response.json();

        // Update the state with our newly fetched data
        setUsers(data);
      } catch (err) {
        // If anything in the 'try' block fails, execution jumps here
        setError(err.message);
      } finally {
        // The 'finally' block runs no matter what (success or failure).
        // This is the perfect place to turn off our loading spinner.
        setIsLoading(false);
      }
    };

    // Execute the function we just defined
    fetchUsers();
  }, []); // <-- THE DEPENDENCY ARRAY
  /*
   * Why the empty array? It tells React: "Only run this effect once,
   * when the component first mounts to the screen."
   * Lets say the data that you fetch changes based on the URL (like a search bar input)
   * then you will save the url and pass it as an input the dependency array. 
   * Anytime React sees a change in url state it will re-run the fetch operation/API call.
   */

  /*
   * STEP 4: CONDITIONAL RENDERING (HANDLING UI STATES)
   * A common beginner mistake is trying to render the data before it arrives.
   * We use early returns to show fallback UIs while waiting or if an error occurs.
   */
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Takes up the full height of the browser window
          fontFamily: "sans-serif",
        }}
      >
        {/* Injecting CSS keyframes directly so we don't need an external .css file */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        {/* The Animated Spinner */}
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "8px solid #f3f3f3", // Light grey track
            borderTop: "8px solid #3498db", // Blue spinning accent
            borderRadius: "50%", // Makes it a circle
            animation: "spin 1s linear infinite", // Applies the keyframes from above
            marginBottom: "20px",
          }}
        ></div>

        <h2 style={{ color: "#555" }}>Connecting to database...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          color: "red",
        }}
      >
        <h2>System Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  /*
   * STEP 5: RENDER THE SUCCESS STATE
   * If the code reaches this point, isLoading is false and error is null.
   * We can safely assume 'users' contains our data array.
   */
  return (
    <div
      style={{
        maxWidth: "600px", // Restricts how wide the list can get
        margin: "40px auto", // Centers the container horizontally and adds top margin
        padding: "0 20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        System User Directory
      </h2>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {/* We use .map() to transform our array of data objects into an array of JSX elements */}
        {users.map((user) => (
          <li
            key={user.id} // React REQUIRES a unique 'key' prop on mapped items to efficiently update the DOM
            style={{
              padding: "15px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px", // Slightly softer corners
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Adds a subtle drop shadow for polish
            }}
          >
            <strong>{user.name}</strong>
            <br />
            <small
              style={{ color: "#555", display: "block", marginTop: "5px" }}
            >
              Username: {user.username} | Email: {user.email}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
