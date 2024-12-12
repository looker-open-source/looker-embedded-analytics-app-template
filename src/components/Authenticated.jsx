import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { lookerConfig } from '../lookerConfig'

export const Authenticated = ({ children }) => {
  const { user } = useAuth()
  if (!user || (lookerConfig.gsiEnableAuth && user.mocked)) {
    return <Navigate to="/login" />
  }
  return children
}
