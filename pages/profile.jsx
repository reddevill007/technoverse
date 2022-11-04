import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getProviders, getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react'
import ProfileComp from '../components/ProfileComp';
import { db } from '../firebase';
import Sidebar from "../components/Sidebar"
import Login from "../components/Login"

const profile = ({ providers }) => {
    const { data: session } = useSession();
    if (!session) return <Login providers={providers} />;

    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    return (
        <div>
            <Sidebar />
            <div className='sm:ml-[73px] xl:ml-[370px]'>
                <div className="flex w-full justify-center items-center py-5">
                    <div className="w-36 h-36 rounded-full flex justify-center items-center bg-gradient-to-r from-purple-600 to-purple-700">
                        <div className="rounded-full flex justify-center items-center bg-black w-[98%] h-[98%]">
                            <img src={session.user.image} alt="userImg" className='h-[95%] w-[95%] rounded-full' />
                        </div>
                    </div>
                </div>


                <div className="flex flex-col justify-center items-center gap-y-2 mb-8">
                    <h4 className="font-bold text-3xl text-gray-400">{session.user.name}</h4>
                    <p className="text-[#6e767d]">@{session.user.tag}</p>
                </div>

                <div className='flex items-center gap-5 flex-col'>
                    {posts.map((post) => {
                        return <ProfileComp key={post.id} id={post.id} post={post.data()} />
                    })}
                </div>
            </div>
        </div >
    )
}

export default profile

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