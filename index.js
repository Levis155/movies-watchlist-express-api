import express from "express";
import moviesRouter from "./Routes/moviesRouter.js";

const app = express();

app.use(express.json());
app.use("/movies", moviesRouter);

export default app;
