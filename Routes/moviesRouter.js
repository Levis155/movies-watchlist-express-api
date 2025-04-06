import { Router } from "express";
import validateMovie from "../Middleware/validateMovie.js";
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../Controllers/moviesControllers.js";

const router = Router();

router.route("/").get(getAllMovies).post(validateMovie, createMovie);

router.route("/:movieId").get(getMovie).patch(updateMovie).delete(deleteMovie);

export default router;
