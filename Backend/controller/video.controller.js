import Video from "../model/video.model.js";
import Channel from "../model/channel.model.js";

export async function createVideo(req, res) {
    const { title, thumbnailUrl, videoUrl, description } = req.body;
    const channelId = req.params.channelId;
    console.log(channelId);

    if (!title || !thumbnailUrl || !videoUrl || !description) {
        return res.status(400).json({ message: "All filds are required!" });
    } else if (!channelId) {
        return res.status(400).json({ message: "No channel id provided!" });
    }

    try {
        const video = new Video({
            title, thumbnailUrl, videoUrl, description,

            uploader: channelId
        })

        const savedVideo = await video.save();
        if (!savedVideo) {
            return res.status(400).json({ message: "Problem saving the video!" })
        }

        res.status(201).send(savedVideo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getChannelVideos(req, res) {
    const channelId = req.params.channelId;

    if (!channelId) {
        return res.status(400).json({ message: "No channelId provided!" });
    }

    try {
        const videos = await Video.find({ uploader: channelId });
        if(!videos){
            return res.status(404).json({message: "No videos found!"});
        }

        res.status(200).send(videos);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}