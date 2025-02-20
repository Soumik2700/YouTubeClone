import express from "express";
import mongoose from "mongoose";
import User from "./model/user.model.js";
import { routes } from "./routes/user.routes.js";
import cors from "cors"

mongoose.connect("mongodb+srv://soumiksingha8:wFEisWXwrsA3gYUS@firstbackend.pa25y.mongodb.net/")

const app = new express();
app.use(express.json());
app.use(cors());

const db = mongoose.connection;
db.on("open", () => {
    console.log("connection sucessfull");
})

db.on("error", () => {
    console.log("connection unsucessfull");
})


app.listen(3000, () => {
    console.log("server is running on port 3000!");
})

routes(app);
// insert();