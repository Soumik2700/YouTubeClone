import { useOutletContext, useParams } from "react-router-dom";
import videos from "../utils/mockData";
import RemainingVideoPlayer from "./RemainingVideoPlayer";
import "./videoDetails.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";

function VideoDetails() {
    const { id } = useParams();
    const video = videos.find(video => video.videoId === id);
    const remainingVideos = videos.filter(video => video.videoId !== id);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(video?.comments || []);
    const [commentId, setCommentId] = useState(null);
    const {isOpen, setIsOpen} = useOutletContext();
    console.log(isOpen);

    if (!video) {
        return <h2 className="text-white text-center mt-10">Video Not Found</h2>;
    }

    // ✅ Fix: Only delete when commentId is valid
    useEffect(() => {
        if (commentId !== null) {
            setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
            setCommentId(null); // Reset commentId after deletion
        }
    }, [commentId]);

    function handleSetComment() {
        if (!commentText.trim()) return;

        const commentInfo = {
            commentId: comments.length + 1, // Fix ID logic
            userId: "randomUser",
            text: commentText,
            timestamp: new Date().toISOString()
        };

        setComments([...comments, commentInfo]);
        setCommentText("");
    }

    function handleEditComment(commentId, newText) {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.commentId === commentId ? { ...comment, text: newText } : comment
            )
        );
    }

    return (
        <main className="flex flex-col lg:flex-row min-h-screen bg-gray-900" onClick={()=>setIsOpen(false)}>
            {/* Main Video Section */}
            <div className="w-full md:w-full lg:w-4/5 p-6 bg-gray-800 text-white">
                <iframe
                    className="z-[0] w-full h-[250px] sm:h-[400px] md:h-[600px] rounded-lg cursor-pointer"
                    src={video.videoUrl}
                    title={video.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>

                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

                <div className="flex flex-col md:flex-row justify-between mt-4">
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex gap-2">
                            <img className="bg-gray-900 w-8 h-8 md:w-10 md:h-10 rounded-[50%]" src="somathing" alt="" />
                            <div className="">
                                <p className="font-bold text-[12px] md:text-[15px]">{video.uploader}</p>
                                <p className="text-[10px] opacity-50">12k</p>
                            </div>
                        </div>
                        <button
                            className="
                            p-1 
                            px-3
                             bg-gray-50 
                             hover:bg-gray-200 
                             text-black 
                             font-semibold 
                             rounded-2xl transition duration-200 text-sm md:text-md">Subcribe</button>

                    </div>
                    <div className="bg-gray-700 p-1 md:p-2 rounded-xl flex w-20 md:w-23 text-[10px] mt-2">
                        <button className="likeBtn"><LuThumbsUp />{10}</button>
                        <button className="dislikeBtn"><LuThumbsDown /></button>
                    </div>
                </div>

                <p className="mt-3">{video.description}</p>

                <div className="flex gap-4 mt-4">
                    <span>👍 {video.likes.toLocaleString()}</span>
                    <span>👎 {video.dislikes.toLocaleString()}</span>
                </div>

                {/* Comment Input */}
                <div className="flex p-2 border-b-2">
                    <textarea
                        className="w-[85%] focus:outline-none bg-gray-700 p-2 rounded-lg"
                        placeholder="Enter comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="px-5 bg-gray-600 text-center rounded-xl ml-2" onClick={handleSetComment}>
                        Comment
                    </button>
                </div>

                {/* Comments Section */}
                <section className="w-full bg-gray-900 rounded-md mt-4">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment.commentId} comment={comment} onEdit={handleEditComment} setCommentId={setCommentId} />
                        ))
                    ) : (
                        <p className="text-gray-400 p-4">No comments yet. Be the first to comment!</p>
                    )}
                </section>
            </div>

            {/* Remaining Videos Sidebar */}
            <div className="remainingVideo w-full md:w-full lg:w-[35%] overflow-y-auto min-h-screen p-4">
                {remainingVideos.map(video => (
                    <RemainingVideoPlayer key={video.videoId} video={video} />
                ))}
            </div>
        </main>
    );
}

export default VideoDetails;
