const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Intentamos cargar .env desde dos rutas comunes
const candidatePaths = [
  path.resolve(process.cwd(), '.env'), // backend/.env
  path.resolve(__dirname, '.env'),     // backend/src/config/.env
];

let loadedPath = null;
for (const p of candidatePaths) {
  if (fs.existsSync(p)) {
    const res = dotenv.config({ path: p });
    if (!res.error) {
      loadedPath = p;
      break;
    }
  }
}

if (!loadedPath) {
  console.warn('[configEnv] No se encontró archivo .env en', candidatePaths.join(' | '));
} else {
  console.log(`[configEnv] .env cargado desde: ${loadedPath}`);
}

// Helper para normalizar strings (recortar espacios)
const norm = (v, def = '') => (typeof v === 'string' ? v.trim() : (v ?? def));

// Normalizamos nombres comunes por si el .env usa variantes
const env = {
  DATABASE: norm(process.env.DATABASE || process.env.DB_NAME, ''),
  DB_USERNAME: norm(process.env.DB_USERNAME || process.env.DB_USER, ''),
  HOST: norm(process.env.HOST || process.env.DB_HOST, 'localhost'),
  PASSWORD: norm(process.env.PASSWORD || process.env.DB_PASSWORD, ''),
  DB_PORT: Number.parseInt(norm(process.env.DB_PORT, '5432'), 10),
};

// Validaciones mínimas (no detenemos el proceso, solo advertimos para facilitar el diagnóstico)
const missing = Object.entries(env)
  .filter(([k, v]) => (k === 'DB_PORT' ? Number.isNaN(v) : v === ''))
  .map(([k]) => k);

if (missing.length) {
  console.warn('[configEnv] Variables faltantes o inválidas en .env:', missing.join(', '));
}

module.exports = env;
