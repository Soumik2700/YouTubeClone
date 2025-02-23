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
        const user = await User.findOne({email:owner});

        if(!user){
            return res.status(404).json({message: "No user found!"});
        }

        user.channels.push(savedChannel._id);
        await user.save();

        res.status(201).json({
            message: "Channel created sucessfully!",
            channel: savedChannel,
            user:user
        });
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}