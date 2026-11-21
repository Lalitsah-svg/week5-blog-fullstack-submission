# Week 5 — React Blog + Express REST API

**Author:** Lalit Kumar

This project integrates a React blog frontend with a Node.js and Express REST API backend.

## Project Structure

- `react-blog-ui` — React + Vite frontend
- `node-express-rest-api` — Node.js + Express backend

## Features

- Fetch and display blog posts from REST API
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Loading and error states
- Responsive React interface
- Express REST API with CRUD endpoints
- CORS enabled for frontend-backend communication

## API Endpoints

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

## How to Run Backend

```bash
cd node-express-rest-api
npm install
npm start
```

The backend runs on:

`http://localhost:3000`

## How to Run Frontend

Open another terminal:

```bash
cd react-blog-ui
npm install
npm run dev
```

The React frontend communicates with the Express API running on port 3000.

## Technologies

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- CORS
- dotenv

## Week 5 Learning Outcome

This project demonstrates how a React frontend communicates with a backend REST API to perform complete CRUD operations on blog posts.