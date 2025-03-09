import { NavLink } from "react-router-dom"
import { SideNavData } from "./SideNavData"

function SideNav() {
  return (
    <div className="flex flex-col justify-start  h-[100vh] w-[200px] fixed top-[60px] left-2 shadow-md">
        {SideNavData.map((item, index)=>
        
        <ul className="text-[24px] py-[10px]">
            <NavLink to={item.path} key={index}  className={({ isActive }) =>
              `block w-full hover:bg-black hover:text-white px-[10px] py-[5px] rounded-[5px] ${
                isActive ? 'bg-blue-600 text-white' : ''
              }`
            }>{item.title}</NavLink>
        </ul>
        )}
    </div>
  )
}

export default SideNav