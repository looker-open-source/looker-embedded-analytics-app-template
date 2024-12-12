import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'

import {
  acquireEmbedSession,
  generateEmbedTokens,
  getLookerSession
} from './looker_sdk.js'

/**
 * Create the necessary routes for the Looker SDKs.
 *
 * @param {Express} app Express app
 * @param {EmbedUser} user Embed User object (from user.json)
 * @param {string} prefix Prefix for the routes URL
 */
export const addRoutes = (app, user, prefix) => {
  app.use(bodyParser.json())

  app.use(
    cookieSession({
      maxAge: user.session_length * 1000,
      name: 'embed_session',
      secret: 'abcd'
    })
  )

  app.use(function (req, _res, next) {
    if (req.session?.external_user_id !== user.external_user_id) {
      req.session.external_user_id = user.external_user_id
      req.session.session_reference_token = undefined
    }
    next()
  })

  app.get(prefix + '/login', async function (req, res) {
    const session = await getLookerSession()
    const token = await session.getToken()
    res.status(200).send(token)
  })

  app.get(prefix + '/acquire-embed-session', async function (req, res) {
    try {
      const current_session_reference_token =
        req.session && req.session.session_reference_token

      const response = await acquireEmbedSession(
        req.headers['user-agent'],
        user,
        current_session_reference_token
      )
      const {
        authentication_token,
        authentication_token_ttl,
        navigation_token,
        navigation_token_ttl,
        session_reference_token,
        session_reference_token_ttl,
        api_token,
        api_token_ttl
      } = response
      req.session.session_reference_token = session_reference_token

      res.json({
        api_token,
        api_token_ttl,
        authentication_token,
        authentication_token_ttl,
        navigation_token,
        navigation_token_ttl,
        session_reference_token_ttl
      })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })

  app.put(prefix + '/generate-embed-tokens', async function (req, res) {
    try {
      const session_reference_token = req.session.session_reference_token
      const { api_token, navigation_token } = req.body
      const tokens = await generateEmbedTokens(
        req.headers['user-agent'],
        session_reference_token,
        api_token,
        navigation_token
      )
      res.json(tokens)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })
}
