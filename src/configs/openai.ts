// Read env lazily so values resolve at request time on Cloudflare Workers
// (module-scope reads of process.env can be empty in the Workers runtime).
export const getApiKey = () => process.env.OPENAI_API_KEY || 'sk-xxxxxx';
export const getModel = () => process.env.OPENAI_API_MODEL || 'sora-1.0-turbo';
export const getBaseUrl = () =>
  process.env.OPENAI_API_BASE_URL || 'https://fake-sora-api.sorawebui.com';
