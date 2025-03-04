import {
  createDirectus,
  staticToken,
  realtime,
  rest,
  graphql,
} from '@directus/sdk';

const apiUrl = import.meta.env.VITE_API_URL;
const apiToken = import.meta.env.VITE_API_TOKEN;

if (!apiUrl || !apiToken) {
  throw new Error('API URL and token must be defined in environment variables');
}

export const directus = createDirectus(apiUrl)
  .with(staticToken(apiToken))
  .with(rest())
  .with(graphql())
  .with(realtime());

export const connect = async () => {
  try {
    await directus.connect();
    console.log('Successfully connected to Directus');
  } catch (error) {
    console.error('Failed to connect to Directus:', error);
    throw error;
  }
};
