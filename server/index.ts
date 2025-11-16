#!/usr/bin/env node

/**
 * This file is a bridge to run Next.js through the existing Replit workflow.
 * It starts the Next.js development server programmatically.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const isDevelopment = process.env.NODE_ENV === 'development';

// Determine which command to run
const command = isDevelopment ? 'dev' : 'start';
const port = process.env.PORT || '5000';

console.log(`Starting Next.js ${command} server on port ${port}...`);

// Start Next.js
const nextProcess = spawn('npx', ['next', command, '-p', port], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: port,
  },
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down Next.js server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nGracefully shutting down Next.js server...');
  nextProcess.kill('SIGTERM');
});
