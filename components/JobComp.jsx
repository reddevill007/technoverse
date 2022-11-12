import React from 'react'
import { jobsData } from '../assets/jobs'

const JobComp = () => {
    return (
        <div className="sm:ml-[73px] xl:ml-[370px] text-white">
            <h1>Jobs For You</h1>
            <div className="flex flex-col w-full gap-8 justify-center items-center">
                {jobsData.map((job) => (
                    <div className="border rounded-xl bg-gradient-to-r from-black via-gray-900 to-black w-[80%] p-5" key={job.id}>
                        <h2 className='text-secondary-100 text-xl font-bold mx-2 my-3'>{job.position}</h2>
                        <h3 className='text-gray-600 text-xl font-bold mb-3'>{job.company}</h3>
                        <div className="flex w-full justify-between text-secondary-900 mx-2 font-bold">
                            <p>{job.postedAt}</p>
                            <p>{job.location}</p>
                        </div>
                        <div className="flex w-full justify-between text-secondary-900 mx-2 font-bold">
                            <p>{job.role}</p>
                            <p>{job.contract}</p>
                        </div>
                        <p>Languages/Tools</p>
                        <div className="flex gap-2">
                            {job.tools && job.tools.map((tool) => (
                                <p>{tool} </p>
                            ))}
                            {job.languages && job.languages.map((tool) => (
                                <p>{tool} </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobComp