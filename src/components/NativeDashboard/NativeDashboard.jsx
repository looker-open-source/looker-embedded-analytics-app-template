import React from 'react'
import Tile from '../Tile/Tile'
import EventsLineGraph from './EventsLineGraph'
import QueriesPieChart from './QueriesPieChart'

const NativeDashboard = () => {
  return (
    <>
      <div className="grid grid-rows-2 grid-flow-col gap-4 items-start overflow-auto w-[90%] md:grid-rows-1">
        <Tile title="Events">
          <div className='h-96 w-auto'>
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
