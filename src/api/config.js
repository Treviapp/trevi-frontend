// src/api/config.js
import axios from 'axios';
import { store } from '../redux';

/* ------------------------------------------------------------------
   Base URLs
   ------------------------------------------------------------------ */
// ngrok tunnel – exposes Laravel dev backend over HTTPS
const ROOT_URL = 'https://85de-2a0a-ef40-7ce-5901-69ea-63e0-95ad-9f48.ngrok-free.app';

// If you later deploy Trevi, add new lines here:
// const ROOT_URL = 'https://api-dev.treviapp.com';
// const ROOT_URL = 'https://api-stage.treviapp.com';
// const ROOT_URL = 'https://api.treviapp.com';        // production

const BASE_URL = `${ROOT_URL}/api`;

/* ------------------------------------------------------------------
   Axios instance
   ------------------------------------------------------------------ */
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* ------------------------------------------------------------------
   Attach bearer-token (if a creator logs in later)
   ------------------------------------------------------------------ */
client.interceptors.request.use(
  config => {
    const { authenticationToken } = store.getState().userSession;

    return {
      ...config,
      headers: {
        Accept: 'application/json',
        'Content-Type': config.headers['Content-Type'] || 'application/json',
        ...(authenticationToken && {
          Authorization: `Bearer ${authenticationToken.token}`,
        }),
      },
    };
  },
  err => Promise.reject(err),
);

export { ROOT_URL, BASE_URL, client };
