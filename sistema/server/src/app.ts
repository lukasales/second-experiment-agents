import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { apiRouter } from "./routes";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
  })
);

app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "Second Experiment API is running.",
  });
});

app.use("/api", apiRouter);

export { app };