import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['server.ts'],
  outDir: 'dist-api',
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'express',
    'stripe',
    'cors',
    'express-rate-limit',
    'dotenv',
  ],
})
