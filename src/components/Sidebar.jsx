import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user?.[1]?.split(" ")[0];

    return (
        <div className="flex">
            {/* Menu Icon - Stays Fixed */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 md:top-5 left-4 p-3 md:p-2 text-white rounded-full"
            >
                <HiMenu size={30} />
            </button>

            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white min-h-screen transition-all duration-300 
                ${isOpen ? "w-60" : "w-0 overflow-hidden"}`}
            >
                {/* Fade in the <ul> with opacity */}
                <ul
                    className={`transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                >
                    <Link to="/" onClick={()=>setIsOpen(false)}><li className="p-2">🏠 Home</li></Link>
                    <Link to={`/${name}/channelDetails`}><li className="p-2">📺 My Channel</li></Link>
                    <li className="p-2">🔥 Trending</li>
                    <li className="p-2">🎵 Music</li>
                    <li className="p-2">🎮 Gaming</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
