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

  // procsesing logic - to create dynamic badges for classification
  function evaluateRisk(systolic, diastolic, hr, spo2) {
    if (systolic >= 180 || diastolic >= 120 || spo2 < 90 || hr >= 130) {
      return { level: "critical", label: "Critical" };
    }
    if (systolic >= 130 || diastolic >= 80 || hr >= 100 || hr < 50) {
      return { level: "elevated", label: "Elevated" };
    }
    return { level: "normal", label: "Normal" };
  }

  // INput form validation:
  function validateInput(data) {
    const errors = [];

    // start the error validation
    if (!data.name.trim()) {
      errors.push("Patient Name is a required Field");
    }
    if (isNaN(data.systolic) || data.systolic < 60 || data.systolic > 260) {
      errors.push("Systolic BP must be a number and between 60 to 260 mmHg");
    }
    if (isNaN(data.diastolic) || data.diastolic < 40 || data.diastolic > 150) {
      errors.push("diastolic BP must be a number and between 40 to 150 mmHg");
    }
    if (isNaN(data.hr) || data.hr < 30 || data.hr > 240) {
      errors.push("Pulse must be a number and between 30 to 240 bpm");
    }
    if (isNaN(data.spo2) || data.spo2 < 50 || data.spo2 > 100) {
      errors.push("SpO2 must be a number and between 50 to 100 %");
    }
    if (isNaN(data.temp) || data.temp < 90 || data.temp > 110) {
      errors.push(
        "Body Temperature must be a number and between 90 to 110 degree F",
      );
    }

    return errors;
  }

  // event handlers -> tracks users interaction and fires a logic associated
  // to when the interaction takes place
  vitalsForm.addEventListener("submit", (event) => {
    event.preventDefault(); // relevent to web forms s.t. they don't reload on submission

    const formData = {
      id: crypto.randomUUID(),
      name: inputName.value,
      systolic: parseInt(inputSystolic.value, 10),
      diastolic: parseInt(inputDiastolic.value, 10),
      hr: parseInt(inputHeartRate.value, 10),
      spo2: parseInt(inputSpo2.value, 10),
      temp: parseFloat(inputTemp.value),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const validationErrors = validateInput(formData);

    if (validationErrors.length > 0) {
      displayError(validationErrors.join(" "));
      return;
    }

    hideError();

    // classify risk level
    formData.risk = evaluateRisk(
      formData.systolic,
      formData.diastolic,
      formData.hr,
      formData.spo2,
    );

    // add this to our records array that is keeping track of all user input for patients
    records.unshift(formData);

    // commit this to the memory
    saveRecords();

    // reset the user form after data is committed to data store
    vitalsForm.reset();

    // bring the input focus to the first input field - such that user can enter a new patient
    inputName.focus();
  });

  // Pattern: Event Delegation (implemented using Event Bubbling).
  // Instead of adding listeners to every button, one listener is placed on the parent.
  // When a child button is clicked, the event bubbles up to the parent.
  // event.target identifies the exact clicked element and its data-id attribute.
  recordsList.addEventListener("click", function (event) {
    // identify which patient card's delete btn was clicked
    const target = event.target;
    if (target.classList.contains("btn-discharge")) {
      const recordId = target.dataset.id;
      records = records.filter(function (record) {
        return record.id !== recordId;
      });
      saveRecords();
      render();
    }
  });

  // delete all event
  btnClearAll.addEventListener("click", (event) => {
    if (records.length === 0) return;
    if (confirm("Are you sure you want to delete all patient records?")) {
      records = [];
      saveRecords();
      render();
    }
  });

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
            <div class="vital-stats">
              <div class="stat-item"><span>Blood Pressure</span>${rec.systolic}/${rec.diastolic} mmHg </div>
              <div class="stat-item"><span>Pusle</span>${rec.hr} bpm </div>
              <div class="stat-item"><span>Oxygen (SpO2)</span>${rec.spo2}% </div>
              <div class="stat-item"><span>Temperature</span>${rec.temp.toFixed(1)} F </div> 
            </div>
            <button class="btn btn-outline-danger btn-sm btn-discharge" data-id="${rec.id}">Discharge Patient </button>        
        </div>`;

      // add the above html to the vritual dom
      fragment.appendChild(li);
    });

    // reset the UI
    recordsList.innerHTML = "";
    // add the docu fragment to the REaL dom
    recordsList.appendChild(fragment);
  }

  // dynamically show error msg
  function displayError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove("hidden");
  }

  // dynamically hide the error msg on correct input
  function hideError() {
    errorBanner.textContent = "";
    errorBanner.classList.add("hidden");
  }

  // escape html function - this is to sanitize your user
  // input such that they are unable to inject malicious code
  function escapeHtml(str) {
    // replace & < > :- do this globally across all codes
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
