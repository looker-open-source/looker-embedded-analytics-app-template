import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useCallback, useEffect, useState } from 'react'
import { lookerConfig } from '../../lookerConfig'
import React from 'react'
import Loading from '../Loading/Loading'

const EmbedDashboard = () => {
  const filterName = 'Stock'
  const filterOptions = ['NVDA', 'TSLA', 'GOOG', 'AAPL']
  const initialFilter = filterOptions[0]
  const [dashboardStatus, setDashboardStatus] = useState('Loading...')
  const [dashboard, setDashboard] = useState(undefined)
  const [selectedFilter, setSelectedFilter] = useState(initialFilter)

  const onDashboardSetup = (d) => {
    setDashboard(d)
  }

  const handleScheduleModalOpen = useCallback(() => {
    if(dashboard) {
      dashboard.openScheduleDialog()
    }
  },[dashboard])

  useEffect(() => {
    if (dashboard) {
      dashboard.updateFilters({ [filterName]: selectedFilter })
      dashboard.run()
    }
  }, [dashboard, selectedFilter])

  const setupDashboard = useCallback(
    (div) => {
      if (!div) {
        return
      }
      LookerEmbedSDK.createDashboardWithId(lookerConfig.dashboardId)
        .withAllowAttr('fullscreen')
        .appendTo(div)

        // Apply custom theme to advanced report
        .withParams({
          _theme: JSON.stringify({
            background_color: "rgba(18,18,18,1)",
            key_color: "rgba(139,108,67,1)",
            primary_button_color: "rgba(139,108,67,1)",
            font_color: "rgba(139,108,67,1)"
          })
        })

        // Listen to messages to display progress
        .on('dashboard:loaded', () => setDashboardStatus('Loaded'))
        .on('dashboard:run:start', () => setDashboardStatus('Running'))
        .on('dashboard:run:complete', () => setDashboardStatus('Done'))
        .on('dashboard:edit:start', () => setDashboardStatus('Editing'))
        .on('dashboard:filters:changed', (e) =>
          setSelectedFilter(e.dashboard.dashboard_filters[filterName])
        )
        .on('dashboard:edit:cancel', () =>
          setDashboardStatus('Editing cancelled')
        )
        .on('dashboard:save:complete', () => setDashboardStatus('Saved'))
        .on('dashboard:delete:complete', () => setDashboardStatus('Deleted'))

        // Listen to session status
        .on('session:status', (event) => {
          if (event.expired) {
            setDashboardStatus('Session expired')
          } else if (event.interrupted) {
            setDashboardStatus('Session interrupted')
          }
        })
        // Give the embedded content a class for styling purposes
        .withClassName('looker-embed')
        .withFilters({ [filterName]: initialFilter })
        .build()
        .connect()
        .then(onDashboardSetup)
        .catch((error) => {
          setDashboardStatus('Connection error')
          console.error('Connection error', error)
        })
    },
    [setDashboardStatus, initialFilter]
  )
  return (
    <>
      <div className="flex min-h-0 flex-col h-full overflow-hidden ">
        <div className="flex space-evenly w-full items-center">
          <label className="rounded-xl px-4 mb-4 border-orange-300 border-2 mr-2">
            <span className="text-orange-300">Dashboard filter:</span>
            <select
              className=" bg-transparent rounded px-2 outline-none"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filterOptions.map((o) => (
                <option value={o}>{o}</option>
              ))}
            </select>
          </label>
          <label onClick={handleScheduleModalOpen} className="cursor-pointer hover:bg-[rgba(139,108,67,0.2)] rounded-xl px-4 mb-4 border-orange-300 border-2">
            <span className="text-orange-300">Add Schedule</span>
          </label>
        </div>
        {dashboardStatus === 'Loading...' && <Loading />}
        <div
          className={`h-full overflow-hidden ${dashboardStatus === 'Loading...' ? 'hidden' : ''}`}
        >
          <div
            className="h-[85vh] overflow-auto"
            id="dashboard"
            ref={setupDashboard}
          ></div>
        </div>
      </div>
    </>
  )
}

export default EmbedDashboard
