import { useEffect, useState } from "react";
import "./CreateChannel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function CreateChannel() {
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [channelBanner, setChannelBanner] = useState("");
    const navigate = useNavigate();

    // ✅ Step 1: Prevent users from accessing if they already have a channel
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user[3].length > 0) {
            navigate(`/${user[0]}/channelDetails`); // Redirect to channel details
        }
    }, [navigate]);

    async function handleCreateChannel() {
        if (!channelName || !channelDescription) {
            alert("Channel name is required!");
            return;
        }

        const owner = JSON.parse(localStorage.getItem("user"))[2]; // ✅ Use email (correct data for backend)

        const channel = {
            channelName,
            description: channelDescription,
            channelBanner,
            owner
        };

        try {
            const response = await axios.post("http://localhost:3000/user/createchannel", channel);
            console.log(response.data);

            // ✅ Step 2: Extract `channelId` from response & update localStorage
            const { _id: channelId } = response.data.channel;
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            updatedUser[3].push(channelId); // ✅ Store `channelId` in the correct index
            const name = updatedUser[1].split(" ")[0];
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setHasChannelCreated(true);

            // ✅ Step 3: Redirect to channel details
            setTimeout(() => {
                navigate(`/${name}/channelDetails`);
            }, 2000);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <main className="createChannel">
            <section className="createChannelSection">
                <h1 className="title">Create Your Channel</h1>

                {/* Channel Name */}
                <div className="inputContainer">
                    <label className="inputLabel">Channel Name</label>
                    <input
                        type="text"
                        className="inputField"
                        placeholder="Enter your channel name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                </div>

                {/* Channel Description */}
                <div className="inputContainer">
                    <label className="inputLabel">Channel Description</label>
                    <textarea
                        className="inputField descriptionField"
                        placeholder="Tell viewers about your channel"
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                    />
                </div>

                {/* Channel Banner */}
                <div className="inputContainer">
                    <label className="inputLabel">Channel Banner (Image URL)</label>
                    <input
                        type="text"
                        className="inputField"
                        placeholder="Enter banner image URL"
                        value={channelBanner}
                        onChange={(e) => setChannelBanner(e.target.value)}
                    />
                </div>

                {/* Create Channel Button */}
                <button className="createButton" onClick={handleCreateChannel}>
                    Create Channel
                </button>
            </section>
        </main>
    );
}

export default CreateChannel;
