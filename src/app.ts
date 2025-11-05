import "reflect-metadata";
import './shared/container';
import express from "express";
import { router } from "./routes/routes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use(router);
setupSwagger(app);

export default app;