import { BsHash } from "react-icons/bs";
import { AiFillHome, AiFillBell } from "react-icons/ai";
import { MdOutlineForwardToInbox, MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillBookmarkFill, BsClipboardCheck } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";

export const listData = [
  {
    id: 1,
    text: "Home",
    Icon: <AiFillHome className="h-10 text-white" />,
    link: "/",
  },
  {
    id: 2,
    text: "News",
    Icon: <BsHash className="h-10 text-white" />,
    link: "/news",
  },
  {
    id: 3,
    text: "Jobs",
    Icon: <AiFillBell className="h-10 text-white" />,
    link: "/jobs",
  },
  // {
  //   id: 4,
  //   text: "Message",
  //   Icon: <MdOutlineForwardToInbox className="h-10 text-white" />,
  //   link: "/",
  // },
  // {
  //   id: 5,
  //   text: "Bookmarks",
  //   Icon: <BsFillBookmarkFill className="h-10 text-white" />,
  //   link: "/",
  // },
  // {
  //   id: 6,
  //   text: "Lists",
  //   Icon: <BsClipboardCheck className="h-10 text-white" />,
  //   link: "/",
  // },
  {
    id: 7,
    text: "Profile",
    Icon: <FaUserAlt className="h-10 text-white" />,
    link: "/profile",
  },

  {
    id: 8,
    text: "More",
    Icon: <CgMoreO className="h-10 text-white" />,
    link: "/",
  },
];
