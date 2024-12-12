export const lookerConfig = {
  // Embed configuration
  host: process.env.REACT_APP_LOOKER_HOST || 'example.looker.com',
  dashboardId: process.env.REACT_APP_LOOKER_DASHBOARD,
  exploreId: process.env.REACT_APP_LOOKER_EXPLORE,

  // SDK configuration
  baseUrl:
    process.env.REACT_APP_LOOKER_API_URL ||
    'https://self-signed.looker.com:19999',
  proxyUrl: process.env.REACT_APP_LOOKER_PROXY_URL,

  // GSI configuration
  gsiEnableAuth: process.env.REACT_APP_ENABLE_GSI_AUTH === 'true',
  gsiClientId:
    process.env.REACT_APP_GSI_CLIENT_ID ||
    '570180444782-v729ehqsd9gknntnqurrlaup1df2kk2s.apps.googleusercontent.com'
}
