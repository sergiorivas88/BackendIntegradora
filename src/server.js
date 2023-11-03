import http from 'http';
import app from './app.js';
import { init as initializeDatabase } from './db/mongodb.js';

// Inicializar la base de datos antes de crear el servidor
(async () => {
  try {
    await initializeDatabase();
    startServer();
  } catch (error) {
    console.error('Error initializing the database:', error.message);
  }
})();

function startServer() {
  const server = http.createServer(app);
  const PORT = 8080;

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} 🚀`);
  });
}
