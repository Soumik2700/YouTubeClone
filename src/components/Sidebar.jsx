import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import "./Sidebar.css"

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Menu Icon - Stays Fixed */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-6 md:top-5 left-4 p-2 text-white rounded-full"
            >
                <HiMenu size={30} />
            </button>

            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white h-screen p-4 transition-all ${isOpen ? "w-60" : "w-0 overflow-hidden"
                    }`}
            >
                <ul className={`${isOpen ? "block" : "hidden"}`}>
                    <li className="p-2">Home</li>
                    <li className="p-2">My Channel</li>
                    <li className="p-2">Trending</li>
                    <li className="p-2">Music</li>
                    <li className="p-2">Gaming</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
