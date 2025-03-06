import { useEffect, useState } from "react";
import "./ChannelInfo.css";
import { Link } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import axios from "axios";

function ChannelInfo() {
    // const [user, setUser] = useState([]);
    // const [name, setName] = useState("");
    const user = JSON.parse(localStorage.getItem("user"))
    const name = user?.[1]?.split(" ")[0];
    const [channelBanner, setChannelBanner] = useState("");
    const [hasProfileImage, setHasProfileImage] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const authToken = localStorage.getItem("authToken");
    const imgUrl = localStorage.getItem("channelBanner");

    const channelId = user?.[3]?.[0];

    function handelLogOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("channelBanner");
        window.location.reload();
    }

    async function handelUpdatePhoto() {
        if (!channelBanner) {
            alert("Please provide a banner!");
            return setIsClicked(false);
        }
        try {
            const response = await axios.put(
                `http://localhost:3000/${channelId}/updateProfilePicture`,
                { channelBanner },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            const updatedBanner = response.data.channelBanner; // ✅ Extract new banner URL

            if (updatedBanner) {
                localStorage.setItem("channelBanner", updatedBanner); // ✅ Update localStorage
                setChannelBanner(updatedBanner); // ✅ Update state
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setIsClicked(false);
            setHasProfileImage(true);
        }
    }

    useEffect(() => {
        const channelId = JSON.parse(localStorage.getItem("user"))?.[3]?.[0];

        async function getChannelBanner() {
            if (!channelId) return;
            try {
                const response = await axios.get(`http://localhost:3000/${channelId}/getChannelBanner`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

                const fetchedBanner = response.data.channelBanner; // ✅ Extract banner URL

                if (fetchedBanner) {
                    localStorage.setItem("channelBanner", fetchedBanner); // ✅ Update localStorage
                    setChannelBanner(fetchedBanner); // ✅ Update state
                }
            } catch (err) {
                console.error(err);
            }
        }

        getChannelBanner();
    }, []);

    return (
        <>
            <div className="channelInfo transition duration-200">
                {
                    imgUrl ?
                        <img className={`w-10 h-10 rounded-[50%] bg-gray-500 ${!imgUrl && "p-2"}`} src={imgUrl} alt="" /> :
                        <MdPhotoCamera className="w-10 h-10 rounded-[50%] bg-gray-500 p-2 opacity-60" onClick={() => setIsClicked(!isClicked)} />
                }
                <h1>
                    {
                        Array.isArray(user[3]) && user[3].length > 0 ? (
                            <Link to={`/${name}/channelDetails`}>View Channel</Link>
                        ) : (
                            <Link to={`/${name ? name : ""}/createChannel`}>Create Channel</Link>
                        )
                    }
                </h1>
                <button className="p-2 bg-gray-700" onClick={handelLogOut}>Log out</button>
            </div>

            {
                isClicked && (
                    <div className="absolute flex justify-center items-center right-[15%] top-[30%] w-[40%] h-12 bg-gray-500 imageInput">
                        <input className="w-full rounded-md p-1 bg-gray-700"
                            type="text"
                            placeholder="Enter image url"
                            onChange={(e) => setChannelBanner(e.target.value)}
                        />
                        <button className="p-1 px-2 bg-green-500 rounded-md" onClick={handelUpdatePhoto}>OK</button>
                    </div>
                )
            }
        </>
    );
}

export default ChannelInfo;
