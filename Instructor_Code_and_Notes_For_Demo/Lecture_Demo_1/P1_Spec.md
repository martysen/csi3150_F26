# Project 1 Specification: FinTech SaaS Landing & Tiered Pricing Dashboard

## Module Overview
* **Target Technologies:** Semantic HTML5, CSS3 (Conceptual topics that need to be covered (students must review this) CSS Box Model, Flexbox, CSS Grid, Media Queries, Pseudo-classes).
* **Domain:** FinTech / Developer Infrastructure (inspiration: Stripe.com/Linear.app style).
* **Core Principles:** Affordances, Signifiers, Visual Constraints, Clear Call-to-Action (CTA), and The 4-Click Discovery Rule.
* **ABET Outcomes Covered:** ABET [1, 2, 6b] (Web setup, semantic implementation, responsive styling).

---

## 1. Student-Facing Handout: User Stories & Business Intent

This forms the foundations of what constitutes of a "problem" to be solved. This is about developing problem-solving and logic formulation. Cannot be taught but can be improved through practice. 

### System Context
ApexPay is an API-first FinTech platform providing global payment processing for digital businesses. The company needs a high-converting, responsive landing page and pricing matrix that allows potential clients to understand value propositions, compare subscription tiers, estimate transaction fees, and initiate account setup.

### User Stories

User stories can also be referred to as client requirements. They outline what users expect to see in your final product. Ideally in a real-world environment, this process starts with the company establishing the set of features/services they want to offer, then identifying what type of users will interact with their product (web/mobile app), and finally, taking these two input to formally define user stories. To simplify the process, a set of formally defined user stories is listed below. 

* **Story 1 (Value Proposition & Navigation):** As a prospective business client, I want to immediately understand ApexPay's core value, view navigation links, and access a primary "Get Started" call-to-action (CTA) above the fold so that I can decide whether to explore further.
* **Story 2 (Feature Exploration):** As an engineering manager, I want to scan key platform capabilities (API latency, global payout coverage, compliance) arranged in a structured grid so that I can evaluate technical suitability quickly.
* **Story 3 (Tiered Pricing Comparison):** As a startup founder, I want to compare distinct pricing tiers ("Starter", "Growth", "Enterprise") with clearly highlighted recommended plans and feature checklists so that I can choose the tier matching my transaction volume.
* **Story 4 (Interactive Fee Calculator Preview):** As a finance lead, I want to interact with a simple fee estimation form (specifying monthly volume via constrained inputs) so that I can estimate projected costs before registering.
* **Story 5 (Account Registration Lead):** As a business owner, I want to submit a pre-registration form with contact details and business size so that the sales team can generate API sandbox keys.

Our goal is now to make sure the content organization (HTML), and its layout and presentation (CSS) meets the requiremetns expressed in these stories. We also must adhere to the standards/best practices of coding while using these technolgoies. This is the measure of correctness. 

---

## 2. Action Steps (Max 4 Interactions from users)
```
[Visit Landing Page]
│
├─── (Action 1) Click "Pricing" in Nav  ─────────► Smooth-scrolls to Pricing Matrix
│                                                            │
├─── (Action 2) Select "Growth Tier" Card ───────► Triggers focused border / CTA
│                                                            │
├─── (Action 3) Enter Monthly Volume in Form ────► Validates input bounds (Constraints)
│                                                            │
└─── (Action 4) Click "Claim API Keys" ──────────► Submits validated lead capture form
```

Verbal description of how the four step process will take place: 

* **Step 1:** User lands on the page and identifies the primary signifier (sticky navigation bar with branded logo, links, and high-contrast CTA button).
* **Step 2:** User scrolls or clicks the navigation link to reach the 2D pricing grid.
* **Step 3:** User inspects the tiered cards where the "Most Popular / Growth" card has higher visual weight (raised elevation, distinct badge signifier).
* **Step 4:** User enters estimated transaction volume into a constrained number input field and clicks the primary registration CTA.

---

## 3. Component & Layout Tree

```text
index.html
├── <header class="site-header"> (Flexbox: row, space-between, align-center)
│   ├── <div class="brand-logo"> (Signifier: Home Anchor)
│   ├── <nav class="nav-menu"> (Flexbox: row, gap: 1.5rem)
│   │   ├── <a href="#features">
│   │   ├── <a href="#pricing">
│   │   └── <a href="#calculator">
│   └── <a href="#register" class="btn btn-primary"> (Primary CTA)
│
├── <main>
│   ├── <section id="hero" class="hero-section"> (Flexbox: column, align-center, text-center)
│   │   ├── <span class="badge"> ("New: Real-time settlements")
│   │   ├── <h1> (Primary Value Proposition)
│   │   ├── <p class="lead-text">
│   │   └── <div class="cta-group"> (Flexbox: row, gap: 1rem)
│   │       ├── <a class="btn btn-primary"> ("Start Free Trial")
│   │       └── <a class="btn btn-secondary"> ("Read Documentation")
│   │
│   ├── <section id="features" class="features-section">
│   │   ├── <h2> ("Engineered for Global Scale")
│   │   └── <div class="features-grid"> (CSS Grid: repeat(auto-fit, minmax(280px, 1fr)))
│   │       ├── <article class="feature-card"> (Box Model: padding, border-radius)
│   │       ├── <article class="feature-card">
│   │       └── <article class="feature-card">
│   │
│   ├── <section id="pricing" class="pricing-section">
│   │   ├── <h2> ("Transparent Pricing for Every Stage")
│   │   └── <div class="pricing-grid"> (CSS Grid: 3-column desktop / 1-column mobile)
│   │       ├── <article class="pricing-card"> (Starter)
│   │       ├── <article class="pricing-card featured"> (Growth - Visual Weight / Scale)
│   │       └── <article class="pricing-card"> (Enterprise)
│   │
│   └── <section id="register" class="lead-capture-section">
│       └── <form class="lead-form"> (Flexbox: column, gap: 1rem)
│           ├── <fieldset>
│           │   ├── <legend> ("Request Sandbox Access")
│           │   ├── <label for="email"> + <input type="email" required id="email">
│           │   ├── <label for="volume"> + <input type="number" min="1000" max="10000000" step="1000">
│           │   └── <label for="company-tier"> + <select id="company-tier">
│           └── <button type="submit" class="btn btn-primary btn-block"> ("Generate Keys")
│
└── <footer class="site-footer"> (Flexbox: row, space-between, wrap)
    ├── <p> ("copyright-emoji 2026 ApexPay Inc. All rights reserved.")
    └── <ul class="footer-links"> (Flexbox: row, gap: 1rem)
```

