import { useEffect, useState } from "react";
import "./ChannelInfo.css";
import { Link } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChannelInfo() {
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const name = user?.[1]?.split(" ")[0] || "Guest";
    const [channelBanner, setChannelBanner] = useState("");
    const [hasProfileImage, setHasProfileImage] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const authToken = localStorage.getItem("authToken");
    const imgUrl = localStorage.getItem("channelBanner");
    const navigate = useNavigate();

    const channelId = Array.isArray(user[3]) ? user[3][0] : null;

    function handleLogOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("channelBanner");
        navigate("/signIn");
    }

    async function handleUpdatePhoto() {
        if (!channelBanner.trim()) {
            alert("Please provide a banner!");
            return setIsClicked(false);
        }
        try {
            const response = await axios.put(
                `https://youtubeclone-j6jr.onrender.com/${channelId}/updateProfilePicture`,
                { channelBanner },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            const updatedBanner = response.data.channelBanner;

            if (updatedBanner) {
                localStorage.setItem("channelBanner", updatedBanner);
                setChannelBanner("");
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setIsClicked(false);
            setHasProfileImage(true);
        }
    }

    useEffect(() => {
        async function getChannelBanner() {
            if (!channelId) return;
            try {
                const response = await axios.get(`https://youtubeclone-j6jr.onrender.com/${channelId}/getChannelBanner`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

                const fetchedBanner = response.data.channelBanner;

                if (fetchedBanner) {
                    localStorage.setItem("channelBanner", fetchedBanner);
                    setChannelBanner(fetchedBanner);
                }
            } catch (err) {
                console.error(err);
            }
        }

        getChannelBanner();
    }, [channelId, authToken]);

    return (
        <>
            <div className="channelInfo transition duration-200">
                {imgUrl ? (
                    <img className="w-10 h-10 rounded-full bg-gray-500" src={imgUrl} alt="Channel" />
                ) : (
                    <MdPhotoCamera className="w-10 h-10 rounded-full bg-gray-500 p-2 opacity-60 cursor-pointer"
                        onClick={() => setIsClicked(!isClicked)}
                    />
                )}
                <h1>
                    {Array.isArray(user[3]) && user[3].length > 0 ? (
                        <Link to={`/${name}/channelDetails`}>View Channel</Link>
                    ) : (
                        <Link to={`/${name ? name : ""}/createChannel`}>Create Channel</Link>
                    )}
                </h1>
                <button className="p-2 bg-gray-700" onClick={handleLogOut}>Log out</button>
            </div>

            {isClicked && (
                <div className="absolute flex justify-center items-center right-[15%] top-[30%] w-[40%] h-12 bg-gray-500 imageInput">
                    <input
                        className="w-full rounded-md p-1 bg-gray-700"
                        type="text"
                        placeholder="Enter image URL"
                        value={channelBanner}
                        onChange={(e) => setChannelBanner(e.target.value)}
                    />
                    <button className="p-1 px-2 bg-green-500 rounded-md" onClick={handleUpdatePhoto}>OK</button>
                </div>
            )}
        </>
    );
}

export default ChannelInfo;
