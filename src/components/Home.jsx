import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import videos from "../utils/mockData";
import axios from "axios";
import "./Home.css"

function Home() {
    const [allVideos, setAllVideos] = useState(videos);
    const { searchQuery } = useOutletContext();

    useEffect(() => {
        if(!searchQuery) return;
        // console.log(searchQuery);

        const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log(filteredVideos);
        setAllVideos(filteredVideos);
    }, [searchQuery])

    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = user?.[3]?.[0];
    console.log(channelId);

    useEffect(() => {
        async function getChannelData() {
            try {
                const response = await axios.get(`http://localhost:3000/${channelId}/getChannel`);
                response.data.channelBanner && localStorage.setItem("channelBanner", response.data.channelBanner);
            } catch (err) {
                console.err(err);
            }
        }

        getChannelData();
    }, [])

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
                    allVideos.map((video) => (
                        <VideoPlayer key={video.videoId} video={video} />
                    ))
                }
            </section>
        </div>
    );
}

export default Home;
