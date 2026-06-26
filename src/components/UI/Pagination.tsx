import { ChevronLeft, ChevronRight } from 'lucide-react';


const Pagination = ({table,dataLength}) => {
    const {pageIndex,pageSize} = table.getState().pagination;
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex +1) * pageSize,dataLength)
  return (
    
    <div className='flex items-center justify-between '>
        <div className='flex gap-2'>
            {start} To {end} / {dataLength} users
        </div>
        <div className='flex gap-2'>
            <button onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft size={18}/></button>
            <button onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight size={18}/></button>
        </div>
    </div>
  )
}

export default Pagination  