import Link from "next/link";
import { listData } from "../assets/link"


const SidebarLink = ({ text, Icon, active }) => {
  return (
    <>
      {
        listData.map((list) => (
          <Link href={list.link} key={list.id}>
            <div className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
              {list.Icon}
              <span className="hidden xl:inline">{list.text}</span>
            </div>
          </Link>
        ))
      }
    </>
  )
}

export default SidebarLink