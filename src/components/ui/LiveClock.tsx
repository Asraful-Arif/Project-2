import  { useEffect, useState } from 'react'

const LiveClock = () => {
    const [time,setTime] = useState(new Date())
    useEffect(()=>{
        const interval =  setInterval(() =>{
            setTime(new Date())
        },1000)
        return () => clearInterval(interval)
    },[])
   
       const formatted = time.toLocaleDateString('en-US',{
        weekday:'long',
        day:'numeric',
        month:'long',
        year:'numeric'
       })
       const timestr =  time.toLocaleTimeString('en-US',{
        hour:'2-digit',
        minute:'2-digit',
        second:"2-digit",
        hour12:false
       })
  return (
    <div className=' text-slate-800 rounded-xl py-4 flex flex-col items-start '>
       <p className='text-2xl font-bold tracking-widest'>{timestr}</p> 
       <p className='text-sm text-slate-800'>{formatted}</p>
        

    </div>
  )
}

export default LiveClock