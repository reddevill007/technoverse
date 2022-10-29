import { MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillChatRightTextFill, BsTrash, BsBarChartFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import bd from "../assets/images/border.png"

import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "@firebase/firestore";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { modalState, postIdState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil";
import { db } from "../firebase";

const Post = ({ id, post, postPage }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const router = useRouter();

    useEffect(() =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
        ),
        [db, id]
    );

    useEffect(
        () =>
            setLiked(
                likes.findIndex((like) => like.id === session?.user?.uid) !== -1
            ),
        [likes]
    );

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.image,
            })
        }
    }

    return (
        <div className='p-3 flex cursor-pointer border-b border-gray-700' onClick={() => router.push(`/${id}`)}>
            {!postPage && (
                <img src={post?.userImg} alt="userImg" className='h-11 w-11 rounded-full mr-2' />
            )}
            <div className="flex flex-col space-y-4 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage && (
                        <img src={post?.userImg} alt="userImg" className='h-11 w-11 rounded-full mr-4' />
                        // <div className="relative h-14 w-14 mr-5">
                        //     <img src={bd.src} alt="" className="absolute top-0 left-0 w-full h-full" />
                        //     <img src={post?.userImg} alt="" className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[70%] w-[70%] rounded-full" />
                        // </div>
                    )}

                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
                            <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
                        </div>
                        .{" "}
                        <span className='hover:underline text-sm sm:text-[15px]'>
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {!postPage && (
                            <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>{post?.text}</p>
                        )}
                    </div>

                    <div className="icon group flex-shrink-0 ml-auto">
                        <MdOutlineMoreHoriz className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
                {postPage && (
                    <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>{post?.text}</p>
                )}
                {post?.image && (<img src={post?.image} className="rounded-2xl max-h-[720px] object-cover mr-2 border border-blue-700" alt="post image" />)}

                <div className={`text-[#6e767d] flex justify-between w-10/ ${postPage && "mx-auto"}`}>
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPostId(id);
                            setIsOpen(true);
                        }}
                    >
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <BsFillChatRightTextFill className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                        {comments.length > 0 && (
                            <span className="group-hover:text-[#1d9bf0] text-sm">
                                {comments.length}
                            </span>
                        )}
                    </div>

                    {session.user.uid === post?.id ? (
                        <div
                            className="flex items-center space-x-1 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteDoc(doc(db, "posts", id));
                                router.push("/");
                            }}
                        >
                            <div className="icon group-hover:bg-red-600/10">
                                <BsTrash className="h-5 group-hover:text-red-600" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 group">
                            <div className="icon group-hover:bg-green-500/10">
                                <BsBarChartFill className="h-5 group-hover:text-green-500" />
                            </div>
                        </div>
                    )}

                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}
                    >
                        <div className="icon group-hover:bg-pink-600/10">
                            {liked ? (
                                <AiFillHeart className="h-5 text-pink-600" />
                            ) : (
                                <AiOutlineHeart className="h-5 group-hover:text-pink-600" />
                            )}
                        </div>
                        {likes.length > 0 && (
                            <span
                                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                    }`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>

                    <div className="icon group">
                        <AiOutlineShareAlt className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <BsBarChartFill className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post