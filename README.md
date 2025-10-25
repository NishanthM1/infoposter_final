# InfoPoster Project

## Overview
InfoPoster is a full-stack web application designed to allow users to create, view, and manage news-related posts. It features user authentication, post creation with image uploads, and the ability to view and interact with posts.

## Features
*   **User Authentication:** Register and log in securely.
*   **Post Management:** Create, view, update, and delete your own posts.
*   **Image Uploads:** Include images with your posts.
*   **News Feed:** Browse posts from all users.
*   **User Profiles:** View posts created by specific users.

## Technologies Used

### Frontend
*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For navigation within the application.
*   **Axios:** For making HTTP requests to the backend API.
*   **CSS:** For styling the application.

### Backend
*   **Node.js:** A JavaScript runtime for server-side development.
*   **Express.js:** A web application framework for Node.js.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens):** For secure user authentication.
*   **Multer:** For handling `multipart/form-data`, primarily for file uploads.
*   **Bcrypt.js:** For hashing passwords.

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   MongoDB (local or cloud-hosted)
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NishanthM1/infoposter.git
    cd infoposter
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your MongoDB URI and JWT Secret
    # Example .env content:
    # MONGO_URI=mongodb://localhost:27017/infoposter
    # JWT_SECRET=your_jwt_secret
    node server.js
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

The application should now be running on `http://localhost:3000`.