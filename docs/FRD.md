# Functional Requirements Document

## 1. Purpose

ProjectHub is an internal tool where a logged-in user organises work into
projects and tasks and tracks each task's progress. Each user can access only
their own data.

## 2. Feature list

- Register and log in with name, email, and password.
- JWT authentication: access token plus refresh token. Protected APIs require
  a valid access token.
- Create, view, and delete projects.
- Create, view, edit, and delete tasks inside a project.
- Update task status: Todo, In Progress, or Done.
- Log out, which invalidates the stored refresh token.
- Clean React UI with three screens: Login (and Register), Project list, and
  Task list with status update.

## 3. User flow

1. A new user registers, or an existing user logs in.
2. The app stores the access and refresh tokens in browser localStorage and
   opens the project list.
3. The user creates a project and opens it.
4. The user adds tasks and changes their status as work progresses.
5. The user edits or deletes tasks, or deletes a project (its tasks are
   deleted too).
6. If the access token expires, the app refreshes it once. If the refresh
   fails, the stored session is cleared and the user returns to login.
7. The user logs out.

## 4. Validations

- Name, email, and password are required at registration.
- Email must be valid and unique.
- Password must be at least 6 characters and match the confirmation field.
- Project name is required, maximum 100 characters.
- Task title is required, maximum 150 characters.
- Task status must be `todo`, `in-progress`, or `done`.
- A user cannot read, edit, or delete another user's projects or tasks.
- Invalid IDs, missing routes, and validation failures return a clear JSON
  error through the central error handler.

## 5. Assumptions

- Each project has one owner and is not shared between users.
- Each task belongs to exactly one project.
- Only three statuses exist. Priority, due dates, and assignees are out of
  scope for this version.
- Passwords are stored as bcrypt hashes. Secrets and database details live in
  environment variables and are never committed.
- Frontend (Vercel) and backend (Render) are deployed separately. The backend
  allows the frontend origin through `CLIENT_URL`, and the frontend reaches the
  backend through `VITE_API_URL`.
- The free Render backend may sleep, so the first request can be slow and the
  UI shows loading states.