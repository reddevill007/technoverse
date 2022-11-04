import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillChatRightTextFill } from 'react-icons/bs';
import Moment from 'react-moment';
import { db } from '../firebase';

const ProfileComp = ({ id, post, postPage }) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const router = useRouter();

    useEffect(() =>
        onSnapshot(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc"), (snapshot) =>
            setComments(snapshot.docs)
        ),
        [db, id]
    );

    useEffect(() =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
        ),
        [db, id]
    );

    return (
        <div className='text-gray-400 w-[90%] cursor-pointer' onClick={() => router.push(`/${id}`)}>
            {session.user.uid === post?.id ? <div>
                <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>{post?.text}</p>
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                {post?.image && (<img src={post?.image} className="rounded-2xl my-3 w-[95%] object-cover mr-2 border border-blue-700" alt="post image" />)}
                <div className="flex">
                    <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                        <BsFillChatRightTextFill className="h-5 mr-3 group-hover:text-[#1d9bf0]" />
                        {comments.length > 0 && (
                            <span className="group-hover:text-[#1d9bf0] text-sm">
                                {comments.length}
                            </span>
                        )}
                    </div>

                    <div className="flex">
                        <div className="icon group-hover:bg-pink-600/10">
                            <AiOutlineHeart className="h-5 group-hover:text-pink-600" />
                        </div>
                        {likes.length > 0 && (
                            <span
                                className="group-hover:text-pink-600 text-sm"
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>
                </div>




            </div> : null}
        </div>
    )
}

export default ProfileComp