import React, { useEffect, useMemo, useState } from 'react'
import {
  ArcElement,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { sdk } from '../../hooks/useLookerSdk'
import Loading from '../Loading/Loading'

ChartJS.register(ArcElement, LinearScale, Tooltip, Legend, LineElement)

function SdkCustomView() {
  const [events, setEvents] = useState([])

  const eventsChart = useMemo(
    () => ({
      labels: events.map((e) =>
        new Date(e['event.created_date']).toLocaleDateString('en-us', {
          month: 'short',
          day: 'numeric'
        })
      ),
      datasets: [
        {
          label: '# of events',
          data: events.map((e) => e['event.count']),
          cutout: '50%'
        }
      ]
    }),
    [events]
  )

    const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          labels: {
            color: 'white', // Set the legend text color to white
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white' // Set the x-axis labels to white
          }
        },
        y: {
          ticks: {
            color: 'white' // Set the y-axis labels to white
          }
        }
      }
    }),
    []
  )

  const getEvents = () => {
    sdk
      .run_inline_query({
        result_format: 'json',
        limit: 500,
        body: {
          model: 'system__activity',
          view: 'event',
          fill_fields: ['event.created_date'],
          fields: ['event.created_date', 'event.count'],
          sorts: ['event.created_date asc']
        }
      })
      .then((resp) => {
        setEvents(resp.value)
      })
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="content-center h-full w-full">
      {events.length > 0 ? (
        <Line data={eventsChart} options={chartOptions} />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default SdkCustomView
