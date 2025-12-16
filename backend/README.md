# InfoPoster Backend

This is the backend for the InfoPoster application.

## Prerequisites

- Node.js
- npm
- MongoDB

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Create a `.env` file:**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    MONGO_URI=YOUR_MONGO_URI
    PORT=5000
    ```

    Replace `YOUR_MONGO_URI` with your MongoDB connection string. You can get one for free from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

3.  **Run the server:**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5000`.