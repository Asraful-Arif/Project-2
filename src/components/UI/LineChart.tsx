import React from 'react'
import { weeklyActivity } from '../../Data/dummy'
import ReactApexChart from 'react-apexcharts'

const LineChart = () => {
     const series = [
    { name: 'Created',   data: weeklyActivity.map(w => w.tasksCreated) },
    { name: 'Completed', data: weeklyActivity.map(w => w.tasksCompleted) },
  ]
  
  const options = {
    xaxis: { categories: weeklyActivity.map(w => w.day) },
    colors: ['#6366f1', '#22c55e'],
    stroke: { curve: 'smooth' as const },
  }
  return (
     <div className='border border-slate-300 bg-white rounded-xl p-2'>
            <h3>Task Par Project</h3>
            <ReactApexChart type='bar' series={series} options={options} height={280}/>
    
        </div>
  )
}

export default LineChart