import { useParams } from "react-router-dom";
import videos from "../utils/mockData";
import RemainingVideoPlayer from "./RemainingVideoPlayer";
import "./videoDetails.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";

function VideoDetails() {
    const { id } = useParams();
    const video = videos.find(video => video.videoId === id);
    const remainingVideos = videos.filter(video => video.videoId !== id);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(video?.comments || []);
    const [commentId, setCommentId] = useState(null);

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
        <main className="flex flex-col md:flex-row min-h-screen bg-gray-900">
            {/* Main Video Section */}
            <div className="w-full md:w-3/4 lg:w-4/5 p-6 bg-gray-800 text-white">
                <iframe
                    className="z-[0] w-full h-[250px] sm:h-[400px] md:h-[600px] rounded-lg cursor-pointer"
                    src={video.videoUrl}
                    title={video.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>

                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
                <p className="text-gray-400">{video.uploader} • {video.views.toLocaleString()} views</p>
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
            <div className="remainingVideoOverflow w-full md:w-1/4 lg:w-[35%] overflow-y-auto min-h-screen p-4">
                {remainingVideos.map(video => (
                    <RemainingVideoPlayer key={video.videoId} video={video} />
                ))}
            </div>
        </main>
    );
}

export default VideoDetails;
