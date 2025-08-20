Based on a synthesis of all the context you've provided—including the PRD, brand guides, and HTML mockups—here is a comprehensive, self-contained Front-End Specification for the Priority Access system.

### Introduction

This document outlines the complete user experience (UX) and user interface (UI) design for the Priority Access Confirmation System. Its purpose is to serve as the foundational blueprint for front-end development, ensuring the final product is a direct reflection of the project's strategic goals and brand identity. The specification is derived entirely from the provided project artifacts.

---
### Overall UX Goals & Principles

The user experience is designed to be efficient for internal operators and exceptionally clear and trustworthy for external clients.

* **User Personas**
    * **The Operator (Admin):** An internal user focused on speed and operational efficiency. Their primary goal is to create and share activation links with clients quickly. The provided `activation.html` includes a hidden "Admin Panel" with tools for on-the-fly editing, confirming their need for control and flexibility.
    * **The Client (Signer):** An external client whose main goal is to understand the terms and complete the confirmation with confidence and ease. Their journey is a single, critical task, requiring a frictionless and secure-feeling experience.

* **Usability Goals**
    * **Speed & Efficiency:** The entire client-facing flow is designed to take a user from opening the link to full activation in under 30 minutes, directly supporting a primary project KPI.
    * **Clarity & Trust:** The design must be unambiguous. This is achieved by presenting a professional interface and summarizing key terms before asking for a signature, aligning with the brand's "Proof + Guarantees" trust-building strategy.
    * **Frictionless Experience:** The design aims to guide the user through an emotional arc of **Relief,** feeling **Impressed,** then **Protected,** and ultimately **Empowered**.

* **Design Principles**
    * **Guided Journey:** The client flow is strictly linear with no external navigation, keeping the user focused on the single task of activation.
    * **Immediate Feedback:** Every major user action is met with an immediate and clear visual response, from the button's disabled state changing upon consent to the animated loading screen and the final success confirmation.
    * **Transparency First:** The activation page transparently presents key terms and provides a link to the full legal agreement, ensuring the client is fully informed before committing.

---
### User Flow and Screen Analysis

The client's journey is a carefully orchestrated three-screen flow designed for clarity and momentum.

1.  **The Activation Page** (`activation.html`)
    This screen's purpose is to present the offer and capture a formal agreement in a way that feels secure and straightforward.
    * **Key Elements:**
        * **Header:** "Activate Priority Access".
        * **Search Details:** A personalized block confirming the "Company," "Position," and "Salary Range".
        * **Key Terms Summary:** A bulleted list of the most important clauses, such as "Exclusivity" and "Placement Fee".
        * **Signature Form:** A mandatory checkbox with the text "I have read and agree..." and input fields for "Full Name" and "Work Email Address".
    * **Interaction Notes:** The "Activate Priority Access" button is disabled by default. It becomes enabled only when the consent checkbox is checked and the required fields are filled, preventing accidental submission.

2.  **The Loading Screen** (`loading.html`)
    This intermediary screen provides crucial feedback after submission, turning a necessary pause into a reassuring experience.
    * **Visual Feedback:** An animated progress bar and a spinner immediately show the user that their request is being processed.
    * **Reassuring Copy:** Status messages dynamically change (e.g., "Securing your... exclusive search window…"), which reinforces the value of the action being taken.

3.  **The Confirmation Page** (`confirmed.html`)
    This final screen provides unambiguous confirmation of success and sets clear expectations for what comes next.
    * **Key Elements:**
        * **Success Confirmation:** A large "Priority Access Activated!" headline with a green checkmark icon.
        * **Details Summary:** A block that recaps the "Confirmed Search Details".
        * **Next Steps:** A numbered list outlines "What Happens Next" with a clear timeline, such as receiving a candidate profile "Today".
        * **Document Access:** A button to "Download Agreement (PDF)" gives the client a tangible record of their agreement.

---
### Branding & Style Guide

The visual design is professional and high-impact, directly reflecting the principles laid out in the brand documents.

* **Color Palette**
| Role | Hex Code | Usage |
| :--- | :--- | :--- |
| Primary Accent | `#cc2e00` | Action buttons, emphasis highlights |
| Dark Base | `#1c1819` | Headlines, navigation, footer |
| Neutral Text | `#4c4243` | Standard body text |
| Light Background| `#f9f5f3` | Section blocks, page background |

* **Typography**
    * **Headings:** Use a high-contrast display font with a bold, editorial feel (e.g., "Reckless Neue" style).
    * **Body:** Use a clean, readable sans-serif font (e.g., Inter or a system font) for all other text.
    * **Style Rule:** Major headlines are intentionally oversized to make a bold statement, supported by smaller, minimal body text.

* **Layout**
    * **Cards:** All content is framed within centered cards with soft borders and shadows, creating a focused and organized presentation.
    * **Whitespace:** The design uses generous whitespace to prevent cognitive overload and improve readability, especially around legal and financial details.

---
### Accessibility & Responsiveness

* **Compliance Target:** The design must meet WCAG 2.1 Level AA standards.
* **Key Requirements:**
    * All form elements use proper `<label>` tags for screen reader compatibility.
    * The entire flow must be navigable by keyboard.
    * Color contrast ratios must meet the AA standard.
* **Responsiveness:** The layout adapts for smaller screens. The CSS includes a `@media (max-width: 768px)` block that adjusts padding and layout, ensuring a seamless experience on mobile devices.