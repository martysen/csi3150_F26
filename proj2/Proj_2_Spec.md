# Project 2 Specification: Patient Health Vitals & Clinical Intake Portal

## Module Overview
* **Target Technologies:** Vanilla JavaScript (ES6+), DOM Manipulation, Event Handling, Browser Storage (`localStorage`), HTML5 Form Validation.
* **Domain:** Healthcare / Clinical Intake Systems.
* **Core Principles:** Gulf of Execution & Evaluation, System Constraints, Immediate Feedback Loops, and Error Prevention.
* **ABET Outcomes Covered:** ABET [1, 2] (Frontend web implementation, client-side dynamic data handling).

---

## 1.User Stories & Business Intent

### System Context
PulseCare is an outpatient clinic portal used by triage nurses and patients to log baseline physiological metrics (e.g. Systolic/Diastolic Blood Pressure(BP), Heart Rate, Temperature, Blood Oxygen) during intake. The application must run entirely client-side without page reloads, validate inputs against strict physiological safety thresholds, store intake records persistently across browser sessions, and display vital trend history with instant status categorization.

### Practical Usage Scenario for `localStorage` API

To store data persistently across browser sessions using Vanilla JS, we can leverage an inbuilt API called `localStorage`. The browser links data directly to the a specific path (webURL). So even if you close the browser, restart your computer, the data is not lost. 

Important note: localStorage can only store data in text string. However, most records in front end are managed as array of objects. So if you want to store an array of objects into text string format, use `JSON.stringify()` and when you retrieve the data, use `JSON.parse()`. 

A couple of more things to remember about `localStorage`:
- Data must be deleted using code or clearing browser cache.
- Provides approx. 5MB of data storage. But this can store thousands of text data. It cannot however store heavy files, media, or entire databases.
- Data is stored in plaintext. So do not store any sensitive information. This demo uses healthcare domain only as an example for demonstration purposes and should not be used in real-life healtcare application. 

So where can you use it in real-life?

- Save user preferences like light-mode or dark-mode selections, or cookie preferences.
- E-commerce shopping carts: If user is logged in as Guest, then you can use localStorage to save the state of their cart. 
- Unsubmitted web forms: if you are using an application for example tax filing, typically form-heavy webpages, then localStorage can be leveraged to save work in progress and delete them later using code once the form gets committed.

### User Stories
* **Story 1 (Controlled Metric Logging):** As an intake triage nurse, I want to record a patient's vital signs through structured numeric fields with real-time constraint enforcement so that invalid physiological readings (e.g., negative pulse or out-of-range temperatures) cannot be submitted.
    - Dev Talk: the UI needs a web-form for user input that has input field constraints. 
* **Story 2 (Triage Status Feedback):** As a clinician, I want the system to automatically compute and display a color-coded triage risk category ("Normal", "Elevated", "Critical") immediately upon record submission so that urgent clinical conditions are instantly visible.
    - Dev Talk: We need some sort of function, that takes user input and does some processing and shows the requested output. Output will be classified into tiers (like low, med, high) and they need to be color-coded signifier.
* **Story 3 (Session Persistence):** As a nurse managing multiple exam rooms, I want the logged patient records to persist in the browser (`localStorage`) so that refreshing the browser or navigating away does not erase unsaved patient histories.
* **Story 4 (Record Deletion & Purging):** As a medical records administrator, I want to remove individual patient entries or purge the entire current intake queue so that test entries or discharged records can be cleared.
    - Dev talk: ability to delete specific or all the contents of the output UI section. 
* **Story 5 (Live Vital Range Feedback):** As a patient entering self-measured metrics, I want immediate visual hints whenever my entered metrics fall outside standard ranges so that I am prompted to double-check my input before clicking submit.
    - Dev talk: UI input web-form will have constraints around input such that if incorrect inputs are given the UI will alert. 

---

## 2. Action Steps (Max 4 Interactions Preferred)
```
[Access Intake Portal]
│
├─── (Action 1) Fill Patient Details & Vitals ────► Triggers real-time input constraint validation
│                                                                   │
├─── (Action 2) Click "Record Intake Entry" ──────► Evaluates risk level & persists to localStorage
│                                                                   │
├─── (Action 3) Filter / View Intake Queue ───────► DOM dynamically renders colored risk cards
│                                                                   │
└─── (Action 4) Click "Discharge" (Delete) ───────► Removes entry from state & re-renders list
```

* **Step 1:** User inputs patient name and physiological numbers (Systolic/Diastolic, Pulse, Temp, SpO2). Real-time event listeners (`input`) fire to check for values outside normal ranges.
* **Step 2:** User clicks the primary submission button. The DOM form listener intercepts the event (`preventDefault()`), computes clinical risk, and serializes the updated list to `localStorage`.
* **Step 3:** The DOM renderer dynamically creates and appends card nodes with risk badges (`Critical`, `Elevated`, `Normal`) without triggering a full-page reload.
* **Step 4:** User clicks a "Discharge" action button on a record, which dispatches a dataset-indexed delete handler that updates storage and updates the DOM in place.

---

## 3. Reference Guide: Component & Layout Tree

Remember, this is subjective. What is *correct* for this depends on whether the user stories are addressed and whether you are using semantic HTML tags *as much as possible*. For CSS, as long as you make a reasonable design that is clean, intuitive, and easy to follow, then its good. There is no law in CSS that you HAVE to use say `display:grid` for layout. Sometimes `display:grid` is the best way. But if you are unsure about, try using a different layout method to achieve what you want to achieve. 

