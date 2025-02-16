import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // Hamburger icon
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import "./Sidebar.css"; // Import external CSS for animations & responsiveness

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Hamburger Button (Works on All Screens) */}
            <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <AiOutlineClose size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                {/* Sidebar Links */}
                <nav className="flex flex-col p-4 space-y-3 mt-10">
                    <Link to="/" className="sidebar-link">🏠 Home</Link>
                    <Link to="/channel/1" className="sidebar-link">📺 My Channel</Link>
                    <Link to="/" className="sidebar-link">🔥 Trending</Link>
                    <Link to="/" className="sidebar-link">🎵 Music</Link>
                    <Link to="/" className="sidebar-link">🎮 Gaming</Link>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
