import React, { useEffect, useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  Colors,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { sdk } from '../../hooks/useLookerSdk'

ChartJS.register(CategoryScale, Colors, Tooltip, Legend, PointElement)

function SdkCustomView() {
  const [apiUsage, setApiUsage] = useState([])

  const apiUsageChart = useMemo(
    () => ({
      labels: apiUsage.map((e) => e['api_usage.api_query_type']),
      datasets: [
        {
          label: '# of Queries',
          data: apiUsage.map((e) => e['api_usage.total_usage']),
          cutout: '50%'
        }
      ]
    }),
    [apiUsage]
  )

  const getApiUsage = () => {
    sdk
      .run_inline_query({
        result_format: 'json',
        limit: 500,
        body: {
          model: 'system__activity',
          view: 'api_usage',
          fields: ['api_usage.total_usage', 'api_usage.api_query_type'],
          sorts: ['api_usage.total_usage desc 0']
        }
      })
      .then((resp) => {
        setApiUsage(resp.value)
      })
  }

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          labels: {
            color: 'white', // Set the legend text color to white
          }
        }
      },
      // scales: {
      //   x: {
      //     ticks: {
      //       color: 'white' // Set the x-axis labels to white
      //     }
      //   },
      //   y: {
      //     ticks: {
      //       color: 'white' // Set the y-axis labels to white
      //     }
      //   }
      // }
    }),
    []
  )

  useEffect(() => {
    getApiUsage()
  }, [])

  return (
    <>{apiUsage.length > 0 ? <Pie className=' mx-auto h-96' options={chartOptions}  data={apiUsageChart} /> : <p>No Data</p>}</>
  )
}

export default SdkCustomView
