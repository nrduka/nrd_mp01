# Taskboard

A multi-page task-tracking app that fetches from a public API using TanStack Query, includes loading/error/empty states, has three routes via React Router, and uses a responsive Tailwind CSS UI.

## Features

- Task table with assigned users and Done/Open status.
- Task detail page with a status toggle.
- Total, completed, and open task counts.
- Completed-task bars for each user.
- Responsive layouts using Tailwind CSS.
- Loading, error, empty, and retry states.


# Setup from a fresh clone

Requirements: Node.js `^20.19.0 || >=22.12.0`, npm, Git, and an internet connection.

```bash
git clone https://github.com/nrduka/nrd_mp01.git nrd_mp01_review
cd nrd_mp01_review
npm ci
npm run dev
```

## File structure

```text
src/
├── main.jsx
├── App.jsx
├── index.css
├── App.css
├── assets/
└── components/
    ├── Dashboard.jsx
    ├── TaskList.jsx
    ├── TaskDetail.jsx
    ├── Stats.jsx
    └── About.jsx
public/
index.html
package.json
package-lock.json
vite.config.js
eslint.config.js
```

## Components and sources

Components in `nrd_mp01`, with a brief technical description and the source files referenced for each one. Course examples were adapted for Taskboard.

- **App — `src/App.jsx`**

  Defines routes with React Router and stores shared completion state in `useState`. Passes `taskChange` and callback props to the task pages.

  **Sources:** `Slide15_TanStack_Demo_Finished/src/App.jsx` for routing; `vite-react-starter/src/components/Dashboard.jsx` for lifting state and passing callbacks.

- **Dashboard — `src/components/Dashboard.jsx`**

  Renders the page header and navigation using React Router's `Link` component.

  **Source:** Taskboard-specific header and navigation; no separate course source identified.

- **TaskList — `src/components/TaskList.jsx`**

  Uses TanStack Query to fetch tasks and users. Matches users by ID, renders task rows with `.map()`, filters titles with `.filter()` and `.includes()`, and sends checkbox changes to App through a callback. Handles loading, errors, retries, and empty results.

  **Sources:** `Slide15_TanStack_Demo_Finished/src/components/ProductList.jsx` for fetching and query states; `Week6_Starter_App/src/pages/ProductListPage.jsx` for filtering; `Week6_Starter_App/src/App.jsx` and `Week6_Starter_App/src/components/Header.jsx` for search state and controlled input handling.

- **TaskDetail — `src/components/TaskDetail.jsx`**

  Reads the task ID with `useParams` and uses an ID-specific query to fetch the task and its assigned user. Displays task details and provides a button that updates shared completion state.

  **Source:** `Slide15_TanStack_Demo_Finished/src/components/ProductDetail.jsx` for route parameters, detail fetching, and query states.

- **Stats — `src/components/Stats.jsx`**

  Reuses the task and user queries. Calculates total, Done, and Open tasks, then uses `.filter()` and `.map()` to display completed-task counts and proportional bars for each user.

  **Sources:** `Slide15_TanStack_Demo_Finished/src/components/ProductList.jsx` for query states; Taskboard's `src/components/TaskList.jsx` for shared fetch and retry functions. Statistics calculations are specific to Taskboard.

- **About — `src/components/About.jsx`**

  Renders a static About page. The current body contains placeholder text.

  **Source:** Taskboard-specific placeholder content; no separate course source identified.

## Supporting files

- **Application entry — `src/main.jsx`**

  Mounts React and wraps App in `QueryClientProvider` and `BrowserRouter`.

  **Source:** `Slide15_TanStack_Demo_Finished/src/main.jsx`.

- **Styles — `src/index.css`**

  Uses Tailwind utilities through `@apply` to style navigation, tables, status badges, task details, and statistics.

  **Source:** Taskboard-specific styles; no separate course source identified.

## API source

`TaskList.jsx` and `Stats.jsx` use JSONPlaceholder tasks and users. `TaskDetail.jsx` requests individual records by ID.

- Tasks: `https://jsonplaceholder.typicode.com/todos`
- Users: `https://jsonplaceholder.typicode.com/users`

## Process Flow
`TASKBOARD-PROCESS FLOW.drawio.pdf`