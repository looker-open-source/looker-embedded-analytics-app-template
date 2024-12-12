import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const config = {
  host: process.env.REACT_APP_LOOKER_HOST || 'self-signed.looker.com:9999',
  api_url:
    process.env.REACT_APP_LOOKER_API_URL ||
    'https://self-signed.looker.com:19999',
  client_id: process.env.REACT_APP_LOOKER_CLIENT_ID,
  client_secret: process.env.REACT_APP_LOOKER_CLIENT_SECRET
}
