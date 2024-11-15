import logo from "../../assets/Logo.svg"
import { IoChatbubblesOutline, IoLogOutOutline, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5'

const Nav = () => (
    <nav className="bg-[#F4F6F8] py-3 px-8 flex items-center justify-between">
        <div className="px-10 py-1">
            <img width="120" src={logo} alt="Company Logo" />
        </div>
        <div className="flex items-center gap-3">
            {[IoChatbubblesOutline, IoNotificationsOutline, IoSettingsOutline, IoLogOutOutline].map((Icon, index) => (
                <div key={index} className="p-3 bg-white rounded-full">
                    <Icon size={20} />
                </div>
            ))}
        </div>
    </nav>
)

export default Nav
