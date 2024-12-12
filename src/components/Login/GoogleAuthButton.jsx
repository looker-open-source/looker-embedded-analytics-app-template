import { useCallback, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { lookerConfig } from '../../lookerConfig'

const GSI_URL = 'https://accounts.google.com/gsi/client'

const loadGoogleGsi = () =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${GSI_URL}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = GSI_URL
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const parseJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

/**
 * Component used to both display the Google Sign-in button and trigger the Google One-Tap Prompt.
 *
 * This components loads the Google Identity Services (GSI) SDK to be able to launch "Login with Google" flows.
 * When the Google flow is successful, the JWT token is used to identify the user on the front-end.
 */
const GoogleAuthButton = () => {
  const googleButton = useRef(null)
  const { login } = useAuth()

  const handleCredentialResponse = useCallback(
    (response) => {
      const parsedToken = parseJwt(response.credential)
      if (parsedToken) {
        login(parsedToken)
      }
    },
    [login]
  )

  useEffect(() => {
    loadGoogleGsi()
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: lookerConfig.gsiClientId,
          callback: handleCredentialResponse
        })

        // Trigger the OTP flow
        google.accounts.id.prompt()

        // Display the sign-in with Google button
        google.accounts.id.renderButton(googleButton.current, {
          theme: 'outline',
          size: 'large'
        })
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${GSI_URL}"]`)
      if (scriptTag) {
        document.body.removeChild(scriptTag)
      }
    }
  }, [handleCredentialResponse])

  return (
    <>
      <div ref={googleButton}></div>
    </>
  )
}

export default GoogleAuthButton
