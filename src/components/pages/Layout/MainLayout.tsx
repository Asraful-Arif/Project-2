import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {  type ReactNode } from 'react'

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex h-screen w-screen overflow-hidden '>
      <Sidebar/>
      <div className='flex flex-col flex-1 h-full overflow-hidden '>
        <Navbar/>
        <main className='flex-1 overflow-y-auto p-3'>
          {children}
        </main>
      </div>

    </div>
  )
}

export default MainLayout