export const APP_NAME = 'KDP Formatter Pro';
export const APP_DESCRIPTION = 'Professional KDP book formatting tool';
export const APP_URL = process.env.APP_URL || 'http://localhost:5000';

export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || '';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

export const DATABASE_URL = process.env.DATABASE_URL || '';

export const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-here';

export const OAUTH_PROVIDERS = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
};

export const PRICE_PER_FORMAT = 499; // €4.99 in cents

export const COOKIE_NAME = 'kdp_formatter_session';
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export const AXIOS_TIMEOUT_MS = 30000;

export const UNAUTHED_ERR_MSG = 'You must be logged in to perform this action';
export const NOT_ADMIN_ERR_MSG = 'You must be an admin to perform this action';
