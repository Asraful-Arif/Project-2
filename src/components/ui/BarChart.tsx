
import { projects, tasks } from '../../Data/dummy'
import ReactApexChart from 'react-apexcharts'

const BarChart = () => {
    const series = [
        {name:'Tasks',
        data:projects.map(p => tasks.filter(t => t.projectId === p.id).length)}
    ]
    const option = {
        xaxis:{categories:projects.map(p => p.name)},
        colors:['#6366f1'],
        plotOptions:{bar:{borderRadius : 4}}
    }
  return (
    <div className='border border-slate-300 bg-white rounded-xl p-2'>
        <h3>Task Par Project</h3>
        <ReactApexChart type='bar' series={series} options={option} height={280}/>

    </div>
  )
}

export default BarChart