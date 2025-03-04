import { createUser, getUsers, loginUser, } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/mid.varifyToken.js";
import { checkSubscriptionStatus, createChannel, getChannelInfo, updateProfilePicture, updateSubscriber } from "../controller/channel.controller.js";
import { createVideo, getChannelVideos, getVideosByQuery, getVideoById, remainingVideos, postComment, updateComment, deleteComment, deleteVideo } from "../controller/video.controller.js";

export function routes(app) {
    app.post("/api/signup", createUser);
    app.get("/api/signup", getUsers);
    app.post("/api/login", loginUser);
    app.get("/user/verify", verifyToken, (req, res) => {
        res.json({ message: "Access Granted!" });
    });
    app.post("/user/createchannel", createChannel);
    app.post("/:channelId/createVideo", verifyToken, createVideo);
    app.get("/:id/getChannel", getChannelInfo);
    app.get("/:channelId/getChannelVideos", getChannelVideos);
    app.put("/:channelId/updateProfilePicture", verifyToken, updateProfilePicture)
    app.get("/videos", getVideosByQuery);
    app.get("/:id/video", getVideoById);
    // app.put("/:id/createComment", verifyToken, createComment);
    app.get("/remainingVideos", remainingVideos)
    app.put("/:id/postComment",verifyToken, postComment);
    app.put("/:id/updateComment", verifyToken, updateComment);
    app.put("/deleteComment", verifyToken, deleteComment);
    app.delete("/:id/deleteVideo", verifyToken, deleteVideo);
    app.put("/api/channels/:id/updateSubscriber", verifyToken, updateSubscriber);
    app.get("/api/channels/:id/subscriptionStatus", verifyToken, checkSubscriptionStatus);
}


