import { useState, useRef } from 'react'
import { db, storage } from "../firebase";

import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

import { AiOutlineClose } from "react-icons/ai"
import { BiPhotoAlbum } from "react-icons/bi"
import { BsEmojiSmile, BsFillBarChartFill, BsFillCalendarDateFill } from "react-icons/bs"

import Picker from '@emoji-mart/react'
import { useSession } from 'next-auth/react';


const Input = () => {
    const { data: session } = useSession();

    const [input, setInput] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false)

    const filePickerRef = useRef(null);


    const addImageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFiles(readerEvent.target.result);
        }
    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            tag: session.user.tag,
            userImg: session.user.image,
            text: input,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFiles) {
            await uploadString(imageRef, selectedFiles, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                })
            })
        }

        setLoading(false);
        setInput("");
        setSelectedFiles(null);
        setShowEmojis(false);
    }


    return (

        <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll no-scrollbar ${loading && "opacity-60"}`}>
            <img src={session.user.image} alt="profile" className="h-11 w-11 rounded-full cursor-pointer object-cover" />
            <div className='w-full divide-y divide-gray-700'>
                <div className={`${selectedFiles && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        rows="2"
                        className='bg-transparent outline-none w-full min-h-[50px] text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide no-scrollbar'
                        placeholder="What's happening?"
                    />

                    {selectedFiles && (
                        <div className="relative">
                            <div className="absolute w-8 h-8 bg-[#13181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFiles(null)}>
                                <AiOutlineClose className="text-white h-5" />
                            </div>
                            <img src={selectedFiles} alt="img" className='rounded-2xl max-h-80 object-contain' />
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="flex items-center justify-between pt-2.5 ">
                        <div className="flex items-center">
                            <div className='icon' onClick={() => filePickerRef.current.click()}>
                                <BiPhotoAlbum className="text-[#1d9bf0]" size={22} />
                                <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
                            </div>


                            <div className="icon rotate-90">
                                <BsFillBarChartFill className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                                <BsEmojiSmile className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            <div className="icon">
                                <BsFillCalendarDateFill className="text-[#1d9bf0] h-[22px]" />
                            </div>

                            {showEmojis && (
                                <div className="absolute top-[180px]">
                                    <Picker
                                        onSelect={addEmoji}
                                        theme="dark"
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-md px-4 py-1.5 font-bold border border-gray-700 hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input.trim() && !selectedFiles}
                            onClick={sendPost}
                        >
                            Share
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Input