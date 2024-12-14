import Tile from '../Tile/Tile'
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useCallback, useState } from 'react'
import { lookerConfig } from '../../lookerConfig'

function App() {
  const [exploreStatus, setExploreStatus] = useState('Loading...')

  const setupExplore = useCallback(
    (div) => {
      if (!div) {
        return
      }
      LookerEmbedSDK.createExploreWithId(lookerConfig.exploreId)
        .withAllowAttr('fullscreen')
        .appendTo(div)

        .withParams({
          _theme: JSON.stringify({
            background_color: "rgba(18,18,18,1)",
            key_color: "rgba(139,108,67,1)",
            primary_button_color: "rgba(139,108,67,1)",
            font_color: "rgba(139,108,67,1)"
          })
        })

        // Listen to messages to display progress
        .on('explore:ready', () => setExploreStatus('Loaded'))
        .on('explore:run:start', () => setExploreStatus('Running'))
        .on('explore:run:complete', () => setExploreStatus('Done'))

        // Listen to session status
        .on('session:status', (event) => {
          if (event.expired) {
            setExploreStatus('Session expired')
          } else if (event.interrupted) {
            setExploreStatus('Session interrupted')
          }
        })
        // Give the embedded content a class for styling purposes
        .withClassName('looker-embed')
        .withParams({
          // TODO replace with fields present in your explore
          // fields: [
          //   'stock_prices.count',
          //   'stock_prices.stock',
          //   'stock_prices.total_volume'
          // ],
          // sorts: 'stock_prices.count asc',
          // limit: 500
        })
        .build()
        .connect()
        .catch((error) => {
          setExploreStatus('Connection error')
          console.error('Connection error', error)
        })
    },
    [setExploreStatus]
  )

  return (
    <>
      <Tile loading={exploreStatus === 'Loading...'}>
        <div className="overflow-auto pb-8">
          <div id="explore" ref={setupExplore}></div>
        </div>
      </Tile>
    </>
  )
}

export default App
