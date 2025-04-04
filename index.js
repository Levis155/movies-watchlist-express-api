import express from 'express';

const app =  express();

let port = process.env.PORT || 3000;

app.get("/movies", (req, res) => {
    res.send("Getting all movies")
})

app.get("/movies/:movieId", (req, res) => {
    res.send("Getting a specific movie")
})

app.post("/movies", (req, res) => {
    res.send("Creating a movie")
})

app.patch("/movies/:movieId", (req, res) => {
    res.send("Updating a specific movie")
})

app.delete("/movies/:movieId", (req, res) => {
    res.send("Deleting a specific movie")
})

app.listen(port, () => {
    console.log("App running on port 3000")
})