import React from 'react'
import { useGlobalContext } from '../assets/context'
import { BiSearchAlt2 } from "react-icons/bi"

const Search = () => {
    const { query, searchPost } = useGlobalContext();
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className='w-[90%]'>
                <div className="relative">
                    <input
                        type="text"
                        placeholder='Try searching tech keywords'
                        value={query}
                        onChange={(e) => searchPost(e.target.value)}
                        className="bg-white text-black h-10 w-full pr-12 pl-4 rounded-lg focus:outline-none"
                    />
                    <span className="absolute text-black top-[50%] translate-y-[-50%] right-5 border-l border-gray-500 pl-4" >
                        <BiSearchAlt2 />
                    </span>
                </div>
            </form>


        </>
    )
}

export default Search