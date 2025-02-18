import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import videos from "../utils/mockData";
import RemainingVideoPlayer from "./RemainingVideoPlayer";
import "./videoDetails.css";
import { useEffect, useState } from "react";
import Comment from "./comment";

function VideoDetails() {
    const { id } = useParams(); // Get video ID from URL
    const video = videos.find(video => video.videoId === id); // Find the correct video
    const remainingVideos = videos.filter(video => video.videoId !== id); // Get other videos

    if (!video) {
        return <h2 className="text-white text-center mt-10">Video Not Found</h2>;
    }

    return (
        <main className="flex flex-col md:flex-row min-h-screen bg-gray-900">
            {/* Main Video Section */}
            <div className="w-full md:w-3/4 lg:w-4/5 p-6 bg-gray-800 text-white">
                {/* Video Player */}
                    <iframe
                        className="z-[0] w-full h-[250px] sm:h-[400px] md:h-[600px] rounded-lg"
                        src={video.videoUrl}
                        title={video.title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>

                {/* Video Details */}
                <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
                <p className="text-gray-400">{video.uploader} • {video.views > 1000000 ? video.views / 1000000 + "M" : video.views > 1000 ? video.views / 1000 + "K" : video.views}</p>
                <p className="mt-3">{video.description}</p>

                {/* Likes & Engagement */}
                <div className="flex gap-4 mt-4">
                    <span>👍 {video.likes > 1000000 ? video.likes / 1000000 + "M" : video.likes > 1000 ? video.likes / 1000 + "K" : video.likes}</span>
                    <span>👎 {video.dislikes > 1000000 ? video.dislikes / 1000000 + "M" : video.dislikes > 1000 ? video.dislikes / 1000 + "K" : video.dislikes}</span>
                </div>

                <div className="flex p-2 border-b-2">
                    <textarea className="w-[85%] focus:outline-none" type="textarea" placeholder="Enter comment"/>
                    <button className="px-5 bg-gray-600 text-center rounded-xl">comment</button>
                </div>

                <section className="w-full bg-gray-900 rounded-md">
                    <Comment/>
                    <Comment />
                    <Comment />
                    <Comment />
                </section>
            </div>

            {/* Remaining Videos Sidebar */}
            <div className=" remainingVideoOverflow w-full md:w-1/4 lg:w-[35%]  overflow-y-auto min-h-screen p-4">
                {
                    remainingVideos.map(video => <RemainingVideoPlayer key={video.videoId} video={video} />)
                }
            </div>
        </main>
    );
}

export default VideoDetails;
