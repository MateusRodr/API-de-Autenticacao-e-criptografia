import "reflect-metadata";
import './shared/container';
import express from "express";
import { errorMiddleware } from "./middlewares/error/error.middleware";
import routes from "./routes/routes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use(routes);
setupSwagger(app);

app.use(errorMiddleware);

export default app;