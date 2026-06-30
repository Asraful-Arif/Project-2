
import { Bell, CircleCheck, Plus, SquareArrowOutUpRight } from 'lucide-react'

import type { User } from '../../../Types/types';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
    const store = localStorage.getItem('taskflow_user')
const user: User = JSON.parse(store!)
  return (
    <div className='p-2 bg-[#2c3e6b] h-16 shadow-2xl text-white'>
        <div className='flex items-center justify-between  '>
            <div className='flex items-center gap-3'>
                <SidebarTrigger />
                <h1 className='text-lg md:text-2xl font-bold'>TaskFolw Web</h1>
            </div>
            <div className='flex items-center space-x-4'>
                
                <button title='button' className='border rounded-full border-red-400 p-1 '><Bell size={16} className='text-red-400'/></button>
                
                <div >
                    

                </div>
                <div className='flex items-center'>
                    <img src={user.avatar} alt={user.avatar}
                    className='w-10 h-10 rounded-full object-cover'
                    />


                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar