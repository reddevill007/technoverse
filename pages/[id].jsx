import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import Head from "next/head"
import Post from "../components/Post";
import { BiArrowBack } from "react-icons/bi";
import Comment from "../components/Comment";

const PostPage = ({ providers }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);

    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);

    const router = useRouter()
    const { id } = router.query;

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", id), (snapsshot) => {
                setPost(snapsshot.data())
            }),
        [db]
    )

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );


    return (
        <div>
            <Head>
                <title>{post?.username} on Technoverse: "{post?.text}"</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex max-w-full mx-auto">
                <Sidebar />
                <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div
                            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                            onClick={() => router.push("/")}
                        >
                            <BiArrowBack />
                        </div>
                        {post?.username}'s Post
                    </div>
                    <Post id={id} post={post} postPage />
                    {comments.length > 0 && (
                        <div className="pb-72">
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    comment={comment.data()}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {isOpen ? <Modal /> : null}
            </main>
        </div>
    )
}

export default PostPage

export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);

    return {
        props: {
            providers,
            session,
        },
    };
}