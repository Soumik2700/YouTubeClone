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
            setName(user[0]?.split(" ")[0]); // Extract first name safely
        }
    }, [user]);

    return (
        <div className="channelInfo">
            <h1>
                {
                    Array.isArray(user[2]) && user[2].length > 0 ? (
                        <Link to="/viewChannel">View Channel</Link>
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
