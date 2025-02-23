import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const channelSchema = mongoose.Schema({
    channelId: {
        type:String,
        unique:true,
        default:uuidv4
    },
    channelName:{
        type:String,
        required:true
    },
    owner:{
        type: String,
        ref: "User",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    channelBanner:{
        type:String,
        default: "https://example.com/default-banner.png",
    },
    subscriber:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
// {
//     channelId: "channel01", channelName: "Code with John", owner: "user01", description:
//     "Coding tutorials and tech reviews by John Doe.", channelBanner:
//     "https://example.com/banners/john_banner.png", subscribers: 5200, videos: ["video01",
//         "video02"], }