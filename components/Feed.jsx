import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react"
import { HiSparkles } from "react-icons/hi"
import Input from "./Input"
import Post from "./Post"
import { db } from "../firebase";
import { useSession } from "next-auth/react";

const Feed = () => {
  const { data: session } = useSession();
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
  console.log(posts)

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700  max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
      <div className="text-[#d9d9d9] bg-gradient-to-r from-black via-gray-900 to-black items-center flex sm:justify-between py-2 px-3 sticky top-0 z-50 border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
          <HiSparkles className="h-5 text-white" size={20} />
        </div>
      </div>

      <Input />

      <div className="pb-72">
        {posts.map((post) => {
          return <Post key={post.id} id={post.id} post={post.data()} />
        })}
      </div>
    </div>
  )
}

export default Feed