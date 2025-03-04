import { useState } from "react";
import { Link } from "react-router-dom";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import "./ChannelVideo.css"
import axios from "axios";

function ChannelVideo({ video, channelName, setHasDeleted}) {
    const authToken = localStorage.getItem("authToken");

    async function handelDelete(){
        try{
            const response = await axios.delete(`http://localhost:3000/${video._id}/deleteVideo`,{
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            });

            console.log("delete response", response);
            if (response.data.message !== "Video deleted sucessfully"){
                return alert(response.data.message);
            }else{
                setHasDeleted(true);
            }
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <div className="relative bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition duration-200">
            {/* Video Thumbnail & Link */}
            <Link to={`/videoDetails/${video._id}`} className="block">
                <img className="w-full rounded-md" src={video.thumbnailUrl} alt="Thumbnail" />
            </Link>

            {/* Video Title & Three Dots Menu */}
            <div className="flex justify-between items-center mt-2">
                {/* Title & Channel Info */}
                <div className="flex flex-col">
                    <h1 className="text-md font-bold">{video.title}</h1>
                    <h1 className="text-white opacity-45 text-sm">
                        {channelName} • {video.likes > 1000000 ?
                            (video.likes / 1000000).toFixed(1) + "M" :
                            video.likes > 1000 ? (video.likes / 1000).toFixed(1) + "K" : video.likes}
                    </h1>
                </div>

                {/* Three Dots Menu */}
                <div className="relative flex w-[30%] justify-center items-center">
                    <button className="p-1 rounded-full hover:bg-gray-500" onClick={handelDelete}><MdOutlineDelete/></button>
                </div>
            </div>
        </div>
    );
}

export default ChannelVideo;
