import React from 'react'
import Tile from '../Tile/Tile'
import EventsLineGraph from './EventsLineGraph'
import QueriesPieChart from './QueriesPieChart'

const NativeDashboard = () => {
  return (
    <>
      <div className="flex flex gap-4 items-start overflow-auto">
        <Tile title="Events">
          <div className='h-96 w-full'>
          <EventsLineGraph />
          </div>
        </Tile>
        <Tile title="Queries">
          <div className='h-96 w-full'>
            <QueriesPieChart />
          </div>
        </Tile>
      </div>
    </>
  )
}

export default NativeDashboard
