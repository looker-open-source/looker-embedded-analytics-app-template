import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useCallback, useState} from 'react'
import { lookerConfig } from '../../lookerConfig'
import React from 'react'
import Loading from '../Loading/Loading';

const EmbedDashboard = () => {

  const [dashboardStatus, setDashboardStatus] = useState('Loading...')

  const setupDashboard = useCallback((div) => {
    if (!div) {
      return
    }
    LookerEmbedSDK.createDashboardWithId(lookerConfig.dashboardId)
      .withAllowAttr('fullscreen')
      .appendTo(div)

      .on('dashboard:loaded', () => setDashboardStatus('Loaded'))
        .on('dashboard:run:start', () => setDashboardStatus('Running'))
        .on('dashboard:run:complete', () => setDashboardStatus('Done'))
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))

      // Give the embedded content a class for styling purposes
      .withClassName('looker-embed')
      .withTheme('LookerEmbed')
      .build()
      .connect()
      .catch((error) => {
        console.error('Connection error', error)
      })
  }, [])
  return (
    <>
       {dashboardStatus === 'Loading...' && <Loading />}
      <div id="dashboard" ref={setupDashboard}></div>
    </>
  )
}

export default EmbedDashboard
