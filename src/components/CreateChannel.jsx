import { useEffect, useState } from "react";
import "./CreateChannel.css";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function CreateChannel() {
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [channelBanner, setChannelBanner] = useState("");
    const navigate = useNavigate();

    // ✅ Ensure context is properly retrieved
    const outletContext = useOutletContext();
    const setHasChannelCreated = outletContext?.setHasChannelCreated || (() => { }); // Prevent errors if undefined

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.[3]?.length > 0) {
            setHasChannelCreated(true);
            navigate(`/${user[1].split(" ")[0]}/channelDetails`);
        }
    }, [navigate, setHasChannelCreated]);

    async function handleCreateChannel() {
        if (!channelName || !channelDescription) {
            alert("Channel name and description are required!");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("User not found! Please log in.");
            navigate("/signIn");
            return;
        }

        const owner = user[2];

        const channel = {
            channelName,
            description: channelDescription,
            channelBanner,
            owner,
        };

        try {
            const response = await axios.post("http://localhost:3000/user/createchannel", channel);

            if (response.data.message !== "Channel created sucessfully!") {
                return alert(response.data.message);
            }

            const { _id } = response.data.channel;

            const updatedUser = { ...user };
            updatedUser[3] = updatedUser[3] ? [...updatedUser[3], _id] : [_id];
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setHasChannelCreated(true);
            navigate(`/${updatedUser[1].split(" ")[0]}/channelDetails`);
        } catch (err) {
            console.error("Error creating channel:", err.message);
        }
    }

    return (
        <main className="createChannel">
            <section className="createChannelSection">
                <h1 className="title">Create Your Channel</h1>

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

                <div className="inputContainer">
                    <label className="inputLabel">Channel Description</label>
                    <textarea
                        className="inputField descriptionField"
                        placeholder="Tell viewers about your channel"
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                    />
                </div>

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

                <button className="createButton" onClick={handleCreateChannel}>
                    Create Channel
                </button>
            </section>
        </main>
    );
}

export default CreateChannel;
