# Project-1: Task Manager API

## Description
This is a simple Task Manager API built using **Node.js**, **Express**, and **MongoDB**. It allows users to manage tasks by performing CRUD (Create, Read, Update, Delete) operations. The API supports the following features:
- Create new tasks
- Retrieve all tasks
- Retrieve a specific task by ID
- Update a task
- Delete a task

## Technologies Used
- **Node.js** - Server-side JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing tasks
- **Mongoose** - ODM (Object Data Modeling) for MongoDB

## Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v12+)
- [MongoDB](https://www.mongodb.com/) (locally installed or cloud-based like MongoDB Atlas)

### Steps to Run the Project Locally


1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     ```

3. **Start the MongoDB server**
   - Ensure MongoDB is running locally or provide the connection string for a cloud-based database (like MongoDB Atlas).

4. **Run the application**
   ```bash
   npm start
   ```

   The server should start, and you can access the API at `http://localhost:3000/api/v1/tasks`.

## API Endpoints

### 1. Get All Tasks
- **URL**: `/api/v1/tasks`
- **Method**: `GET`
- **Description**: Fetches all tasks from the database.
- **Response**:
  ```json
  {
    "tasks": [
      {
        "_id": "615b8e8f7f935b00155f7f5e",
        "name": "Complete the project",
        "completed": true
      },
      {
        "_id": "615b8e8f7f935b00155f7f5f",
        "name": "Read a book",
        "completed": false
      }
    ],
    "nTasks": 2
  }
  ```

### 2. Create a New Task
- **URL**: `/api/v1/tasks`
- **Method**: `POST`
- **Description**: Adds a new task to the database.
- **Request Body**:
  ```json
  {
    "name": "Buy groceries",
    "completed": false
  }
  ```
- **Response**:
  ```json
  {
    "_id": "615b8e8f7f935b00155f7f60",
    "name": "Buy groceries",
    "completed": false
  }
  ```

### 3. Get a Task by ID
- **URL**: `/api/v1/tasks/:id`
- **Method**: `GET`
- **Description**: Fetches a specific task by its ID.
- **Response**:
  ```json
  {
    "_id": "615b8e8f7f935b00155f7f60",
    "name": "Buy groceries",
    "completed": false
  }
  ```

### 4. Update a Task
- **URL**: `/api/v1/tasks/:id`
- **Method**: `PATCH`
- **Description**: Updates the details of a specific task.
- **Request Body**:
  ```json
  {
    "completed": true
  }
  ```
- **Response**:
  ```json
  {
    "_id": "615b8e8f7f935b00155f7f60",
    "name": "Buy groceries",
    "completed": true
  }
  ```

### 5. Delete a Task
- **URL**: `/api/v1/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Error Handling
- The API uses centralized error handling to ensure all errors are caught and managed.
- If any error occurs, the API will return a response with the error message and status code.
