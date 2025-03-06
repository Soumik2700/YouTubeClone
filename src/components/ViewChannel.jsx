import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get channel ID from URL
import axios from "axios";
import "./ChannelDetails.css";
import ChannelVideo from "./ChannelVideo";
import { Link } from "react-router-dom";

function ViewChannel() {
    const { channelId } = useParams(); // Get channelId from URL
    const [channelBanner, setChannelBanner] = useState("");
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelVideos, setChannelVideos] = useState([]);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isMoreClicked, setIsMoreClicked] = useState(false);
    const [hasDeleted, setHasDeleted] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.[0];
    const authToken = localStorage.getItem("authToken");
    const myChannelId = user?.[3]?.[0];

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${channelId}/getChannel`);

                const { channelBanner, channelName, description, subscriber } = response.data;
                setChannelBanner(channelBanner);
                setChannelName(channelName);
                setDescription(description);
                setSubscribersCount(subscriber.length);

                // Check if the logged-in user is subscribed
                setIsSubscribed(subscriber.includes(userId));

                const videoRes = await axios.get(`http://localhost:3000/${channelId}/getChannelVideos`);
                setChannelVideos(videoRes.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchChannel();
    }, [channelId, userId, hasDeleted]);

    async function handleSubscription() {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/channels/${channelId}/updateSubscriber`,
                { userId },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            setIsSubscribed(response.data.subscribed);
            setSubscribersCount(response.data.subscriberCount);
        } catch (err) {
            console.error("Subscription error:", err.response?.data?.message || err.message);
        }
    }

    return (
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

            {/* Channel Info */}
            <section className="flex flex-col items-center mt-5 text-center">
                {channelBanner ? (
                    <img className="channelProfile" src={channelBanner} alt="Channel Profile" />
                ) : (
                    <div className="w-[100px] h-[100px] bg-gray-700 rounded-full flex items-center justify-center text-white">
                        No Profile
                    </div>
                )}
                <h2 className="text-3xl font-bold mt-3 overflow-y-hidden">{channelName || "Channel Name"}</h2>
                <p className="text-gray-400">{subscribersCount} subscribers</p>

                {/* Subscribe Button */}
                <button
                    className={`p-1 px-3 font-semibold rounded-2xl transition duration-200 text-sm md:text-md
                        ${isSubscribed ? "bg-gray-400 text-black cursor-not-allowed" : "bg-gray-50 hover:bg-gray-200 text-black"}`}
                    onClick={handleSubscription}
                >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
            </section>

            {/* Channel Description */}
            <section className="mt-5 px-10">
                <h3 className="text-2xl text-white">About</h3>
                <div
                    className={`text-gray-300 mt-2 overflow-hidden transition-all duration-500 ease-in-out 
                        ${isMoreClicked ? "max-h-[500px]" : "max-h-[25px]"}`}
                >
                    <p>{description}</p>
                </div>
                <span className="cursor-pointer text-blue-400 hover:underline" onClick={() => setIsMoreClicked(!isMoreClicked)}>
                    {isMoreClicked ? "Show Less" : "More..."}
                </span>
            </section>

           {
            channelId === myChannelId && (
                    <Link className="createVideoButton w-[30%] hidden md:flex items-center cursor-pointer" to={`/${name}/createVideo`}>
                        <span>Create +</span>
                    </Link>
            )
           }

            {/* Channel Videos */}
            <section className="channelVideos">
                {channelVideos.length > 0 ? (
                    channelVideos.map(video => <ChannelVideo key={video.videoId} 
                        video={video} 
                        channelName={channelName} 
                        channelId={channelId}
                        setHasDeleted={setHasDeleted}
                     />)
                ) : (
                    <p className="text-gray-500 text-center mt-5">No videos uploaded yet.</p>
                )}
            </section>
        </main>
    );
}

export default ViewChannel;
