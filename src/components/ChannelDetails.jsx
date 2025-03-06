import "./ChannelDetails.css";
import { useEffect, useState } from "react";
import ChannelVideo from "./ChannelVideo";
import axios from "axios";
import { Link } from "react-router-dom";

function ChannelDetails() {
    const [isMoreClicked, setIsMoreClicked] = useState(false);
    const [channelBanner, setChannelBanner] = useState("");
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [channelVideos, setChannelVideos] = useState([]);
    const [hasDeleted, setHasDeleted] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = user?.[3]?.[0];
    const name = user && user[1]?.split(" ")[0];
    const authToken = localStorage.getItem("authToken");
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${channelId}/getChannel`);

                const { channelBanner, channelName, description, subscriber } = response.data;
                setChannelBanner(channelBanner);
                setChannelName(channelName);
                setDescription(description);
                setSubscribersCount(subscriber.length);

                // Check if the user is already subscribed
                const userObjectId = user?.[0];
                const isUserSubscribed = subscriber.some(sub => sub === userObjectId);
                setIsSubscribed(isUserSubscribed);

                const videoRes = await axios.get(`http://localhost:3000/${channelId}/getChannelVideos`);
                setChannelVideos(videoRes.data);

            } catch (err) {
                console.error(err.message);
            }
        };

        if (channelId) {
            fetchChannel();
        }
    }, [channelId, hasDeleted]);



    async function handleSubscription() {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/channels/${channelId}/updateSubscriber`,
                { userId: user?.[0] },
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
                <p className="text-gray-400">{subscribersCount} subscribers</p>
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
                    className={`text-gray-300 mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isMoreClicked ? "max-h-[500px]" : "max-h-[25px]"}`}
                >
                    <p>{description}</p>
                </div>
                <span className="cursor-pointer text-blue-400 hover:underline" onClick={() => setIsMoreClicked(!isMoreClicked)}>
                    {isMoreClicked ? "Show Less" : "More..."}
                </span>
            </section>

            <Link className="createVideoButton w-[30%] hidden md:flex items-center cursor-pointer" to={`/${name}/createVideo`}>
                <span>Create +</span>
            </Link>

            <section className="channelVideos">
                {channelVideos.length > 0 ? (
                    channelVideos.map(video => <ChannelVideo key={video.videoId} video={video} channelName={channelName} setHasDeleted={setHasDeleted} />)
                ) : (
                    <p className="text-gray-500 text-center mt-5">No videos uploaded yet.</p>
                )}
            </section>
        </main>
    );
}

export default ChannelDetails;
