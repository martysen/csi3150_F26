# Project 1 Specification: FinTech SaaS Landing & Tiered Pricing Dashboard

## Module Overview
* **Target Technologies:** Semantic HTML5, CSS3 (Box Model, Flexbox, CSS Grid, Media Queries, Pseudo-classes).
* **Domain:** FinTech / Developer Infrastructure (Similar to Stripe.com or Linear.app design style).
* **Core Principles:** Affordances, Signifiers, Visual Constraints, Clear Call-to-Action (CTA), and The 4-Click Discovery Rule.
* **ABET Outcomes Covered:** ABET [1, 2, 6b] (Web setup, semantic implementation, responsive styling).

---

## 1.User Stories & Business Intent

### System Context
ApexPay is an API-first FinTech platform providing global payment processing for digital businesses. The company needs a high-converting, responsive landing page and pricing matrix that allows potential clients to understand value propositions, compare subscription tiers, estimate transaction fees, and initiate account setup. 

`Instructor Note`: The following user stories as they appear are the final formalized version. In real-life, you may or may out get these. First steps are typically to interview the clients to understand their requirements (client requirements) and then formalize the user stories. We will do a small exercise in class to understand what this means. 

`Instructor Note 2`: Remember, your web (or native UI) are the digital front of your business (individual or organizations). The goal of this 'front' is to convey what services (or information) you offer. To further elevate the impact and value, these services should try to address real user needs (we refer to these as user pain-points). 

### User Stories
* **Story 1 (Value Proposition & Navigation):** As a prospective business client, I want to immediately understand ApexPay's core value, view navigation links, and access a primary "Get Started" call-to-action (CTA) above the fold so that I can decide whether to explore further.
* **Story 2 (Feature Exploration):** As an engineering manager, I want to scan key platform capabilities (API latency, global payout coverage, compliance) arranged in a structured grid so that I can evaluate technical suitability quickly.
* **Story 3 (Tiered Pricing Comparison):** As a startup founder, I want to compare distinct pricing tiers (for example, "Starter", "Growth", "Enterprise") with clearly highlighted recommended plans and feature checklists so that I can choose the tier matching my transaction volume.
* **Story 4 (Interactive Fee Calculator Preview):** As a finance lead, I want to interact with a simple fee estimation form (specifying monthly volume via constrained inputs) so that I can estimate projected costs before registering.
* **Story 5 (Account Registration Lead):** As a business owner, I want to submit a pre-registration form with contact details and business size so that the sales team can generate API sandbox keys.

---

## 2. So what are your next steps after this? 

### 2a. First, outline the Action steps: 
* What will or How will the users interact with your UI for the user stories defined above? 
  - when you do outline them make sure the number of interactions the user has with your UI is less than equal to 4 (if more than 4, you will redesign the interaction)
  - For example: Take Story 3 above. Think what will a user interested to learn about pricing 'see' and how they will interact with your UI from the time web page loads? Answer: Page loads -> User sees Nav Bar at top -> Clicks on Pricing -> Page smooth scrolls down to 'pricing' section on your UI. Can you reason what will this action outline look like for Story 4 (and the other stories)
* Through this exercise, you will be able to understand what the preliminary **functional** structure of each component in your UI will look like and how it should behave to **meet** the user needs. 

### 2b. Second, Wireframing and Component Tree Layout.
* The next step is typically content-structure and layout. In Layman terms, what contents will you place on your UI and how should they be laid out. 
* For this there is no specific ordering on which one should happen first. Through practice, you'll find your comfort zone. However, for layout, use wireframing and for content-structure use component tree i.e. build the Document Object Model (shown in lecture). 

### 2c. Styling comes next
* Most of your component tree outline will be taken care by HTML5. However, your layout is a part of styling. So once you are done with your wireframing (rough outline of what your UI looks like) and component tree (what HTML elements you will need on the implements and what is their tree-like hierarchy), move to styling. 
* As you move into styling for layout, now is also a good time to decide on other core styling aspects - Typography, Font sizes, colors (stick to three but no more than five), logo, media assets (image, video, etc). 

### 2d. At this point, we are ready to code. 
* Now we can begin coding using HTML and CSS and address any unknown parameters regarding the syntax of the language. 
* So what is important here is: once you get to coding, you must know exactly **WHAT** you want to do. If you know this, you can search, lookup, and learn **HOW** to do it. 


`HTML must be written using semantic html tags 
as much as possible.` 

```
body 
  header
    div<logo>
    nav
      a<Features>
      a<Pricing>
      a<Calculator>
    CTA button <GetAPI Keys/Start your Trial>

  main
    section<hero-section>
      header
        h1<title of the page>
        p <subtitle or a short text>
        img<>
    section<product-features>
      //use the concept of designing product cards
      article<feature1>
        h2<feature-name>
        p<decribe the feature>
        img... if you have it/icon
      article<feature2>
        h2<feature-name>
        p<decribe the feature>
        img... if you have it/icon
      article<feature3>
        h2<feature-name>
        p<decribe the feature>
        img... if you have it/icon
    section
    section
    section

  footer
    div<logo>
    div<for links>
      a<link1>
      a<link2>
      a<social media links>
      a<go to the top of the page>
```

