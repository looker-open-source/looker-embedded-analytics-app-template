import { Looker40SDK } from '@looker/sdk'
import { DefaultSettings } from '@looker/sdk-rtl'
import { NodeSession } from '@looker/sdk-node'
import { config } from '../config.js'

let lookerSession

/**
 * Get the current Looker Session, or login to create a new one.
 *
 * The session is created using the credentials passed in the config file.
 *
 * @returns the session
 */
export const getLookerSession = async () => {
  if (!lookerSession || !lookerSession.activeToken.isActive()) {
    const { api_url, client_id, client_secret, verify_ssl } = config
    try {
      const lookerSettings = DefaultSettings()
      lookerSettings.readConfig = () => {
        return { client_id, client_secret }
      }
      lookerSettings.base_url = api_url
      lookerSettings.verify_ssl = verify_ssl
      lookerSession = new NodeSession(lookerSettings)
      await lookerSession.login()
    } catch (error) {
      console.error('Looker Login failed', { error })
      throw error
    }
  }
  return lookerSession
}

/**
 * Acquire the cookieless embed session.
 *
 * This is called when the Looker Embed SDK first loads its iframe.
 * If a session already exists, it will be reused.

 * @param {string} userAgent Browser user agent
 * @param {EmbedUser} user Embed User object (from user.json)
 * @param {string} session_reference_token Token referencing the embed session
 * @returns the response from the SDK
 */
export async function acquireEmbedSession(
  userAgent,
  user,
  session_reference_token
) {
  try {
    const request = {
      ...user,
      session_reference_token: session_reference_token
    }
    const sdk = new Looker40SDK(await getLookerSession())
    const response = await sdk.ok(
      sdk.acquire_embed_cookieless_session(request, {
        headers: { 'User-Agent': userAgent }
      })
    )
    return response
  } catch (error) {
    console.error('Looker Embed session acquire failed', { error })
    throw error
  }
}

/**
 * Generate embed navigation and api tokens for the embed session.
 *
 * This is called periodically by the Looker Embed SDK, to refresh the token used in its iframe.

 * @param {string} userAgent Browser user agent
 * @param {string} session_reference_token Token referencing the embed session
 * @param {string} api_token  Token to used to call Looker API
 * @param {string} navigation_token  Token used to load and navigate between Looker pages
 * @returns response from the SDK
 */
export async function generateEmbedTokens(
  userAgent,
  session_reference_token,
  api_token,
  navigation_token
) {
  if (!session_reference_token) {
    console.error('embed session generate tokens failed')
    return {
      session_reference_token_ttl: 0
    }
  }
  try {
    const sdk = new Looker40SDK(await getLookerSession())
    const response = await sdk.ok(
      sdk.generate_tokens_for_cookieless_session(
        {
          api_token,
          navigation_token,
          session_reference_token: session_reference_token || ''
        },
        { headers: { 'User-Agent': userAgent } }
      )
    )
    return {
      api_token: response.api_token,
      api_token_ttl: response.api_token_ttl,
      navigation_token: response.navigation_token,
      navigation_token_ttl: response.navigation_token_ttl,
      session_reference_token_ttl: response.session_reference_token_ttl
    }
  } catch (error) {
    console.error('Looker embed session generate tokens failed', { error })
    throw error
  }
}
