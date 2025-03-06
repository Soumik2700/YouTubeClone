import mongoose from "mongoose";
import Channel from "../model/channel.model.js";
import User from "../model/user.model.js";
import Video from "../model/video.model.js";

export async function createChannel(req, res) {
    const { channelName, description, channelBanner, owner } = req.body;

    if (!channelName || !description || !owner) {
        return res.status(400).json({ message: "Channel Name and Description are required!" });
    }

    try {
        const user = await User.findOne({ email: owner });
        if (user.channels.length > 0) {
            return res.status(403).json({ message: "Channel already exists!" });
        }

        const channel = new Channel({
            channelName, description, channelBanner, owner
        })

        const savedChannel = await channel.save();


        if (!user) {
            return res.status(404).json({ message: "No user found!" });
        }

        user.channels.push(savedChannel._id);
        await user.save();

        res.status(201).json({
            message: "Channel created sucessfully!",
            channel: savedChannel,
            user: user
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getChannelInfo(req, res) {
    const channelId = req.params.id;

    if (!channelId) {
        return res.status(400).json({ message: "No channel id provided!" });
    }

    try {
        const channel = await Channel.findOne({ _id: channelId });
        if (!channel) {
            return res.status(404).json({ message: "No channel found!" });
        }

        res.status(200).send(channel);
    } catch (err) {
        res.status(200).json({ message: err.message });
    }
}

export async function updateProfilePicture(req, res) {
    const channelId = req.params.channelId;
    const { channelBanner } = req.body;

    if (!channelBanner) {
        return res.status(400).json({ message: "Please provide a image url!" });
    }

    try {
        const channel = await Channel.findOne({ _id: channelId });

        if (!channel) {
            return res.status(404).json({ message: "No channel found!" });
        }

        channel.channelBanner = channelBanner;
        const savedChannel = await channel.save()

        if (!savedChannel) {
            res.status(400).json({ message: "Oops! Channel not saved sucessfully!" })
        }

        res.send(savedChannel.channelBanner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getChannelBanner(req, res) {
    const channelId = req.params.id;

    if (!channelId) {
        return res.status(400).json({ message: "ChannelId is required!" });
    }

    try {
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ message: "No channel found!" });
        }

        res.status(200).json({ channelBanner: channel.channelBanner });  // ✅ Return JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function checkSubscriptionStatus(req, res) {
    const channelId = req.params.id;
    const { userId } = req.query;  // Correct way to get userId in GET requests

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID!" });
    }

    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found!" });
        }

        const isSubscribed = channel.subscriber.some(sub => sub.equals(new mongoose.Types.ObjectId(userId)));
        res.status(200).json({ subscribed: isSubscribed });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


export async function updateSubscriber(req, res) {
    const channelId = req.params.id;
    const { userId } = req.body;

    if (!userId || !channelId) {
        return res.status(400).json({ message: "Channel ID and User ID are required!" });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID!" });
        }

        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: "No channel found!" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const isSubscribed = channel.subscriber.some(sub => sub.equals(userObjectId));

        if (!isSubscribed) {
            channel.subscriber.push(userObjectId);
        } else {
            channel.subscriber = channel.subscriber.filter(sub => !sub.equals(userObjectId));
        }

        await channel.save();

        return res.status(200).json({
            message: isSubscribed ? "Unsubscribed successfully!" : "Subscribed successfully!",
            subscribed: !isSubscribed,
            subscriberCount: channel.subscriber.length
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



