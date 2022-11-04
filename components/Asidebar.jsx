import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../assets/context"

const Asidebar = () => {
    const { hits } = useGlobalContext();

    return (
        <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
            <div className="sticky top-0 py-1.5 z-50 w-full xl:w-full border-b border-gray-700 bg-black">
                <BiSearch className="text-gray-500 h-5 z-50" />
                <input
                    type="text"
                    className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
                    placeholder="Search Topics"
                />
            </div>
            <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
                <h4 className="font-bold text-xl px-4">What's happening</h4>
                {hits.slice(0, 5).map((result) => {
                    const { title, author, objectID, url } = result;
                    return (
                        <div className="space-y-1.5" key={objectID}>
                            <p className="text-[#6e767d] text-xs font-medium">{title}</p>
                            <h6 className="font-bold max-w-[250px] text-sm">
                                {author}
                            </h6>
                            <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
                                <span className="tag">
                                    <a href={url}>Read More</a>
                                </span>
                            </p>
                        </div>
                    )
                })}
                <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
                    Show more
                </button>
            </div>
        </div>
    )
}

export default Asidebar