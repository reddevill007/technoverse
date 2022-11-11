import Link from "next/link";
import { useGlobalContext } from "../assets/context"
import Search from "./Search";

const Asidebar = () => {
    const { hits } = useGlobalContext();

    return (
        <div className="hidden md:hidden lg:inline fixed top-0 right-20 no-scrollbar overflow-y-scroll max-h-screen ml-8 xl:w-[350px] py-1 space-y-5">
            <Search />
            <div className="text-[#d9d9d9] mx-auto space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
                <h4 className="font-bold text-xl px-4">What's happening</h4>
                {hits.slice(0, 5).map((result) => {
                    const { title, author, objectID, url } = result;
                    return (
                        <div className="flex flex-col gap-y-2 border-b border-gray-400 p-3 w-[180px]" key={objectID}>
                            <h2 className="text-xl mb-2 font-bold dark:text-white">{title}</h2>
                            <p className="mb-3 text-md font-light text-gray-500 flex items-center gap-2">
                                By - {author}
                            </p>
                            <a href={url} className="bg-blue-500 text-center text-white rounded-md px-4 py-1.5 font-bold border border-gray-700">
                                Read More
                            </a>
                        </div>
                    )
                })}
                <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
                    <Link href="/news">
                        Show more
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Asidebar