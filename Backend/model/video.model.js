import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const videoSchema = mongoose.Schema({
    videoId: {
        type: String,
        unique: true,
        default: uuidv4
    },
    title: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    uploadDate: {
        type: String,
        default: () => new Date().toDateString()
    },
    comment: [
        {
            channelId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Channel"
            },
            text: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        },
    ]
}, { timestamp: true })

const Video = new mongoose.model("Video", videoSchema);

export default Video;