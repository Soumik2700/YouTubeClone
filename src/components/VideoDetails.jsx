import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RemainingVideoPlayer from "./RemainingVideoPlayer";
import Comment from "./Comment";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import axios from "axios";

function VideoDetails() {
    const { id } = useParams();
    const [video, setVideo] = useState({});
    const [comments, setComments] = useState([]);
    const [remainingVideos, setRemainingVideos] = useState([]);
    const { isOpen, setIsOpen } = useOutletContext();
    const [page, setPage] = useState(1);
    const [textarea, setTextArea] = useState("")
    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = user?.[3]?.[0];
    const authToken = localStorage.getItem("authToken");
    const [hasComment, setHasComment] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [hasDelete, setHasDelete] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isClickedSubscribe, setIsClickedSubscribe] = useState(false);
    console.log("video",video);

    useEffect(() => {
        async function fetchVideoDetails() {
            try {
                const response = await axios.get(`http://localhost:3000/${id}/video`);
                // console.log(response.data);
                setVideo(response.data);
                setComments(response.data.comment);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchVideoDetails();
    }, [id, hasComment, hasSaved, hasDelete, isSubscribed]); // ✅ Include `id` in dependencies

    useEffect(() => {
        async function fetchRemainingVideos() {
            try {
                const response = await axios.get(`http://localhost:3000/remainingVideos`, {
                    params: { page, limit: 9, excludeId: id }
                });

                // console.log("Remaining Videos:", response.data);
                setRemainingVideos(prev => [...prev, ...response.data.videos]); // ✅ Append new videos
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchRemainingVideos();
    }, [page]); // ✅ Add `page` as a dependency

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setPage(prev => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page]); // ✅ Add `page` as dependency

    async function postComment(){
        try{
            const response = await axios.put(`http://localhost:3000/${id}/postComment`,{
                channelId, textarea
            },
            {
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            }
            )

            setHasComment(!hasComment);
            setTextArea("");
            document.querySelector(".commentText").value = "";
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        let isMounted = true;
        async function fetchSubscriptionStatus() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/channels/${video.uploader?._id}/subscriptionStatus?userId=${user?.[0]}`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );

                if (isMounted) {
                    setIsSubscribed(response.data.subscribed);
                }
            } catch (err) {
                console.error("Error checking subscription status:", err);
            }
        }

        if (video.uploader?._id && user?.[0]) {
            fetchSubscriptionStatus();
        }

        return () => { isMounted = false; };
    }, [video.uploader?._id, user?.[0]]);


    async function handleSubscription() {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/channels/${video.uploader?._id}/updateSubscriber`,
                { userId: user?.[0] },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            setIsSubscribed(response.data.subscribed);

            // ✅ Update subscriber count dynamically
            setVideo(prev => ({
                ...prev,
                uploader: {
                    ...prev.uploader,
                    subscriber: response.data.subscriberCount
                }
            }));

        } catch (err) {
            console.error("Subscription error:", err.response?.data?.message || err.message);
        }
    }



    return (
        <main className="flex flex-col lg:flex-row min-h-screen bg-gray-900" onClick={() => setIsOpen(false)}>
            {/* Main Video Section */}
            <div className="w-full md:w-full lg:w-4/5 p-6 bg-gray-800 text-white">
                {
                    (
                        <iframe
                            className="z-[0] w-full h-[250px] sm:h-[400px] md:h-[600px] rounded-lg cursor-pointer"
                            src={video.videoUrl}
                            title={video.title || "Video"}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    )
                }

                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex gap-2">
                            <img className="bg-gray-900 w-8 h-8 md:w-10 md:h-10 rounded-[50%]" src={video.uploader?.channelBanner} alt="" />
                            <div className="">
                                <p className="font-bold text-[12px] md:text-[15px]">{video.uploader?.channelName}</p>
                                <p className="text-[10px] opacity-50">{video.uploader?.subscriber?.length}</p>
                            </div>
                        </div>
                        <button
                            className={`p-1 px-3 font-semibold rounded-2xl transition duration-200 text-sm md:text-md
                             ${isSubscribed ? "bg-gray-400 text-black cursor-not-allowed" : "bg-gray-50 hover:bg-gray-200 text-black"}`}
                            onClick={handleSubscription}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>


                    </div>
                    <div className="bg-gray-700 flex p-2 gap-2 rounded-lg">
                        <button className="flex border-r pr-1 items-center"><LuThumbsUp />{10}</button>
                        <button className=""><LuThumbsDown /></button>
                    </div>
                </div>

                <p className="mt-3">{video.description}</p>

                <div className="flex gap-4 mt-4">
                    <span>👍 {video.likes}</span>
                    <span>👎 {video.dislikes}</span>
                </div>

                {/* Comment Input */}
                <div className="flex p-2 border-b-2">
                    <textarea
                        className="commentText w-[85%] focus:outline-none bg-gray-700 p-2 rounded-lg"
                        placeholder="Enter comment"
                        onChange={(e)=>{
                            setTextArea(e.target.value);
                        }}
                    />
                    <button className="px-5 bg-gray-600 text-center rounded-xl ml-2" onClick={postComment}>
                        Comment
                    </button>
                </div>

                {/* Comments Section */}
                <section className="w-full bg-gray-900 rounded-md mt-4">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment._id} comment={comment} videoId={id} setHasSaved={setHasSaved} hasDelete={hasDelete} setHasDelete={setHasDelete}/> // ✅ Pass `comment` prop
                        ))
                    ) : (
                        <p className="text-gray-400 p-4">No comments yet. Be the first to comment!</p>
                    )}
                </section>
            </div>

            {/* Remaining Videos Sidebar */}
            <div className="remainingVideo w-full md:w-full lg:w-[35%] overflow-y-auto min-h-screen p-4">
                {remainingVideos?.map(video => (
                    <RemainingVideoPlayer key={video.videoId} video={video}/>
                ))}
            </div>
        </main>
    );
}

export default VideoDetails;
