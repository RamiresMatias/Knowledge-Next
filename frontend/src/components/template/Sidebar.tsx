import {HomeIcon, SettingsIcon, BellIcon, LogoutIcon} from '../icons/index'
import SidebarItems from './SidebarItems'
import Logo from './Logo'
import useAuth from '../../data/hook/useAuth'

export default function Sidebar(){
    const {logout} = useAuth()
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900 
            dark:text-gray-200
            `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow`}>
                <SidebarItems url='/' text='Início' icon={HomeIcon}></SidebarItems>
                <SidebarItems url='/settings' text='Ajustes' icon={SettingsIcon}></SidebarItems>
                <SidebarItems url='/notifications' text='Notificações' icon={BellIcon}></SidebarItems>
            </ul>
            <ul>
                <SidebarItems 
                    text='Sair' 
                    icon={LogoutIcon} 
                    onClick={logout}
                    className={`
                        text-red-600 dark:text-red-400 
                        dark:hover:text-white
                        hover:bg-red-500 hover:text-white`}
                ></SidebarItems>
            </ul>
        </aside>
    )
}