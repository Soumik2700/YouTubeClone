import { useOutletContext } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import videos from "../utils/mockData";
import "./Home.css"

function Home() {
    const { isOpen } = useOutletContext();

    return (
        <div className="">
            {/* Filter Section */}
            <ul className="filterList bg-gray-900 text-white px-7 flex gap-7">
                <li>All</li>
                <li>Music</li>
                <li>Gaming</li>
                <li>Trending</li>
                <li>Technology</li>
            </ul>

            {/* Video Section */}
            <section className="min-h-screen bg-gray-800 text-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    videos.map((video) => (
                        <VideoPlayer key={video.videoId} video={video} />
                    ))
                }
            </section>
        </div>
    );
}

export default Home;
