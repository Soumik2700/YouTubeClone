import { useParams } from "react-router-dom";
import videos from "../utils/mockData";
import RemainingVideoPlayer from "./RemainingVideoPlayer";

function VideoDetails() {
    const { id } = useParams(); // Get video ID from URL
    const video = videos.find(video => video.videoId === id); // Find the correct video
    const remainingVideos = videos.filter(video => video.videoId !== id); // Get other videos

    if (!video) {
        return <h2 className="text-white text-center mt-10">Video Not Found</h2>;
    }

    return (
        <main className="flex h-screen bg-gray-900">
            {/* Main Video Section */}
            <div className="w-[65%] p-6 bg-gray-800 text-white">
                {/* Video Player */}
                <iframe
                    className="w-full h-[500px] rounded-lg"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>

                {/* Video Details */}
                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
                <p className="text-gray-400">{video.uploader} • {video.views.toLocaleString()} views</p>
                <p className="mt-3">{video.description}</p>

                {/* Likes & Engagement */}
                <div className="flex gap-4 mt-4">
                    <span>👍 {video.likes.toLocaleString()}</span>
                    <span>👎 {video.dislikes.toLocaleString()}</span>
                </div>
            </div>

            {/* Remaining Videos Sidebar */}
            <div className="w-[35%] bg-gray-800 overflow-y-auto max-h-screen">
                {
                    remainingVideos.map(video => <RemainingVideoPlayer key={video.videoId} video={video} />)
                }
            </div>
        </main>
    );
}

export default VideoDetails;
