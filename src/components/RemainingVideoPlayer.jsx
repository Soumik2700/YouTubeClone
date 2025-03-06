
import { Link } from "react-router-dom";

function RemainingVideoPlayer({ video }) {

    return (
        <Link to={`/videoDetails/${video._id}`} className="flex p-2 gap-2 hover:bg-gray-700 rounded-md transition" >
            <img src={video.thumbnailUrl} alt={video.title} className="w-36 h-24 rounded-md object-cover" />

            {/* Video Info */}
            <div className="text-white">
                <h1 className="text-sm font-bold">{video.title.split("|")[0]}</h1>
                <h2 className="text-gray-400 text-xs">{video.uploader?.channelName}</h2>
                <h3 className="text-gray-400 text-xs">
                    Likes: {video?.likes?.length >= 1000000 && (video?.likes?.length / 1000000) + "M" || video?.likes?.length >= 1000 && (video?.likes?.length / 1000) + "K" || video?.likes?.length > 0 && video?.likes?.length || 0}
                </h3>
            </div>
        </Link>
    );
}

export default RemainingVideoPlayer;
