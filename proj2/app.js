// declare a IIFE (Immediately Invoked Function Expression)

(function () {
  "use strict()";

  // we are going to store data in the broser's local storage
  // which is accessed using the localStorage API
  // We need to give this storage a name;
  const STORAGE_KEY = "puslecare_triage_records_v1";

  // Bring in the DOM elements and store it as JS objects
  // use the document API

  // const vitalsForm = document.querySelectorAll(".test")
  const vitalsForm = document.getElementById("vitals-form");
  const errorBanner = document.getElementById("form-error-banner");
  const recordsList = document.getElementById("records-list");
  const queueCount = document.getElementById("queue-count");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");

  // grab the input field within the html form
  const inputName = document.getElementById("patient-name");
  const inputSystolic = document.getElementById("systolic");
  const inputDiastolic = document.getElementById("diastolic");
  const inputHeartRate = document.getElementById("heart-rate");
  const inputSpo2 = document.getElementById("spo2");
  const inputTemp = document.getElementById("temperature");

  // initial the state
  // (condition) ? (true) : (false);

  let records = loadRecords();

  // initial UI call/ render
  render();

  //   STORAGE OPS: READ AND WRITE TO STORE

  //   READ operations
  function loadRecords() {
    try {
      // establish connection with your data store
      const stored = localStorage.getItem(STORAGE_KEY);
      // check if anything was returned or if store is empty
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load records from your data store", error);
      return [];
    }
  }

  //   WRITE operation to the data store
  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Failed to write to your data store", error);
    }
  }

  //   DOM RENDER FUNCTION BODY
  function render() {
    queueCount.textContent = records.length;

    // 1 == 1; "1" === 1
    if (records.length === 0) {
      emptyState.classList.remove("hidden");
      recordsList.innerHTML = "";
      return;
    }

    // if not emppty
    emptyState.classList.add("hidden");

    // create a virtual DOM.
    // minimizes browser reloads
    const fragment = document.createDocumentFragment();

    // for each item in the records create the patient cards
    records.forEach(function (rec) {
      const li = document.createElement("li");
      li.className = "patient-card status-" + rec.risk.level;

      // create our dynamic card <img src=x onerror='query to retrieve data'>
      //
      li.innerHTML = `<div class="card-top">
            <div>
                <div class="patient-name-text">${escapeHtml(rec.name)} </div>
                <div class="timestamp">Logged at ${rec.timestamp} </div> 
                <span class="risk-badge ${rec.risk.level}">${rec.risk.label}</span>            
            </div>

            // vitals starts here
        
        </div>`;
    });

    // Write the body of escapeHtml*() here!!!
  }
})();
