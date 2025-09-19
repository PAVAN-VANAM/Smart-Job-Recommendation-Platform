# AI Rules for JobMatch Application

This document outlines the core technologies used in the JobMatch application and provides guidelines for using specific libraries and tools.

## Tech Stack Overview

The JobMatch application is built with a modern and robust web development stack, focusing on performance, maintainability, and developer experience.

*   **React:** A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer productivity.
*   **Vite:** A fast and opinionated build tool that provides an instant development server and optimized build process.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS, providing accessible and customizable UI elements.
*   **React Router:** A standard library for routing in React applications, enabling navigation between different views.
*   **React Query (TanStack Query):** A powerful library for fetching, caching, synchronizing, and updating server state in React.
*   **React Hook Form & Zod:** A combination for efficient form management and schema-based validation.
*   **Framer Motion:** A production-ready motion library for React, making it easy to add animations and interactive elements.
*   **Lucide React:** A collection of beautiful and customizable open-source icons.
*   **Axios:** A promise-based HTTP client for making API requests.

## Library Usage Guidelines

To maintain consistency and leverage the strengths of each library, please adhere to the following rules:

*   **UI Components (shadcn/ui):**
    *   Always prioritize using existing shadcn/ui components for common UI elements (buttons, cards, forms, dialogs, etc.).
    *   **DO NOT** modify files within `src/components/ui/`. If a component needs customization beyond its props, create a new component in `src/components/` that wraps or extends the shadcn/ui component.
*   **Styling (Tailwind CSS):**
    *   All styling should be done using Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary for complex, non-utility-based styles (which should be rare).
    *   Ensure designs are responsive by utilizing Tailwind's responsive prefixes (e.g., `md:`, `lg:`).
*   **Routing (React Router):**
    *   Manage all client-side routing using `react-router-dom`.
    *   Define routes primarily in `src/App.tsx`.
    *   Use `Link` for navigation and `useNavigate` hook for programmatic navigation.
*   **State Management & Data Fetching (React Query):**
    *   For fetching and managing server-side data, use `@tanstack/react-query`.
    *   For local UI state, use React's `useState` and `useReducer` hooks.
    *   Authentication state is managed via `src/contexts/AuthContext.tsx`.
*   **Form Handling (React Hook Form & Zod):**
    *   All forms should be built using `react-hook-form` for state management and validation.
    *   Use `zod` for defining form schemas and `zodResolver` for integrating with `react-hook-form`.
*   **Animations (Framer Motion):**
    *   Use `framer-motion` for any animations or transitions to ensure a smooth and consistent user experience.
*   **Icons (Lucide React):**
    *   Use icons from the `lucide-react` library.
*   **API Calls (Axios):**
    *   All HTTP requests to the backend should be made using the `api` instance defined in `src/lib/api.ts`. This ensures consistent headers and error handling.
*   **Toast Notifications:**
    *   For general-purpose, accessible toast notifications, use `sonner`.
    *   The `useToast` hook from `src/hooks/use-toast.ts` (which uses shadcn/ui's `Toast` component) is also available if specific shadcn/ui toast features are required.
*   **File Structure:**
    *   Keep pages in `src/pages/`.
    *   Keep reusable components in `src/components/`.
    *   Keep hooks in `src/hooks/`.
    *   Keep utility functions and API configurations in `src/lib/`.