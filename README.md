# Welcome to Antigravity!

Welcome to your new developer home! Your Firebase Studio project has been successfully migrated to Antigravity.

Antigravity is our next-generation, agent-first IDE designed for high-velocity, autonomous development. Because Antigravity runs locally on your machine, you now have access to powerful local workflows and fully integrated AI editing capabilities that go beyond a cloud-based web IDE.

## Getting Started
- **Run Locally**: Use the **Run and Debug** menu on the left sidebar to start your local development server.
  - Or in a terminal run `npm run dev` and visit `http://localhost:9002`.
- **Deploy**: You can deploy your changes to Firebase App Hosting by using the integrated terminal and standard Firebase CLI commands, just as you did in Firebase Studio.
- **Cleanup**: Cleanup unused artifacts with the @cleanup workflow.

Enjoy the next era of AI-driven development!

File any bugs at https://github.com/firebase/firebase-tools/issues

**Firebase Studio Export Date:** 2026-03-30


---

## Previous README.md contents:

# AdsVerse Digital Marketing Website

Welcome to the official repository for the AdsVerse website, built with Firebase Studio. This is a modern, performant, and feature-rich web application designed to showcase digital marketing services, case studies, and insights.

## Tech Stack

This project is built with a modern, production-ready tech stack:

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Library:** [React](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) (for future AI features)
-   **Backend & Hosting:** [Firebase](https://firebase.google.com/) (App Hosting, Firestore)
-   **Internationalization (i18n):** Middleware-based routing for English (`/en`) and Hindi (`/hi`).

## Project Structure

Here's a brief overview of the key directories:

-   `src/app/[lang]`: Contains all the main pages of the application, organized by language.
-   `src/components`: Reusable UI components used across the site (e.g., layout, form elements).
-   `src/lib`: Utility functions, Firebase configuration, and internationalization logic.
-   `src/dictionaries`: JSON files containing translations for different languages.
-   `src/middleware.ts`: Handles the language routing for the entire application.
-   `public/`: Static assets like images and manifest files.

## Getting Started

To get the project running locally, follow these steps:

1.  **Install Dependencies:**
    Make sure you have Node.js (v22 or later) and npm installed. Then, run:
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    To start the development server, which will typically run on `http://localhost:9002`:
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    To create an optimized production build of the application:
    ```bash
    npm run build
    ```

4.  **Start the Production Server:**
    To run the production build locally:
    ```bash
    npm run start
    ```

## Key Features

-   **Dark/Light Mode:** Fully implemented theme switching using `next-themes`.
-   **Internationalization (i18n):** The app supports English (`en`) and Hindi (`hi`) out of the box. New pages should be added within the `src/app/[lang]` directory.
-   **SEO Optimized:** Includes dynamic sitemaps, robots.txt, and structured data (JSON-LD) for better search engine visibility.
-   **Component-Based:** Built with reusable components from ShadCN UI for a consistent and modern look and feel.

---
This project was scaffolded and is being developed with **Firebase Studio**.
