import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields required!" });
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(403).json({message:"User with this email already exists"});
    }

    const username = firstName + " " + lastName;
    const hashedPass = bcrypt.hashSync(password, 10)

    const user = new User({
        username, email, password: hashedPass
    })

    user.save().then((data) => {
        if (!data) res.status(400).json({ message: "Something went wrong!" });

        res.status(201).send(data);
    }).catch(err => res.status(500).json({ message: err.message }));
}

export async function getUsers(req, res) {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ message: "No data found!" });
        }

        res.send(users);
    } catch (err) {
        res.status(500).json({ message: "Internal server error!" });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Both fields are required!" });
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(403).json({ message: "User have not registered, Please register the email" });
        }


        const validPass = bcrypt.compareSync(password, validUser.password);
        if (!validPass) {
            return res.status(403).json({ message: "Invalid password!" });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({ id: validUser._id }, JWT_SECRET, { expiresIn: "10m" })

        res.send({
            username: validUser.username,
            email: validUser.email,
            avatar: validUser.avatar,
            channels: validUser.channels,
            token: token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

