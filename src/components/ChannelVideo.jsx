import { useState } from "react";
import { Link } from "react-router-dom";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import "./ChannelVideo.css"
import axios from "axios";

function ChannelVideo({ video, channelName, setHasDeleted}) {
    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = video?.uploader;
    const myChannelId = user?.[3]?.[0];
    console.log("channel video", video);
    console.log("channelId ", channelId, " mychannelid ", myChannelId);

    async function handelDelete(){
        try{
            const response = await axios.delete(`http://localhost:3000/${video._id}/deleteVideo`,{
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            });

            // console.log("delete response", response);
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
                        {channelName} • {video?.likes?.length >= 1000000 && (video?.likes?.length / 1000000) + "M" || video?.likes?.length >= 1000 && (video?.likes?.length / 1000) + "K" || video?.likes?.length > 0 && video?.likes?.length || 0}
                    </h1>
                </div>

                {/* Three Dots Menu */}
                {
                    channelId === myChannelId && (
                        <div className="relative flex w-[30%] justify-center items-center">
                            <button className="p-1 rounded-full hover:bg-gray-500" onClick={handelDelete}><MdOutlineDelete /></button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ChannelVideo;
