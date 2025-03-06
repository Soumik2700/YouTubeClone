import Video from "../model/video.model.js";
import Channel from "../model/channel.model.js";
import cors from "cors";
import mongoose from "mongoose";

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

export async function editVideo(req, res) {
    try {
        const { id } = req.params;
        const { title, thumbnailUrl, description, channelId } = req.body;

        console.log("Received channelId:", channelId);

        // Ensure the `channelId` is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ message: "Invalid channelId format" });
        }

        // Find the video by ID
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if the user making the request is the owner of the video
        if (video.uploader.toString() !== channelId.toString()) {
            return res.status(403).json({ message: "Unauthorized to edit this video" });
        }

        // Update only allowed fields
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (thumbnailUrl) updatedFields.thumbnailUrl = thumbnailUrl;
        if (description) updatedFields.description = description;

        // Perform the update while keeping `likes` and `dislikes` unchanged
        const updatedVideo = await Video.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Video updated successfully", updatedVideo });
    } catch (error) {
        console.error("Error updating video:", error);
        res.status(500).json({ message: "Server error" });
    }
}



export async function getChannelVideos(req, res) {
    const channelId = req.params.channelId;

    if (!channelId) {
        return res.status(400).json({ message: "No channelId provided!" });
    }

    try {
        const videos = await Video.find({ uploader: channelId });
        if (!videos) {
            return res.status(404).json({ message: "No videos found!" });
        }

        res.status(200).send(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getVideosByQuery(req, res) {
    try {
        const { page = 1, limit = 12, search = "", category = "" } = req.query;

        // ✅ Define keyword sets for each category
        const categoryKeywords = {
            Music: ["music", "song", "melody", "track", "album", "lyrics"],
            Gaming: ["gaming", "game", "play", "gamer", "console", "esports"],
            Comedy: ["comedy", "funny", "humor", "joke", "laugh", "standup"],
            Technology: ["technology", "tech", "gadgets", "AI", "software", "innovation"]
        };

        // ✅ Generate regex pattern for category-related keywords
        let categoryQuery = {};
        if (category && categoryKeywords[category]) {
            const regexPattern = categoryKeywords[category].join("|"); // Create "music|song|melody" pattern
            categoryQuery = {
                $or: [
                    { title: { $regex: regexPattern, $options: "i" } }, // Match in title
                    { description: { $regex: regexPattern, $options: "i" } } // Match in description
                ]
            };
        }

        // ✅ Use regex for case-insensitive search in title and description
        const searchQuery = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        // ✅ Combine filters
        const filter = { ...searchQuery, ...categoryQuery };

        const videos = await Video.find(filter)
            .sort({ uploadDate: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate("uploader", "channelName");

        const totalVideos = await Video.countDocuments(filter);
        const hasMore = (page * limit) < totalVideos;

        res.json({
            videos,
            hasMore,
            totalPages: Math.ceil(totalVideos / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching videos", error: err.message });
    }
}

export async function getVideoById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "No video ID provided!" });
    }

    try {
        const video = await Video.findById(id)
            .populate("uploader", "_id channelName channelBanner subscriber")
            .populate("comment.channelId", "channelName channelBanner")
        // .populate("likes", "_id username") // ✅ Ensure likes array is populated
        // .populate("dislikes", "_id username"); // ✅ Ensure dislikes array is populated

        if (!video) {
            return res.status(404).json({ message: "No video found!" });
        }

        res.json({
            ...video.toObject(), // ✅ Convert Mongoose object to plain object
            likesCount: video.likes,
            dislikesCount: video.dislikes
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



export async function remainingVideos(req, res) {
    const { page = 1, limit = 11, excludeId } = req.query;
    const filter = { _id: { $ne: excludeId } };
    try {
        const videos = await Video.find(filter).sort({ uploadDate: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate("uploader", "channelName");

        const totalVideos = await Video.countDocuments(filter);
        const hasMore = (page * limit) < totalVideos;

        res.json({
            videos,
            hasMore,
            totalPages: Math.ceil(totalVideos / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function postComment(req, res) {
    const id = req.params.id;
    const { channelId, textarea } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Video id not provided!" })

    }

    if (!channelId || !textarea) {
        return res.status(400).json({ message: "ChannelId and comment text not provided!" })
    }

    try {
        const video = await Video.findOne({ _id: id });

        if (!video) {
            return res.status(404).json({ message: "No video found!" });
        }

        video.comment.push({
            channelId,
            text: textarea
        })

        const savedVideo = await video.save();
        if (!savedVideo) {
            return res.status(400).json({ message: "Video not saved sucessfully!" });
        }

        res.send(savedVideo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateComment(req, res) {
    const videoId = req.params.id;
    const { commentId, channelId, text } = req.body;

    if (!videoId) {
        return res.status(400).json({ message: "Video id not provided!" });
    }
    if (!commentId || !channelId || !text) {
        return res.status(400).json({ message: "CommentId, ChannelId, and comment text are required!" });
    }

    try {
        // Find the video by `_id`
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "No video found!" });
        }

        // Find the comment inside the video
        const comment = video.comment.find((c) => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "No comment found!" });
        }

        // Ensure only the comment owner can edit
        if (comment.channelId.toString() !== channelId) {
            return res.status(403).json({ message: "You are not authorized to edit this comment!" });
        }

        // Update the comment text
        comment.text = text;
        comment.timestamp = new Date();

        // Save the updated video document
        const updatedVideo = await video.save();
        res.status(200).json({ message: "Comment updated successfully!", updatedComment: comment });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function deleteComment(req, res) {
    const { commentId, channelId, videoId } = req.body;

    if (!videoId || !commentId) {
        return res.status(400).json({ message: "Video ID and Comment ID are required!" });
    }

    try {
        // Find the video
        const video = await Video.findOne({ _id: videoId });

        if (!video) {
            return res.status(404).json({ message: "No video found!" });
        }

        // Find the comment inside the video
        const commentIndex = video.comment.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found!" });
        }

        // Check if the user owns the comment
        if (video.comment[commentIndex].channelId.toString() !== channelId) {
            return res.status(403).json({ message: "Unauthorized to delete this comment!" });
        }

        // Remove the comment from the array
        video.comment.splice(commentIndex, 1);

        // Save the updated video
        await video.save();

        return res.status(200).json({ message: "Comment deleted successfully!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function deleteVideo(req, res) {
    const videoId = req.params.id;

    if (!videoId) {
        return res.status(400).json({ message: "Video id is required!" });
    }

    try {
        const deletedVideo = await Video.deleteOne({ _id: videoId });

        if (!deletedVideo) {
            return res.status(400).json({ message: "Facing problem delete the video!" });
        }

        res.status(200).json({ message: "Video deleted sucessfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function likeDislikeVideo(req, res) {
    const { id } = req.params;
    const { userId, action } = req.body;

    if (!userId || !id) {
        return res.status(400).json({ message: "Video ID and User ID are required!" });
    }

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found!" });
        }

        if (!video.likes) video.likes = [];
        if (!video.dislikes) video.dislikes = [];

        const userObjectId = new mongoose.Types.ObjectId(userId);

        if (action === "like") {
            video.dislikes = video.dislikes.filter(dislike => !dislike.equals(userObjectId)); // ✅ Remove from dislikes
            if (!video.likes.some(like => like.equals(userObjectId))) {
                video.likes.push(userObjectId);
            } else {
                video.likes = video.likes.filter(like => !like.equals(userObjectId)); // ✅ Unlike if already liked
            }
        } else if (action === "dislike") {
            video.likes = video.likes.filter(like => !like.equals(userObjectId)); // ✅ Remove from likes
            if (!video.dislikes.some(dislike => dislike.equals(userObjectId))) {
                video.dislikes.push(userObjectId);
            } else {
                video.dislikes = video.dislikes.filter(dislike => !dislike.equals(userObjectId)); // ✅ Remove dislike if already disliked
            }
        } else {
            return res.status(400).json({ message: "Invalid action! Use 'like' or 'dislike'." });
        }

        await video.save();

        res.status(200).json({
            message: action === "like" ? "Liked successfully!" : "Disliked successfully!",
            likes: video.likes,  // ✅ Send the updated likes array
            dislikes: video.dislikes,  // ✅ Send the updated dislikes array
            likesCount: video.likes.length,
            dislikesCount: video.dislikes.length
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
