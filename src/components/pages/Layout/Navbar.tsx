
import { Bell, CircleCheck, Plus, SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'
import { users } from './../../../Data/dummy';
import type { User } from '../../../Types/types';

const Navbar = () => {
    const store = localStorage.getItem('taskflow_user')
const user: User = JSON.parse(store!)
  return (
    <div className='p-2 bg-slate-300 h-16 shadow-2xl'>
        <div className='flex items-center justify-between  '>
            <div>
                <h1 className='text-2xl font-bold'>TaskFolw Web</h1>
            </div>
            <div className='flex items-center space-x-4'>
                <button className='flex'>
                    <span ><CircleCheck /></span>
                    <p >Changes saved</p>
                </button>
                <button title='button' className='border rounded-full border-red-400 p-1 '><Bell size={16} className='text-red-400'/></button>
                <div>
                    <button className='relative flex items-center justify-center border rounded-lg border-slate-200 p-2 bg-purple-600 '>
                        <span><Plus size={14} className='text-white'/></span>
                        <p className='text-white'>Invite</p>
                    </button>

                </div>
                <div >
                    <button className='relative flex items-center justify-center border rounded-lg border-slate-200 p-2 bg-purple-600'>
                        <span><SquareArrowOutUpRight size={14} className='text-white'/></span>
                        <p className=' text-white'>Share</p>
                    </button>

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