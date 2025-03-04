import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const VideoPlayer = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // console.log(video);
    return (
        <Link to={`videoDetails/${video._id}`}>
            <div className="relative w-full max-w-md">
                <div className="relative cursor-pointer">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full rounded-lg shadow-lg" />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
                        <button className="text-white text-3xl" onClick={() => setIsPlaying(!isPlaying)}><FaPlay /></button>
                    </div>
                </div>
                <h1 className="text-xl font-bold">{video.title}</h1>
                <h1 className="opacity-60">{video.uploader.channelName}</h1>
                <h1 className="opacity-60">
                    Likes {
                        video.likes >= 1000000 && (video.likes / 1000000) + "M" || video.likes >= 1000 && (video.likes / 1000) + "K" || video.likes
                    }
                </h1>
            </div>
        </Link>
    );
};

export default VideoPlayer;
