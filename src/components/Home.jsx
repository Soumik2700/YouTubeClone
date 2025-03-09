import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import "./Home.css";
import LoadingSpinner from "./LoadingSpinner";

function Home() {
    const [allVideos, setAllVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { searchQuery } = useOutletContext();
    const [selectedCategory, setSelectedCategory] = useState("");

    // ✅ Fetch videos from API
    async function fetchVideos(reset = false) {
        setIsLoading(true);
        try {
            const response = await axios.get("https://youtubeclone-j6jr.onrender.com/videos", {
                params: { search: searchQuery, category: selectedCategory, page, limit: 12 }
            });

            const newVideos = response.data.videos.filter(
                video => !allVideos.some(v => v.videoId === video.videoId)
            );

            setAllVideos(prevVideos => reset ? response.data.videos : [...prevVideos, ...newVideos]);
            setHasMore(response.data.hasMore);
        } catch (err) {
            console.error("Error fetching videos:", err.message);
        } finally {
            setIsLoading(false);
        }
    }

    // ✅ Fetch new videos when search query or category changes
    useEffect(() => {
        setPage(1);
        setAllVideos([]);
        fetchVideos(true);
    }, [searchQuery, selectedCategory]);

    // ✅ Fetch more videos when page number changes (infinite scroll)
    useEffect(() => {
        if (page > 1) fetchVideos();
    }, [page]);

    // ✅ Infinite Scroll Logic
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
                hasMore && !isLoading
            ) {
                setPage(prevPage => prevPage + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading]);

    return (
        <div className="">
            {/* Filter Section */}
            <ul className="filterList bg-gray-900 text-white px-7 flex gap-7">
                {["All", "Music", "Gaming", "Comedy"].map(category => (
                    <li
                        key={category}
                        className={`cursor-pointer px-3 py-1 rounded-md ${selectedCategory === category ? "bg-blue-500" : "bg-gray-700"
                            }`}
                        onClick={() => setSelectedCategory(category === "All" ? "" : category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            {/* Video Section */}
            {isLoading && page === 1 ? <LoadingSpinner /> : (
                <section className="min-h-screen bg-gray-800 text-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allVideos.length > 0 ? (
                        allVideos.map(video => <VideoPlayer key={video.videoId} video={video} />)
                    ) : (
                        <p className="text-center text-gray-500">No videos found.</p>
                    )}
                </section>
            )}

            {isLoading && page > 1 && <p className="text-center text-gray-400 mt-4">Loading more videos...</p>}
        </div>
    );
}

export default Home;
