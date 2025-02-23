import { useEffect, useState } from "react";
import "./ChannelInfo.css";
import { Link } from "react-router-dom";

function ChannelInfo() {
    const [user, setUser] = useState([]);
    const [name, setName] = useState("");

    function handelLogOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        window.location.reload();
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || [];
        setUser(storedUser);
    }, []);

    useEffect(() => {
        if (user.length > 0) {
            setName(user[1]?.split(" ")[0]); // Extract first name safely
        }
    }, [user]);

    return (
        <div className="channelInfo">
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
    );
}

export default ChannelInfo;
