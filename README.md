# ProjectHub frontend

ProjectHub is a React and Tailwind CSS internal task-management interface for the MERN hiring task. A registered user can create projects, create tasks within a project, and move tasks through Todo, In Progress, and Done.

## Tech stack

- React 18, React Router, Vite
- Tailwind CSS
- REST API with JWT access and refresh tokens

## Features

- Register, login, protected routes, logout, and automatic access-token refresh
- Project list, creation, and deletion
- Task list, creation, deletion, and status updates
- Reusable Button, Input, Modal, Alert, Loader, and Layout components
- Client-side validation, loading states, and API error messages

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL` to your backend API URL, for example `http://localhost:5000/api`.
3. Run `npm install`.
4. Run `npm run dev`.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run lint` - lint the application

## Environment variables

| Name | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Public or local backend API base URL, including `/api` |

Never commit `.env`; use `.env.example` as the safe template.

## API endpoints used

- `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- `GET`, `POST`, `PUT`, `DELETE /projects` and `GET /projects/:id`
- `GET`, `POST /projects/:projectId/tasks`
- `PUT`, `PATCH`, `DELETE /tasks/:id`

The API layer sends the access token as a Bearer token. If a protected request returns `401`, it refreshes the access token and retries once. If refresh fails, the stored session is cleared and the protected route redirects to login.

## Folder structure

```text
src/
  components/  Reusable UI components
  context/     Authentication state
  lib/         Centralized API client
  pages/       Login, register, projects, and tasks screens
docs/          FRD, deployment notes, and submission checklist
```

## Deployment

See [deployment instructions](docs/DEPLOYMENT.md). Before submitting, replace the placeholders below with real public URLs:

- Frontend: `ADD_VERCEL_OR_NETLIFY_URL`
- Backend: `ADD_RENDER_API_URL`
- GitHub repository: `ADD_GITHUB_REPOSITORY_URL`

## Assignment documents

- [Functional requirements document](docs/FRD.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Submission checklist and Loom outline](docs/SUBMISSION_CHECKLIST.md)
