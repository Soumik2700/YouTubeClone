import { useEffect, useState } from "react";
import "./ChannelInfo.css"
import { Link } from "react-router-dom";
function ChannelInfo(){
    const [user, setUser] = useState([]);

    function handelLogOut(){
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        window.location.reload();
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")) || []);
        console.log(user[0]);
    },[])

    return(
        <>
            <div className="channelInfo">
                <h1>
                    {
                        !user[2]?.length ? <Link to={"/createChannel"}>Create channel</Link> : <Link to={"/viewChannel"}>View Channel</Link>
                    }
                </h1>
                <button className="p-2 bg-gray-700" onClick={handelLogOut}>Log out</button>
            </div>
        </>
    )
}

export default ChannelInfo;