
import { tasks } from '../../Data/dummy'
import ReactApexChart from 'react-apexcharts'

const DonutChart = () => {
    const series = [
        tasks.filter(t => t.status === 'todo').length,
        tasks.filter(t => t.status === 'inprogress').length,
        tasks.filter(t => t.status === 'completed').length,
        tasks.filter(t => t.status === 'blocked').length,
    ]
     const options = {
    labels: ['To Do', 'In Progress', 'Completed', 'Blocked'],
    colors: ['red', 'blue', 'green', 'purple'],
    legend: { position: 'bottom' as const },
  }

  return (
    <div className='border border-slate-300 bg-white rounded-xl p-2'>
            <h3>Task Par Project</h3>
            <ReactApexChart type='donut' series={series} options={options} height={280}/>
    
        </div>
  )
}

export default DonutChart