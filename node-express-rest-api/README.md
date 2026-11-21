# Node Express REST API

A RESTful backend API built with Node.js and Express.js for managing blog posts and tasks.

## Author

Lalit Kumar

## Week 5 – Connect Frontend to Backend

This project was extended to provide a complete REST API for the React blog frontend.

The API supports CRUD operations for blog posts:

- List all posts
- Get a single post
- Create a new post
- Update an existing post
- Delete a post

## Technologies Used

- Node.js
- Express.js
- JavaScript
- CORS
- dotenv
- Postman

## Project Structure

```text
node-express-rest-api/
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── postController.js
│   │   └── taskController.js
│   ├── data/
│   │   ├── posts.js
│   │   └── tasks.js
│   └── routes/
│       ├── postRoutes.js
│       └── taskRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── README.md