```text
index.html
├── <header class="portal-header"> (Flexbox: row, space-between)
│   ├── <div class="brand"> (PulseCare Intake Portal)
│   └── <div class="queue-summary"> (Dynamic active count badge)
│
├── <main class="portal-layout"> (CSS Grid: 1fr 2fr desktop / 1-column mobile)
│   │
│   ├── <aside class="form-panel">
│   │   └── <form id="vitals-form" novalidate> (Flexbox: column, gap: 1rem)
│   │       ├── <h2> ("Log New Patient Vitals")
│   │       ├── <div class="form-group"> (<label> + <input id="patient-name">)
│   │       ├── <div class="form-row"> (Flexbox: row for paired inputs)
│   │       │   ├── <div class="form-group"> (<label> + <input id="systolic">)
│   │       │   └── <div class="form-group"> (<label> + <input id="diastolic">)
│   │       ├── <div class="form-row">
│   │       │   ├── <div class="form-group"> (<label> + <input id="heart-rate">)
│   │       │   └── <div class="form-group"> (<label> + <input id="spo2">)
│   │       ├── <div class="form-group"> (<label> + <input id="temperature">)
│   │       ├── <div id="form-error-banner" class="alert hidden"></div> (Feedback)
│   │       └── <button type="submit" class="btn btn-primary btn-block"> ("Record Intake")
│   │
│   └── <section class="records-panel">
│       ├── <header class="records-header"> (Flexbox: row, space-between)
│       │   ├── <h2> ("Active Intake Records")
│       │   └── <button id="btn-clear-all" class="btn btn-outline-danger btn-sm"> ("Purge Queue")
│       │
│       ├── <div id="empty-state" class="empty-state"> ("No patients currently logged.")
│       └── <ul id="records-list" class="records-grid"> (CSS Grid: dynamic card rendering)
│           <!-- DYNAMICALLY INJECTED NODES -->
│           <li class="patient-card status-critical" data-id="...">
│               <div class="card-header"> (Patient Name + Timestamp + Risk Badge)
│               <div class="vitals-grid"> (4-cell metric grid)
│               <button class="btn btn-sm btn-delete"> ("Discharge")
│           </li>
│
└── <footer class="portal-footer"> (Flexbox: row, space-between)
```

### 4. Implementation Technical Components & JavaScript Architecture

The contents will be explained during class demo. 

#### DOM & State Management Architecture
- Single Source of Truth: Keep an in-memory array ```let records = []``` synchronized bidirectionally with ```localStorage.getItem('pulsecare_records')```.
- Pure Render Function: Centralize DOM output through a dedicated ```renderRecords(records)``` function that clears and reconstructs ```<ul id="records-list">``` using document fragments.
- Event Delegation: Attach a single click listener to ```#records-list``` to handle record deletions via ```event.target.dataset.id``` rather than binding separate event listeners on every dynamic card.

#### Physiological Triage Calculation Logic

I made these up looking at the web. In real life, your clients will provide you with this. In your assignments, if there is domain specific requirement that are not provided, do some digging on google search and find something reasonable. 

- Critical Rule: $\text{Systolic} \ge 180 \lor \text{Diastolic} \ge 120 \lor \text{SpO}_2 < 90\% \lor \text{Heart Rate} > 130\text{ bpm}$.
- Elevated Rule: $\text{Systolic} \in [130, 179] \lor \text{Diastolic} \in [80, 119] \lor \text{Heart Rate} \in [100, 130]$.
- Normal Rule: All values within standard baseline bounds.


---

### File 2: Directory Structure

```markdown
# Project 2 Reference Implementation: Code & Architectural Documentation

Below is the complete set of files that will be needed for this project. Make note of filenames. Don't deviate from these file names. Three main files are needed for this proj: the root file index.html, the supporting files styles.css and app.js. And then once it is pushed to github, a README.md file. 

---

## 1. Directory Structure

```text
pulsecare-portal/
├── index.html
├── styles.css
└── app.js
```

### Deep Dive: Architectural Rationale & Explanations

One of the interesting web-programming problems with this example is that traditionally, whenever new dynamic patient record gets added, the whole document structure gets redrawn. This results in the webpage to reload. So everytime you add a new patient record or delete an existing one, you page reloads. This can get the job done but it is not optimal. Slows down performance if number of patients are large. Frontend frameworks like ReactJS by its nature addresses this problem. 

However, traditional Vanilla JS for web manipulation does not have this feature. So it needs to be programmed and coded manually. Hence, I choose this requirement so that we can actually program this and appreciate what ReactJS provides us instead of taking it for granted. 


#### A. Document Fragment & Reflow Optimization
- Instead of clearing and appending to the live DOM in every loop iteration (`recordsList.appendChild(li)` inside `forEach`), the implementation constructs a detached ```DocumentFragment```.
- Appending all generated nodes to the fragment first and performing a single `recordsList.appendChild(fragment)` triggers only one single browser reflow and repaint pass, minimizing DOM overhead.

#### B. Event Delegation Pattern vs. Individual Card Listeners
- Dynamically created DOM elements (cards generated inside `records.forEach`) do not have individual `.addEventListener()` calls bound to their "Discharge" buttons.
- Instead, a single event listener is attached to the static parent `<ul id="records-list">`. When a click bubbles up, `event.target.classList.contains('btn-discharge')` intercepts the target and extracts `event.target.dataset.id`. This pattern prevents memory leaks and avoids re-binding listeners during render passes.

#### C. Norman Design Principles in Medical Input Engineering
- Gulf of Execution: The inputs are labeled with standard clinical units (`mmHg, bpm, °F, %`) alongside matching placeholders to eliminate guesswork about expected formats.
- Gulf of Evaluation & Feedback: The dynamic card immediately applies distinct border colors and badges (`status-critical, status-elevated, status-normal`) so that triage personnel can evaluate patient risk in under a second.
- System Constraints: The `validateInputs` routine acts as a strict programmatic boundary. Invalid numerical values trigger immediate error messages without modifying state or storage.