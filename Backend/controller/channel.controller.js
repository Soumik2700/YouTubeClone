import Channel from "../model/channel.model.js";
import User from "../model/user.model.js";

export async function createChannel(req, res) {
    const { channelName, description, channelBanner, owner } = req.body;

    if (!channelName || !description || !owner) {
        return res.status(400).json({ message: "Channel Name and Description are required!" });
    }

    try {
        const channel = new Channel({
            channelName, description, channelBanner, owner
        })

        const savedChannel = await channel.save();
        const user = await User.findOne({ email: owner });

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

export async function updateProfilePicture(req, res){
    const channelId = req.params.channelId;
    const {channelBanner} = req.body;

    if(!channelBanner){
        return res.status(400).json({message:"Please provide a image url!"});
    }

    try{
        const channel = await Channel.findOne({_id:channelId});

        if(!channel){
            return res.status(404).json({message:"No channel found!"});
        }

        channel.channelBanner = channelBanner;
        const savedChannel = await channel.save()

        if(!savedChannel){
            res.status(400).json({message:"Oops! Channel not saved sucessfully!"})
        }

        res.send(savedChannel.channelBanner);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}