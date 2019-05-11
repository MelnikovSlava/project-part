export const requestsConfig = {
  // use fake data from './api/mock'
  USE_MOCK: false,
  // collapsed log group (summary view)
  COLLAPSED_LOG_REQUESTS: true,
  // set url, look for this const in .env file
  API_URL:
    process.env.NODE_ENV === 'development'
      ? `${process.env.API_URL_DEV}/api`
      : `${window.location.origin}/api`,
  BASE_URL: process.env.NODE_ENV === 'development'
    ? `${process.env.API_URL_DEV}`
    : `${window.location.origin}`
};
