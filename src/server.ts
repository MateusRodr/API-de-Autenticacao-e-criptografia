import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./infra/database/typeorm/data-source";

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });