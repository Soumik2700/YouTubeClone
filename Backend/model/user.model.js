import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: "https://example.com/default-avatar.png" },
        channels: [{ type: String }] // User's subscribed channels
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;