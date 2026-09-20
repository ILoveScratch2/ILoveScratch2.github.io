import { createRequestHandler } from "@react-router/express";
import express from "express";
import "react-router";

const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
  })
);

export default app;
