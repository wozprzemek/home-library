# home-library
A simple web application for managing a home book library.

## Technologies
- frontend layer: React
- backend layer: Django + DjangoRestFramework
- database layer: PostgreSQL

Backend and database layers are containerized using Docker Compose.

## Application functionalities
- displaying a list of books (information about their: title, author, release date) represented as a set of tiles responsive to the window size
- ability to delete and add new books
- ability to view and edit books
- filtering books by title fragment

## Running the application

### Prerequisites

- node.js (17.9.0 recommended)
- Docker

### Running the backend

Navigate to the /backend/ directory and use the following command to run the backend and connect to the database:

```
docker-compose up --build
```

### Running the frontend

Navigate to the /frontend/home-library/ directory and use the following commands to run the frontend:

```
npm install
npm start
```


