import app from './src/app.js';
import http from 'http';
import { initSocket } from './src/socket/socket.js';
import { pool } from './src/config/db.config.js';
import { config } from './src/config/env.config.js';

async function startServer() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Database connection verified successfully');

    // ✅ IMPORTANT: http server create
    const server = http.createServer(app);

    // ✅ socket attach
    initSocket(server);

    // ✅ listen http server (NOT app.listen)
    server.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });

  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    process.exit(1);
  }
}

startServer();
