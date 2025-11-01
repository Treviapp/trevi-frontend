import axios from "axios";
import Constants from "expo-constants";
import store from "../redux";

/* ------------------------------------------------------------------
   Define Backend URLs
   ------------------------------------------------------------------ */
export const BASE_URL = "https://trevi-backend.onrender.com/api";
export const ROOT_URL = BASE_URL;

/* ------------------------------------------------------------------
   Axios client
   ------------------------------------------------------------------ */
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/* ------------------------------------------------------------------
   Attach bearer-token (if a creator logs in later)
   ------------------------------------------------------------------ */
client.interceptors.request.use(
  (config) => {
    const { authenticationToken } = store.getState().userSession || {};

    return {
      ...config,
      headers: {
        Accept: "application/json",
        "Content-Type": config.headers["Content-Type"] || "application/json",
        ...(authenticationToken && {
          Authorization: `Bearer ${authenticationToken.token}`,
        }),
      },
    };
  },
  (err) => Promise.reject(err)
);

/* ------------------------------------------------------------------
   Export everything needed
   ------------------------------------------------------------------ */
export { client };
export const API_BASE_URL = BASE_URL;

/* ------------------------------------------------------------------
   Stripe Publishable Key
   ------------------------------------------------------------------ */
const resolveStripeKey = () => {
  const expoExtra =
    Constants?.expoConfig?.extra || Constants?.manifest?.extra || {};

  return (
    process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    expoExtra.stripePublishableKey ||
    "pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ"
  );
};

export const STRIPE_PUBLISHABLE_KEY = resolveStripeKey();
