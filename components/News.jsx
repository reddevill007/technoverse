import { useEffect, useState } from 'react'
import { useGlobalContext } from '../assets/context'

const News = ({ data }) => {
    const { nbPages, hits, isLoading, removePost } = useGlobalContext();

    return (
        <div className="sm:ml-[73px] xl:ml-[370px] text-white w-full border-l border-gray-700">
            <div className="flex flex-col p-5 justify-center items-center">
                {isLoading ? <h1>loading...</h1> : null}
                {hits.map((curPost) => {
                    const { title, author, objectID, url, num_comments } = curPost;
                    return (
                        <div key={objectID} className="mb-2 border bg-opacity-40 border-gray-700 w-[80%] p-5 bg-gradient-to-r from-black via-gray-900 to-black rounded-md">
                            <h2>{title}</h2>
                            <p>By <span>{author}</span> | <span>{num_comments}</span></p>
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