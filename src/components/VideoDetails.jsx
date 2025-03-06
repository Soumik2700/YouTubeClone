import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RemainingVideoPlayer from "./RemainingVideoPlayer";
import Comment from "./Comment";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";

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
    const othersChannelId = video?.uploader?._id;
    const authToken = localStorage.getItem("authToken");
    const [hasComment, setHasComment] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [hasDelete, setHasDelete] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: "",
        thumbnailUrl: "",
        description: "",
        channelId: channelId || ""  // ✅ Ensure `channelId` is included
    });
    console.log("video",video);
    // console.log("remaining Videos", remainingVideos);

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
    }, [id, hasComment, hasSaved, hasDelete, isSubscribed, isEditing]);

    useEffect(() => {
        console.log("exclude id", id);
        async function fetchRemainingVideos() {
            try {
                const response = await axios.get(`http://localhost:3000/remainingVideos`, {
                    params: { page, limit: 10, excludeId: id }
                });

                // const remainings = response.data.videos.filter(video => video._id)
                setRemainingVideos(prev => [...prev, ...response.data.videos]); // ✅ Append new videos
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchRemainingVideos();
    }, [id]); // ✅ Add `page` as a dependency

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

    async function handleLikeDislike(action) {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/videos/${id}/likeDislike`,
                { userId: user?.[0], action },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            setVideo(prev => ({
                ...prev,
                likes: response.data.likes || [],  // ✅ Ensure it's always an array
                dislikes: response.data.dislikes || [] // ✅ Ensure it's always an array
            }));
        } catch (err) {
            console.error("Like/Dislike error:", err.response?.data?.message || err.message);
        }
    }
    function openEditModal() {
        setEditData({
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
            description: video.description,
        });
        setIsEditing(true);
    }

    // ✅ Close Edit Modal
    function closeEditModal() {
        setIsEditing(false);
    }


    function handleInputChange(e) {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    }

    async function handleEditSubmit() {
        try {
            // ✅ Ensure `channelId` is correctly assigned before sending the request
            const updatedData = { ...editData, channelId };

            console.log("Submitting Edit Data:", updatedData);

            const response = await axios.put(
                `http://localhost:3000/api/videos/${id}/edit`,
                updatedData,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            setVideo(response.data.updatedVideo); // ✅ Update UI with new data
            setIsEditing(false); // ✅ Close modal after updating
        } catch (err) {
            console.error("Error updating video:", err.response?.data?.message || err.message);
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
                        <Link to={`/viewChannel/${othersChannelId}`}>
                            <div className="flex gap-2">
                                <img className="bg-gray-900 w-8 h-8 md:w-10 md:h-10 rounded-[50%]" src={video.uploader?.channelBanner} alt="" />
                                <div className="">
                                    <p className="font-bold text-[12px] md:text-[15px]">{video.uploader?.channelName}</p>
                                    <p className="text-[10px] opacity-50">{video.uploader?.subscriber?.length} subscribers</p>

                                </div>
                            </div>
                        </Link>
                        <button
                            className={`p-1 px-3 font-semibold rounded-2xl transition duration-200 text-sm md:text-md
                             ${isSubscribed ? "bg-gray-400 text-black cursor-not-allowed" : "bg-gray-50 hover:bg-gray-200 text-black"}`}
                            onClick={handleSubscription}
                        >
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>


                    </div>
                   <div className="flex items-center gap-3 p-2">
                       {
                        video?.uploader?._id === channelId && (
                                <button
                                    className="flex items-center gap-1 border p-1 rounded-lg mt-2 hover:bg-gray-700"
                                    onClick={openEditModal}
                                >
                                    <CiEdit />
                                    Edit
                                </button>
                        )
                       }
                        <div className="bg-gray-700 flex p-2 gap-2 rounded-lg w-25 justify-center mt-2">
                            <button
                                className={`flex border-r pr-1 items-center ${video.likes?.some(like => like === user?.[0]) ? "text-blue-500" : ""}`}
                                onClick={() => handleLikeDislike("like")}
                            >
                                <LuThumbsUp />
                                {video.likes?.length || 0}
                            </button>

                            <button
                                className={`flex items-center ${video.dislikes?.some(dislike => dislike === user?.[0]) ? "text-red-500" : ""}`}
                                onClick={() => handleLikeDislike("dislike")}
                            >
                                <LuThumbsDown />
                                {video.dislikes?.length || 0}
                            </button>
                        </div>
                        
                   </div>


                </div>

                <p className="mt-3">{video.description}</p>
                <div className="flex gap-4 mt-4">
                    <span>👍 {video.likes?.length || 0}</span>
                    <span>👎 {video.dislikes?.length || 0}</span>
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

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Video</h2>

                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-700 rounded-lg mb-3"
                        />

                        <label className="block mb-2">Thumbnail URL</label>
                        <input
                            type="text"
                            name="thumbnailUrl"
                            value={editData.thumbnailUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-700 rounded-lg mb-3"
                        />

                        <label className="block mb-2">Description</label>
                        <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-gray-700 rounded-lg mb-3"
                        />

                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 bg-gray-600 rounded-lg" onClick={closeEditModal}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 rounded-lg" onClick={handleEditSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default VideoDetails;
