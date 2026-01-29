# Todo App

A full-stack Todo application built with Node.js, Express, MongoDB, and EJS. This application follows the MVC (Model-View-Controller) architecture and includes user authentication.

## Features

- **User Authentication:** Secure Signup and Login functionality.
- **Task Management:** Create, Read, Update, and Delete (CRUD) todos.
- **Session Management:** Secure user sessions.
- **MVC Architecture:** Clean separation of concerns (Models, Views, Controllers).
- **Responsive Design:** Basic styling for a user-friendly interface.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose)
- **Frontend:** EJS (Embedded JavaScript templates), CSS
- **Authentication:** Passport.js

## Project Structure

```bash
todo-app/
├── config/              # Database connection & configuration
├── controllers/         # Request handling logic
├── middleware/          # Authentication & error handling middleware
├── models/              # Mongoose data schemas
├── public/              # Static files (CSS, JS, Images)
├── routes/              # Application routing
├── views/               # EJS templates for UI
├── app.js               # Application entry point
└── package.json         # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally (or a cloud Atlas URI)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/todo-app
    SESSION_SECRET=your_secret_key
    ```

4.  **Run the Application:**
    ```bash
    node app.js
    ```

5.  **Access the App:**
    Open your browser and visit: `http://localhost:3000`
