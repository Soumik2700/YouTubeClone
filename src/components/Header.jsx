import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import HeaderLogo from "../assets/youtubeicon.png"
import { useNavigate } from "react-router-dom";
import ChannelInfo from "./ChannelInfo";
import "./Header.css"; // Import only for media queries


function Header({ setSearchQuery, isLogin }) {
    const [search, setSearch] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    const name = user && user[1]?.split(" ")[0];

    function handelSearch() {
        setSearchQuery(search.trim());
        document.querySelector(".search").value = "";
    }

    function handelSignClick() {
        isLogin && setIsClicked(!isClicked);
        !isLogin && navigate("/signIn");
    }

    useEffect(() => {
        function handelOutsideClicked(event) {
            if (isClicked && !event.target.closest(".signInBtn")) {
                setIsClicked(false);
            }

           
        }

        document.addEventListener("click", handelOutsideClicked);
        return () => {
            document.removeEventListener("click", handelOutsideClicked);
        }
    }, [isClicked])

    return (
        <header className=" min-w-screen flex justify-between items-center bg-gray-900 text-white p-4">
            {/* Logo */}
            <h1 className="text-xl font-bold flex p-2 items-center gap-3">
                <div className="flex w-full h-full items-center ml-9 gap-1">
                    <Link className="hidden md:block"><img className="w-10 h-10" src={HeaderLogo} alt="" /></Link>
                    <Link className="hidden md:contents" to="/" onClick={() => {
                        navigate("/");
                        window.location.reload();
                    }}>YouTube</Link>
                </div>

            </h1>

            {/* Search Bar */}
            <section className="search-container flex w-1/3 relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition" onClick={() => {
                    navigate("/");
                    handelSearch();
                }}>
                    <IoSearchOutline className="text-xl text-white" />
                </button>
            </section>

            {/* Sign In Button */}
            <div className="signInBtn overflow-hidden flex gap-3">
                {
                    (user && user[3].length > 0) && <Link className="createVideoBtn hidden md:flex items-center cursor-pointer" to={`/${name}/createVideo`}>
                        <span>Create +</span>
                    </Link>
                    
                }
                <button className={`sign-in relative flex items-center gap-2 md:px-0 ml-1 mt-1 md:ml-0 md:mr-4 rounded-full md:border md:border-gray-300 hover:bg-gray-800 transition md:bg-gray-700 ${isLogin && "pr-8 px-1"}`} onClick={handelSignClick}>
                    {
                        isLogin ? JSON.parse(localStorage.getItem("user"))[1].split(" ")[0] : <>
                            <PiUserCircle className="signInLogo text-4xl" />
                            <span className="signInText">Sign in</span>
                        </>
                    }
                </button>
                {(isLogin && isClicked) && <ChannelInfo />}
            </div>

        </header>

    );
}

export default Header;


