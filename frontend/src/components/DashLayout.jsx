import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarComponent from './SideBarComponent'
import { BadgeQuestionMark, FileUp, LayoutDashboard, Settings, User } from 'lucide-react'
import Topbar from './Topbar'

const DashLayout = () => {

      const menuItems = [
        { name: "Overview", icon: <LayoutDashboard size={30} />, path: '/overview' },
        { name: "Upload resume", icon: <FileUp size={30} />, path: '/upload' },
        { name: "Profile/Account", icon: <User size={30} />, path: '/profile' },
        { name: "Help & Support", icon: <BadgeQuestionMark size={30} />, path: '/help' },
        { name: "Settings", icon: <Settings size={30} />, path: '/settings' }

    ]
    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Topbar/>
            <div className='flex-1 flex overflow-hidden'>
                <SideBarComponent menu={menuItems}/>
                <main className='flex-1 overflow-y-auto p-5'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashLayout