import express from "express";
import app from "./app"; 

const PORT = process.env.PORT || 3312;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
startServer();
