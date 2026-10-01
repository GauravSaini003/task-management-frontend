# Deployment Guide

## Backend on Render

1. Deploy the Node/Express backend as a Render Web Service.
2. Configure production environment variables, including MongoDB connection details, JWT secrets, and `CLIENT_URL`.
3. Confirm `GET /api/health` responds publicly.
4. Copy the API base URL, including `/api`.

## Frontend on Vercel or Netlify

1. Import this GitHub repository.
2. Use the Vite build command: `npm run build`.
3. Use `dist` as the publish directory.
4. Add `VITE_API_URL` with the Render API base URL.
5. Deploy, then set the exact deployed frontend origin as the backend `CLIENT_URL`.
6. Test registration, login, token refresh, project creation, task creation, status update, and logout in the deployed app.

Do not include a trailing slash in either configured origin.
