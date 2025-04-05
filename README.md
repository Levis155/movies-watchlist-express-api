# Description

A simple RESTful API built with Express.js, Prisma, and PostgreSQL to manage a movies watch-list. (CRUD operations).

## Features 
- Get all movies in the watch-list
- Get a specific movie in the watch-list
- Add a new movie into the watch-list
- Update an existing movie
- Delete a movie from the watch-list

## Setup and Installation

1. Clone the Repository

    ```bash
    git clone https://github.com/Levis155/movies-watchlist-express-api.git
    ```

1. Configure your database

    Create a .env file and add your PostgreSQL connection URL.

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
    ```

1. Push the Prisma schema to your database

    ```bash
    npx prisma migrate dev --name migration_name
    ```
1. Install nodemon

    ```bash
    npm i nodemon
    ```

1. Start the server

    ```bash
    nodemon index.js
    ```

1. Start using the API by making requests.

## Usage

Here are all requests you can make in the terminal(you can also opt for API testing tools such as Postman, ThunderClient, Insomnia etc).

- Add a movie to your watch-list:

```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "movieTitle": "Your movie's title",
    "movieDescription": "Your movie's description",
  }'
```

- Get all movies

```bash
curl -X GET http://localhost:3000/movies
```

- Get a single movie

```bash
curl -X GET http://localhost:3000/movies/< movieId >
```

- update a movie

```bash
curl -X PUT http://localhost:3000/movies/< movieId > \
  -H "Content-Type: application/json" \
  -d '{
    "watched": true
  }'
```

- Delete a movie

```bash
curl -X DELETE http://localhost:3000/movies/ < movieId >
```