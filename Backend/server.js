import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/user.routes.js";

dotenv.config(); // ✅ Load .env variables at the beginning

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use the .env variables correctly
const mongoURI = `mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASSWORD}@firstbackend.pa25y.mongodb.net/`;

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("open", () => console.log("✅ Connection successful"));
db.on("error", (err) => console.log("❌ Connection unsuccessful", err));

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000!");
});

routes(app);
