import { useOutletContext } from "react-router-dom";
import VideoFile from "./VideoFile";

function Home() {
    const { isOpen } = useOutletContext();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Home Component</h1>
            <p>Sidebar is {isOpen ? "Open" : "Closed"}</p>
            <VideoFile/>
        </div>
    );
}

export default Home;
