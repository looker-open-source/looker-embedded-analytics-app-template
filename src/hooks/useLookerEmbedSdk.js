import { LookerEmbedSDK } from '@looker/embed-sdk'
import { lookerConfig } from '../lookerConfig'

/**
 * Initialize the Looker Embed SDK with the values specified in config file.
 */
export const initLookerSdk = () => {
  console.log('Initializing Looker Embed SDK')
  LookerEmbedSDK.initCookieless(
    lookerConfig.host,
    '/api/acquire-embed-session',
    '/api/generate-embed-tokens'
  )
}
