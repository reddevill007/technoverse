import { useEffect, useState } from 'react'
import { GiNewShoot } from 'react-icons/gi';
import { BsFillChatRightTextFill } from "react-icons/bs";

import { useGlobalContext } from '../assets/context'
import Pagination from './Pagination';
import Search from './Search';

const News = ({ data }) => {
    const { nbPages, hits, isLoading, removePost } = useGlobalContext();

    return (
        <div className="sm:ml-[73px] xl:ml-[370px] text-white w-full border-l border-gray-700">
            <div className="text-[#d9d9d9] bg-gradient-to-r from-black via-gray-900 to-black items-center flex sm:justify-between py-2 px-3 sticky top-0 z-50 border-b border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold">Whats Happening in Tech World</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                    <GiNewShoot className="h-5 text-green-400" size={20} />
                </div>
            </div>
            <div className="flex flex-col p-5 justify-center items-center space-y-4">
                <Search />
                <Pagination />
                {isLoading ? <h1>loading...</h1> : null}
                {hits.map((curPost) => {
                    const { title, author, objectID, url, num_comments } = curPost;
                    return (
                        <div key={objectID} className="border bg-opacity-40 border-gray-700 w-[80%] p-5 bg-gradient-to-r from-black via-gray-900 to-black rounded-md">
                            <h2 className='text-xl mb-2 font-bold dark:text-white'>{title}</h2>
                            <p className='mb-3 text-md font-light text-gray-500 flex items-center gap-2'>By - <span>{author}</span> | <span className='flex items-center gap-2'><BsFillChatRightTextFill /> {num_comments}</span></p>
                            <div className='flex justify-between items-center mt-2'>
                                <a href={url} className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-md px-4 py-1.5 font-bold border border-gray-700">
                                    Read More
                                </a>
                                <button onClick={() => removePost(objectID)} className='bg-red-500 hover:bg-opacity-25 rounded-md px-4 py-1.5 font-bold border border-gray-700'>Not Interested</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default News