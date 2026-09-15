# Introduction to Web & Mobile Systems — Lecture Demos

Welcome to the companion codebase for **Web and Mobile Systems**

This repository serves as the central hub for all live, in-class demonstration code, starter templates, and reference materials throughout the semester.

---

### Course Overview

> An introduction to web and mobile systems. Development of interactive web systems using front-end technologies such as HTML, CSS and JavaScript during the first half of the semester. A cross platform JavaScript framework, such as React Native along with React Library, for mobile apps development during the second half. Formerly CSI 2520. With laboratory.

---

### In-Class Projects & Tech Stack

Throughout the semester, we will construct **5 hands-on, live lecture projects** demonstrating the practical application of each core technology:

| Directory                                                                    | Topic & Key Concepts                                                                                                               | Primary Technology                                    |
| :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `proj1/`(ApexPay : FinTech B2B Landing & Pricing site)                       | Semantic page structure, accessibility, forms, media integration, Modern layouts, Flexbox, CSS Grid, responsive design, animations | **Semantic HTML5 & Modern CSS Layouts**               |
| `proj2/`(PulseCare : Healthcare (Patient Vitals Intake Portal))              | ES6+ fundamentals, DOM manipulation, event listeners, dynamic data                                                                 | **DOM JS, Events, Constraints & Web Browser Storage** |
| `proj3/`(TerraCraft : E-commerce store (mid to small scale businesses))      | Component architecture, state, props, hooks, fast client bundling                                                                  | **React Web, Components, State, React Router**        |
| `proj4/` (ApexLogistics : Supply Chain Management, Fleet Telemetry Hub)      | Async React, Polling, Zustand Global State                                                                                         | **React.js + Zustand**                                |
| `proj5/` (E-commerce/Delivery management, Courier field dispatch mobile app) | React Native, Expo, Native Nav, AsyncStorage                                                                                       | **React Native + Expo**                               |

---

### How to Navigate This Repository

This repository is structured so you can follow along during lectures and review working solutions after class:

- **Root Reference Cheatsheets:**
  - [`HTML_Cheatsheet.md`](./html5-cheat-sheet.md) — Fast reference for semantic elements, attributes, forms, and structuring conventions.
  - [`CSS_Cheatsheet.md`](./css3-cheat-sheet.md) — Syntax guide covering box model, Flexbox properties, CSS Grid layouts, and selectors.
  - More to come.

- **Individual Project Folders (`proj1/` – `proj5/`):**
  Each project directory operates independently to avoid dependency conflicts:
  - **Dedicated `README.md`:** Found inside each project directory, detailing the project overview, key concepts illustrated, and other step-by-step instructions.
  - **`Source Codes`:** The final, functional reference codebase pushed directly after every live demo sessions.

---

### Getting Started

#### 1. Clone the Repository

Clone this repository to your local development environment:

```bash
git clone [https://github.com/](https://github.com/)<your-username>/<repo-name>.git
cd <repo-name>
```

#### 2. Sync Before Every Lecture

Starter templates and finished demo code are pushed regularly to `master` (this is the name of parent branch for my Git; if yours is `main` be mindful of it). Ensure your local copy is up to date before each class begins:

```bash
git pull origin master
```

#### 3. Running the Projects Locally

- Projects 1, 2, and 3 (HTML, CSS, JavaScript):
  - Open the respective `index.html` file in your preferred web browser, or use the Live Server extension in VS Code for automatic reload on file save.
- Project 4 (React + Vite):
  - Navigate into the folder, install the required packages, and start the local development server:
  ```bash
  cd proj4
  npm install
  npm run dev
  ```
- Project 5 (React Native + Expo):
  - Navigate into the project folder, install dependencies, and launch the Expo development tooling:
  ```bash
  cd proj5
  npm install
  npx expo start
  ```

  - Scan the generated QR code using the Expo Go app on your physical mobile device, or run on an emulator/simulator.
