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
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],  // ✅ Default empty array
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    uploadDate: {
        type: Date,  // ✅ Use Date instead of String
        default: Date.now
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
}, { timestamps: true });  // ✅ Use timestamps: true

const Video = mongoose.model("Video", videoSchema);

export default Video;
