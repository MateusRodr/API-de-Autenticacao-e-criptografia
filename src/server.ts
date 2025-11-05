import 'reflect-metadata';
import app from "./app"; 

const PORT = process.env.PORT || 3312;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

