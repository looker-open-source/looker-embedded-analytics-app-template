import { Looker40SDK as LookerSDK } from '@looker/sdk'
import { ProxySession, ApiSettings } from '@looker/sdk-rtl'
import { lookerConfig } from '../lookerConfig'

const settings = new ApiSettings({
  base_url: lookerConfig.baseUrl,
  verify_ssl: true,
  timeout: 1000 * 60
})

/**
 * Custom Proxy session implementation, which will allow the Looker SDK to retrieve
 * an API token from our backend before sending its own requests.
 *
 * @see https://github.com/looker-open-source/sdk-codegen/blob/master/packages/sdk
 */
class EmbedSession extends ProxySession {
  isExpired() {
    return new Date(this.token.expiresAt).getTime() < Date.now()
  }

  async getProxyToken() {
    if (!this.token || this.isExpired()) {
      try {
        console.log('Retrieving Looker SDK Token...')
        const response = await (
          await fetch(lookerConfig.proxyUrl + '/login')
        ).json()
        this.token = response
      } catch (error) {
        console.log('Error getting token', error)
        this.token = undefined
      }
    }
  }

  async authenticate(props) {
    await this.getProxyToken()

    if (this.isAuthenticated()) {
      props.mode = 'cors'
      delete props['credentials']
      props.headers = {
        Authorization: `${this.token.token_type} ${this.token.access_token}`,
        'x-looker-appid': settings.agentTag
      }
    }
    return props
  }
}

/**
 * Expose the Looker SDK, initialized with settings from the config.
 */
export const sdk = new LookerSDK(new EmbedSession(settings))
