// Lectura simple de feature flags desde variables de entorno
// Uso: const { ENABLE_GPT5_FOR_ALL_CLIENTS } = require('./config/featureFlags');

const parseBool = (v) => {
  if (typeof v === 'string') return ['1', 'true', 'yes', 'on'].includes(v.trim().toLowerCase());
  return !!v;
};

module.exports = {
  ENABLE_GPT5_FOR_ALL_CLIENTS: parseBool(process.env.ENABLE_GPT5_FOR_ALL_CLIENTS || 'false'),
};
