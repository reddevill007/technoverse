import Image from "next/image";
import  SidebarLink from "./SidebarLink";
import {BsHash} from "react-icons/bs"
import {AiFillHome, AiFillBell} from "react-icons/ai"
import {MdOutlineForwardToInbox, MdOutlineMoreHoriz} from "react-icons/md"
import {BsFillBookmarkFill, BsClipboardCheck} from "react-icons/bs"
import {FaUserAlt} from "react-icons/fa"
import {CgMoreO} from "react-icons/cg";

const Sidebar = () => {
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full text-[#d9d9d9]">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image src="https://rb.gy/ogau5a" width={30} height={30} />
            </div>

            <div className="gap-y-2.5 mt-4 mb-2.5 xl:ml-24">
                <SidebarLink text="Home" Icon={AiFillHome} active />
                <SidebarLink text="Explore" Icon={BsHash} />
                <SidebarLink text="Notification" Icon={AiFillBell} />
                <SidebarLink text="Message" Icon={MdOutlineForwardToInbox} />
                <SidebarLink text="Bookmarks" Icon={BsFillBookmarkFill} />
                <SidebarLink text="Lists" Icon={BsClipboardCheck} />
                <SidebarLink text="Profile" Icon={FaUserAlt} />
                <SidebarLink text="More" Icon={CgMoreO} />
            </div>

            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] rounded-full w-56 h-[52px] shadow-md hover:bg-[#1a8cda]">Tweet</button>

            <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCT6ifq3Wo5EACfxc3xIeVVdogS_OJsjHOdw&usqp=CAU" alt="profile" className="h-10 w-10 rounded-full xl:mr-2.5" />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">Code Inertia</h4>
                    <p className="text-[#6e767d]">@firebase</p>
                </div>
                <MdOutlineMoreHoriz className="h-5 hidden xl:inline ml-10" />
            </div>
        </div>
    )
}

export default Sidebar