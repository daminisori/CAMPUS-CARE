import app from './app';
import { env } from './config/env';
import prisma from './config/db';
import net from 'net';
import { startDatabase } from './db-runner';

function isPortOpen(port: number, host = '127.0.0.1'): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function startServer() {
  try {
    // Check if PostgreSQL on port 5432 is reachable for local development; if using remote DB, connect directly
    const isLocalDb = env.DATABASE_URL.includes('localhost') || env.DATABASE_URL.includes('127.0.0.1');
    if (isLocalDb) {
      const isDbRunning = await isPortOpen(5432);
      if (!isDbRunning) {
        console.log('PostgreSQL is not detected on port 5432. Launching embedded PostgreSQL server...');
        await startDatabase(5432);
      } else {
        console.log('Detected active PostgreSQL instance on port 5432.');
      }
    } else {
      console.log('Connecting to remote PostgreSQL database instance...');
    }

    // Verify Prisma connection
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL via Prisma!');

    // Start Express listener
    const server = app.listen(env.PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Campus Care Backend running on http://localhost:${env.PORT}`);
      console.log(`📋 Healthcheck: http://localhost:${env.PORT}/health`);
      console.log(`🔒 Authentication: JWT Bearer enabled`);
      console.log(`🗄️ Database: PostgreSQL (Prisma ORM)`);
      console.log(`====================================================`);
    });

    const shutdown = async () => {
      console.log('\nGracefully shutting down Campus Care backend...');
      server.close(async () => {
        await prisma.$disconnect();
        console.log('Database disconnected. Process terminated.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Fatal error starting Campus Care backend server:', error);
    process.exit(1);
  }
}

startServer();
