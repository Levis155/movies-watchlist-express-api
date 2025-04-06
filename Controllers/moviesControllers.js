import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createMovie = async (req, res) => {
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
};

export const getAllMovies = async (_req, res) => {
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
};

export const getMovie = async (req, res) => {
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
};

export const updateMovie = async (req, res) => {
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
};

export const deleteMovie = async (req, res) => {
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
};
