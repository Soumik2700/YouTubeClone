import "./ChannelDetails.css";
import { useEffect, useState } from "react";
import ChannelVideo from "./ChannelVideo";
import axios from "axios";

function ChannelDetails() {
    const [isMoreClicked, setIsMoreClicked] = useState(false);
    const [channelBanner, setChannelBanner] = useState("");
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelVideos, setChannelVideos] = useState([]);
    const [hasDeleted, setHasDeleted] = useState(false);
    const Id = JSON.parse(localStorage.getItem("user"))[3][0];
    // console.log(Id);

    useEffect(()=>{
       const fetchChannel = async ()=>{
           try {
               const response = await axios.get(`http://localhost:3000/${Id}/getChannel`);
            //    console.log(response.data);
               const { channelBanner, channelName, description} = response.data;

               setChannelBanner(channelBanner);
               setChannelName(channelName);
               setDescription(description)

               const videoRes = await axios.get(`http://localhost:3000/${Id}/getChannelVideos`);
               setChannelVideos(videoRes.data);
               
           } catch (err) {
               console.log(err.message);
           }
       }

       fetchChannel();

    },[Id, hasDeleted])

    return (
        <>
            <main className="min-h-screen bg-gray-900 border channelDetails">
                {/* Channel Banner */}
                <section className="p-5 flex justify-center">
                    {channelBanner ? (
                        <img className="channelBanner" src={channelBanner} alt="Channel Banner" />
                    ) : (
                        <div className="w-full h-[300px] bg-gray-700 flex items-center justify-center text-white">
                            No Banner Available
                        </div>
                    )}
                </section>

                {/* Channel Profile and Info */}
                <section className="flex flex-col items-center mt-5 text-center">
                    {channelBanner ? (
                        <img className="channelProfile" src={channelBanner} alt="Channel Profile" />
                    ) : (
                        <div className="w-[100px] h-[100px] bg-gray-700 rounded-full flex items-center justify-center text-white">
                            No Profile
                        </div>
                    )}
                    <h2 className="text-3xl font-bold mt-3 overflow-hidden">{channelName || "Channel Name"}</h2>
                    <p className="text-gray-400">subscribers</p>
                    <button className="subscribeBtn">Subscribe</button>
                </section>

                {/* Channel Description with Smooth Expand/Collapse */}
                <section className="mt-5 px-10">
                    <h3 className="text-2xl text-white">About</h3>
                    <div
                        className={`text-gray-300 mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isMoreClicked ? "max-h-[500px]" : "max-h-[25px]"
                            }`}
                    >
                        <p>
                            {description}
                        </p>
                    </div>
                    <span
                        className="cursor-pointer text-blue-400 hover:underline"
                        onClick={() => setIsMoreClicked(!isMoreClicked)}
                    >
                        {isMoreClicked ? "Show Less" : "More..."}
                    </span>
                </section>
                
                <section className="channelVideos">
                    {channelVideos.length > 0 ? (
                        channelVideos.map(video => <ChannelVideo key={video.videoId} video={video} channelName = {channelName} setHasDeleted={setHasDeleted}/>)
                    ) : (
                        <p className="text-gray-500 text-center mt-5">No videos uploaded yet.</p>
                    )}
                </section>

            </main>
        </>
    );
}

export default ChannelDetails;