## 4. Implementation Technical Components & CSS Architecture

This section is about the minimum requirements of the best practices of the using the tech. 

### Semantic HTML5 Requirements
- Structural Containers: Use ```<header>, <main>, <section>, <article>, <nav>, and <footer>``` exclusively for high-level structure (no generic ```<div>``` wrappers for document landmarks).
- Form & Constraints: Enforce constraints natively using ```type="email", type="number", min="1000", max="10000000"```, and ```required``` attributes. Note: this is only a UX check. Server-side must always perform a input sanitization and validation at their end for cybersecurity purposes.
- Heading Hierarchy: Strictly maintain standard depth order (```<h1> $\rightarrow$ <h2> $\rightarrow$ <h3>```) without skipping levels.

### CSS Layout & Algorithmic Geometry Requirements

#### Global Box Model Setup:
```
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
#### 1D Navigation & CTA Alignment: 
Use Flexbox (```display: flex, justify-content: space-between, align-items: center```).

#### 2D Pricing & Feature Grids: Use CSS Grid with dynamic reflow:
```
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```
Alternative is to use flexbox here. The choice is upto the developer. 

#### Visual States (Feedback & Signifiers):
- ```:hover``` and ```:focus-visible``` states on all buttons, links, and input elements.
- Distinct styling for ```.pricing-card.featured``` (e.g., ```border: 2px solid var(--primary), transform: scale(1.03)```).

#### Responsive Breakpoint: 
Provide a ```@media (max-width: 768px)``` query that transitions the navigation menu to a vertical layout and stacks pricing cards into a single column.

We are developing with "desktop-first" philosophy in mind. However, users may access using mobile phone's browser. This ensures our webpage does not break if viewed on smaller screens. 

---

### Project Directory Structure

```markdown
## 1. Directory Structure

```text
apexpay-dashboard/
├── index.html
└── styles.css
```
The core requirement is the presence of the two files: index and styles (plus a readme file to keep the Github repo professional). What the root directory is named is upto the user (as long as it is meaningful and reasonable). 

### Deep Dive: Architectural Rationale & Explanations

#### Algorithmic Layout Engines: Flexbox vs. Grid Selection
- 1D Geometry (Flexbox) in ```<header>``` and ```.hero-section```:
  - The header operates on a single horizontal axis (```flex-direction: row```). Using justify-content: space-between forces the logo and navigation container to opposite edges without manual margin calculations.
  - In the hero section, ```flex-direction: column``` establishes a vertical flow where ```align-items: center``` mathematically centers elements regardless of screen width.
- 2D Geometry (CSS Grid) in ```.features-grid and .pricing-grid```:
  - Instead of calculating percentage widths (```width: 33.333%```) and clearing floats, the grid uses ```grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)```.
  - Algorithm behavior: The browser calculates how many 280px columns can fit in the viewport. If 3 fit, it creates 3 equal fraction (```1fr```) columns. When the screen drops below 600px, it automatically reflows to 1 or 2 columns without requiring extra media queries.

  #### Norman's Design Principles Mapped to Concrete Code

- Signifiers (```.btn, :focus-visible, .popular-tag```):
  - Links that trigger business conversions are styled with ```.btn-primary``` (high-contrast indigo background), distinguishing them from passive informational links.
  - The featured card uses an elevated scale (```transform: scale(1.03)```) and an explicit badge (```.popular-tag```) to signify the primary tier.
- Constraints (HTML5 Form Attributes):
  - ```<input type="number" min="1000" max="50000000" step="1000">``` forces numerical boundary compliance directly in the browser runtime without requiring JavaScript validation scripts.
  - ```required``` prevents blank form dispatch.
- Feedback Loops (```:hover, :focus, transition```):
  - Interactive components provide instant state transitions: ```.btn:hover``` shifts up by 2px (```transform: translateY(-2px)```), and .```form-control:focus``` emits a glow (```box-shadow```), confirming device input.

  #### The Flexbox Equal-Height Button Alignment Trick
- In ```.pricing-card```, we set ```display: flex; flex-direction: column;```.
- The feature checklist (```.tier-features```) is assigned ```flex-grow: 1;```.
- Why this matters: When one tier has 3 bullet points and another has 4, ```flex-grow: 1``` absorbs all remaining empty vertical space, locking the purchase button (```.btn-block```) to the exact bottom edge across all adjacent cards.

### INSTRUCTOR SELF NOTES
- One of the things missing is user testimonials. Typically this is a section for most businesses for such nature. But developing a features sections will be structurally similar to a testimonial section. 
- footer is minimal but pay attention to what could be improved.