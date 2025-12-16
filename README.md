# InfoPoster

InfoPoster is a full-stack MERN application that allows users to create, view, and share posts.

## Getting Started

To get the application up and running, you'll need to start both the backend and frontend servers.

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    MONGO_URI=YOUR_MONGO_URI
    PORT=5000
    ```

    Replace `YOUR_MONGO_URI` with your MongoDB connection string. You can get one for free from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4.  **Run the server:**

    ```bash
    npm start
    ```

    The backend server will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the client:**

    ```bash
    npm start
    ```

    The frontend development server will be running on `http://localhost:3000`.