# xtrmnd-users-vue-app

Simple web application that fetches and displays a list of users from a public API.
The application is developed using Vue and containerized using Docker.

## Project Overview

- Fetches user data from the public API `https://jsonplaceholder.typicode.com/users`.
- Displays the fetched data in a list format on the frontend.
- The app includes error handling in case the API request fails.
- The app is containerized using Docker to make deployment easier.

## Setup and Installation

### Running Locally (Without Docker)

If you want to run the app locally for development and testing, follow these steps:

1. **Clone the repository**  
   Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-folder>


2. **Install dependencies**  
   Inside the project folder, install all required dependencies:

   ```bash
   npm install

3. **Run the development server**  
   Start the Vue.js development server:

   ```bash
   npm run serve

The app will be available at http://localhost:8080

### Running with Docker

To run the application using Docker, follow these steps:

1. **Install Docker**  
   Ensure you have Docker installed if not download it from Docker’s official
   website (https://www.docker.com/get-started).

2. **Clone the repository**  
   Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-folder>

3. **Run Docker Compose**  
   Execute the following command to build and start the containers:

   ```bash
   docker-compose up --build

The app will be available at http://localhost:8080

4. **Stopping the application**

   ```bash
   docker-compose up --build
