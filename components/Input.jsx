import { useState } from 'react'

const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(null)

    return (
        <div className={`border-b border-gray-700 flex space-x-3 p-3 overflow-y-scroll`}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCT6ifq3Wo5EACfxc3xIeVVdogS_OJsjHOdw&usqp=CAU" alt="profile" className="h-11 w-11 rounded-full cursor-pointer" />
            <div className='w-full divide-y divide-gray-700'>
                <div className={``}>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        rows="2"
                        className='bg-transparent outline-none w-full min-h-[50px] text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide'
                        placeholder="What's happening?"
                    />

                    <div className="relative">
                        <div className="absolute">

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Input