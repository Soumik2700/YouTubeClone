import { Link } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import HeaderLogo from "../assets/youtubeicon.png"
import "./Header.css"; // Import only for media queries


function Header() {
    return (
        <header className="flex justify-between items-center bg-gray-900 text-white p-4">
            {/* Logo */}
            <h1 className="text-xl font-bold flex p-2 items-center gap-3">
                <div className="flex w-full h-full items-center ml-9 gap-1">
                    <Link className="hidden md:contents"><img className="w-10 h-10" src={HeaderLogo} alt="" /></Link>
                    <Link className="hidden md:contents" to="/">YouTube</Link>
                </div>

            </h1>

            {/* Search Bar */}
            <section className="search-container flex w-1/3 relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                    <IoSearchOutline className="text-xl text-white" />
                </button>
            </section>

            {/* Sign In Button */}
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-800 transition">
                <PiUserCircle className="text-2xl" />
                <span>Sign in</span>
            </button>

        </header>

    );
}

export default Header;
