// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    maxWorkers: 2,
    isolate: false, // Compartilha o mesmo contexto Node.js (inclusive conexões)
  },
});
