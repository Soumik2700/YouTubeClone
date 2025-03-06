import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.[1]?.split(" ")[0];
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex">
            {/* Menu Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 md:top-5 left-4 p-3 md:p-2 text-white rounded-full"
            >
                <HiMenu size={30} />
            </button>

            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300 
                ${isOpen ? "w-60" : "w-0 overflow-hidden"}`}
            >
                {/* Sidebar Links */}
                <ul className={`transition-all duration-300 flex-grow ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}><li className="p-2">🏠 Home</li></Link>
                    <Link to={`/${name}/channelDetails`}><li className="p-2">📺 My Channel</li></Link>
                    <li className="p-2">🔥 Trending</li>
                    <li className="p-2">🎵 Music</li>
                    <li className="p-2">🎮 Gaming</li>
                </ul>

                {/* Copyright Notice */}
                <footer className="text-center text-sm opacity-75 p-2 mt-auto">
                    © {currentYear} Video Platform. Developed by Soumik Sinha
                </footer>
            </div>
        </div>
    );
}

export default Sidebar;
