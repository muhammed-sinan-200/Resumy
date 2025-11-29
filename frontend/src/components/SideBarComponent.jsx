import React, { createContext, useContext, useState } from 'react'
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png'


const SidebarContext = createContext();

const SideBarComponent = ({ menu }) => {
  const [expand, setExpand] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='h-full'>
      <aside className='h-full '>
        <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
          <div className='p-4 pb-2 flex justify-between items-center '>

            <button onClick={() => setExpand((curr) => !curr)} className='p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer'>
              {expand ? <ChevronFirst /> : <ChevronLast />}
            </button>

          </div>
          <div className='flex flex-col justify-between flex-1'>
            <SidebarContext.Provider value={expand}>
              <ul className=' px-3 '>
                {menu.map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    text={item.name}
                    path={item.path}
                  // alert={item.alert}
                  />
                ))}
              </ul>
            </SidebarContext.Provider>


            <div className='border-t px-3 pt-3 pb-4 flex items-center shrink-0 relative hover:bg-green-200 cursor-pointer' 
            onClick={()=>{
              navigate('/profile')
            }}
            >
              <img
                src={
                  user?.profilePic
                    ? `http://localhost:5000/uploads/profile/${user.profilePic}`
                    : avatar
                }
                alt="P"
                className='w-10 h-10 rounded-3xl'
              />

              <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expand ? " flex-1 ml-3 " : "w-0"}`}>
                <div className='leading-4 ps-2'>
                  <h3 className='font-semibold'>
                    {user?.name || "Guest"}
                  </h3>
                  <span className='text-sm text-gray-700'>
                    {user?.email || ""}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </nav>
      </aside>
    </div>
  )
}


export const SidebarItem = ({ icon, alert, active, text, path }) => {
  const expand = useContext(SidebarContext)
  return (
    <Link
      to={path}
      className="relative flex items-center py-3 px-3 rounded-md font-medium 
                  cursor-pointer hover:bg-green-50 group transition-colors"
    >
      {icon}

      <span className={`overflow-hidden transition-all ${expand ? "ml-5 w-40" : "w-0"}`}>
        {text}
      </span>

      {alert && (
        <span className="absolute right-2 w-2 h-2 rounded-full bg-green-400" />
      )}

      {!expand && (
        <span
          className="absolute left-full ml-3 px-2 py-1 text-sm rounded-md
                      bg-green-100 text-green-800 opacity-0 invisible 
                      group-hover:visible group-hover:opacity-100 
                      transition-all -translate-x-2 group-hover:translate-x-0"
        >
          {text}
        </span>
      )}
    </Link>
  );
};

export default SideBarComponent