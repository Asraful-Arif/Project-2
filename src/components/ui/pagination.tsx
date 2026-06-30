import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface PagiNationProPs<TData>{
    table:Table<TData>,
    dataLength:number}

const Pagination = <TData,>({table,dataLength}:PagiNationProPs<TData>) => {
    const {pageIndex,pageSize} = table.getState().pagination;
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex +1) * pageSize,dataLength)
  return (
    
    <div className='flex items-center justify-between '>
        <div className='flex gap-2'>
            {start} To {end} / {dataLength} users
        </div>
        <div className='flex gap-2'>
            <Button onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft size={18}/></Button>
            <Button onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight size={18}/></Button>
        </div>
    </div>
  )
}

export default Pagination  