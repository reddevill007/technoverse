import Image from "next/image";
import Link from "next/link";
import SidebarLink from "./SidebarLink";

import { MdOutlineMoreHoriz } from "react-icons/md";


import { signOut, useSession } from "next-auth/react";


const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="bg-gradient-to-r from-black via-gray-900 to-black bottom-0 left-0 flex flex-row h-20 w-full md:w-14 md:top-0 sm:flex md:flex-col items-center xl:items-start xl:w-[340px] p-2 fixed md:h-full text-[#d9d9d9]">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image src="https://raw.githubusercontent.com/reddevill007/technoverse/master/public/logo.png" width={30} height={30} />
            </div>

            <div className="gap-y-2.5 flex md:flex-col mt-4 mb-2.5 xl:ml-24">
                <SidebarLink />
            </div>


            <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto" onClick={signOut}>
                <img
                    src={session.user.image}
                    alt=""
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session.user.name}</h4>
                    <p className="text-[#6e767d]">@{session.user.tag}</p>
                </div>
                <MdOutlineMoreHoriz className="h-5 hidden xl:inline ml-10" />
            </div>
        </div>
    )
}

export default Sidebar