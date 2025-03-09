import "./CreateVideo.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateVideo() {
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const authtoken = localStorage.getItem("authToken");

    // Retrieve user and channel details from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = user?.[3]?.[0]; // Extract channelId safely
    const name = user?.[1]?.split(" ")[0]; // Extract first name

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !thumbnailUrl || !videoUrl || !description) {
            return alert("All fields are required!");
        }

        try {
            const response = await axios.post(`https://youtubeclone-j6jr.onrender.com/${channelId}/createVideo`, {   // ✅ Correct way to pass request body
                    title,
                    thumbnailUrl,
                    videoUrl,
                    description
                },
                {   // ✅ Correct way to pass headers
                    headers: {
                        Authorization: `Bearer ${authtoken}`
                    }
                }
            );

            // Clear form fields after submission
            setTitle("");
            setThumbnailUrl("");
            setVideoUrl("");
            setDescription("");

            // Redirect to channel details
            setTimeout(() => {
                navigate(`/${name}/channelDetails`);
            }, 1500);
        } catch (err) {
            console.error("Error creating video:", err.message);
        }
    }

    return (
        <main className="createVideo">
            <h2 className="text-white text-2xl font-bold mb-4">Create Your Content</h2>
            <form className="createVideoForm" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input className="w-full bg-gray-700 p-2 rounded-md text-white"
                        type="text"
                        placeholder="Enter video title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input className="w-full bg-gray-700 p-2 rounded-md text-white"
                        type="text"
                        placeholder="Enter thumbnail URL"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="videoUrl">Video URL</label>
                    <input className="w-full bg-gray-700 p-2 rounded-md text-white"
                        type="text"
                        placeholder="Enter video URL"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Video Description</label>
                    <textarea className="w-full h-[300px] bg-gray-700 p-2 rounded-md text-white scrollBar"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button type="submit" className="p-3 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200">
                    Create Video
                </button>
            </form>
        </main>
    );
}

export default CreateVideo;
