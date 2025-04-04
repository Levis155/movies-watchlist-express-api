import express from "express";
import { PrismaClient } from "@prisma/client";
import validateMovie from "./Middleware/validateMovie.js";

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await client.movie.findMany();

    res.status(200).json({
      status: "Success",
      message: "Found all movies successfully.",
      data: allMovies,
    });
  } catch {
    res.status(500).json({
      status: "Error",
      message: "An error occurred.",
    });
  }
});

app.get("/movies/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;

    const foundMovie = await client.movie.findFirst({
      where: {
        id: movieId,
      },
    });

    if (!foundMovie) {
      res.status(404).json({
        status: "Error",
        message: "Movie not found",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: `Found movie with id ${movieId} successfully.`,
        data: foundMovie,
      });
    }
  } catch {
    res.status(500).json({
      status: "Error",
      message: "There was an error",
    });
  }
});

app.post("/movies", validateMovie, async (req, res) => {
  const { movieTitle, movieDescription } = req.body;

  try {
    const newMovie = await client.movie.create({
      data: {
        movieTitle,
        movieDescription,
      },
    });

    res.status(201).json({
      status: "success",
      message: "New movie added successfully",
      data: newMovie,
    });
  } catch (e) {
    res.status(500).json({
      message: "An error occurred",
    });
  }
});

app.patch("/movies/:movieId", async (req, res) => {
  const { movieTitle, movieDescription, watched } = req.body;
  const { movieId } = req.params;

  try {
    const updatedMovie = await client.movie.update({
      where: {
        id: movieId,
      },
      data: {
        movieTitle: movieTitle && movieTitle,
        movieDescription: movieDescription && movieDescription,
        watched: watched && watched,
      },
    });

    res.status(200).json({
      status: "Success",
      message: `Successfully updated movie with id ${movieId}`,
      data: updatedMovie,
    });
  } catch {
    res.status(500).json({
      status: "Error",
      message: "There was an error",
    });
  }
});

app.delete("/movies/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    await client.movie.delete({
      where: {
        id: movieId,
      },
    });

    res.status(200).json({
      status: "Success",
      message: `Deleted movie with id ${movieId} successfully!`,
    });
  } catch {
    res.status(500).json({
      status: "Error",
      message: "There was an error",
    });
  }
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App running on port 3000");
});
