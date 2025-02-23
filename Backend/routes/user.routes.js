import { createUser, getUsers, loginUser, } from "../controller/user.controller.js";
import { verifyToken } from "../middlewares/mid.varifyToken.js";
import { createChannel } from "../controller/channel.controller.js";

export function routes(app) {
    app.post("/api/signup", createUser);
    app.get("/api/signup", getUsers);
    app.post("/api/login", loginUser);
    app.get("/user/verify", verifyToken, (req, res)=>{
        res.json({message:"Access Granted!"});
    });
    app.post("/user/createchannel", createChannel);
}
