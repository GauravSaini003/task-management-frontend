# Functional Requirements Document

## Purpose

ProjectHub is an internal project and task-management tool. It lets an authenticated user organise work by project and update each task's progress.

## Features

- Register and log in with an email address and password.
- View only the signed-in user's projects.
- Create and delete projects.
- View tasks inside a selected project.
- Create and delete tasks.
- Set a task status to Todo, In Progress, or Done.
- Log out safely.

## User flow

1. A new user creates an account, or an existing user signs in.
2. The app stores the authenticated session and opens the project list.
3. The user creates a project and opens it.
4. The user adds tasks and changes their status as work progresses.
5. The user logs out. If the access token expires, the app refreshes it once; if refresh fails, it signs the user out.

## Validations

- Name, email, and password are required to register.
- The email field uses browser email validation.
- Registration passwords must contain at least six characters and must match the confirmation.
- Project names are required and limited to 100 characters.
- Task titles are required and limited to 150 characters.
- The API remains the source of truth for ownership, input validation, and error messages.

## Assumptions

- The backend follows the supplied Task Manager API contract.
- Users can access only their own projects and tasks.
- `VITE_API_URL` points to a backend with CORS configured for the deployed frontend origin.
- The free hosted backend may take time to wake up, so the UI shows loading states.
