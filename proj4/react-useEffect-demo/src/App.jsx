// api call that will return a list of users
// create a ui that will show the list users
// useEffect hook
// API call in JS, async-await (Promises)
// style prop --> react native there is not css files
// fetch() - for api call.(extenal lib alterantive for api calls: axios)

import React, { useState, useEffect } from "react";

const App = () => {

  // declare our local state for this component: 
  // outcomes of a API call.
  // three states for an API call: success; error; isLoading (waiting)
  const [users, setUsers ] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // MAKE THE API CALL
  useEffect( () => {

    // before you make an uncertain external operation
    // wrap it with async - await
    const fetchUser = async () => {
      try{
        // inject network delay to simulate 3g behavior
        await new Promise ((resolve) => setTimeout(resolve, 3000));

        // call to api
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok){
          throw new Error(`Server responsded with a ${response.status} status.`);

        // if resp is okay convert it to a JS object
        const data = await response.json();
        
        // this is success so update success state 
        setUsers(data);
        
      }
    }catch (err){
      // collect the error msg; show error page if you have one
      // update error state
      setError(err.message);
      }
      finally{
        // set up a loading spinner if network call is not finished
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []); // this empty array is called the dependency array.

  // conditional rendering 
  if (isLoading){
    return (
      // return a please wait while we get the data for you
      <div>Connecting to the database...</div>
    );
  }

  // error 
  if (error){
    return (
      <div>
        <p>There was a system error fetching the data</p>
        <p>{error}</p>
      </div>
    );
  }

  // success of data
  return(
    <div>
      <h2>System User Directory</h2>
      <ul style={{ listStyleType: none, padding:0}}>
        {users.map((user) => {
          //output the list items
        })}
      </ul>
    </div>
  );


  
};

export default App;
