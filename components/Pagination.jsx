import React from 'react'
import { useGlobalContext } from '../assets/context'

const Pagination = () => {
    const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext()
    return (
        <div className='flex items-center justify-between w-[90%]'>
            <p>
                {page + 1} of {nbPages}
            </p>
            <div className='flex space-x-10'>
                <button onClick={() => getPrevPage()} className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-md px-4 py-1.5 font-bold border border-gray-700">
                    Prev
                </button>
                <button onClick={() => getNextPage()} className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-md px-4 py-1.5 font-bold border border-gray-700">
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination