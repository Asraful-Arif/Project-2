import type { LucideIcon } from 'lucide-react'

interface DashProps{
    label:string,
    value:string | number,
    trend: string
  icon: LucideIcon,
  bg: string,
  iconColor: string
}

const State = ({label,value,trend,icon:Icon,bg,iconColor}:DashProps) => {
  return (
    <div className='border border-slate-200 rounded shadow-xl m-2'>
        <div className='flex flex-col  space-y-2'>
            <div className='flex items-start justify-between gap-4 p-2 '>
                <div>
                  <p className='text-xl text-slate-800  font-semibold'>{label}</p>
                </div>
                <div className={`p-3 rounded-lg ${bg} ${iconColor} `}>
                  <span ><Icon size={18} /></span>

                </div>
            </div>
            <div className='flex flex-col space-y-2 p-2'>
                <p className='text-2xl'>{value}</p>
                <p>{trend}</p>
            </div>

        </div>
    </div>
  )
}

export default State