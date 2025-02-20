import User from "../model/user.model.js";


export function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const username = firstName + " " + lastName;

    const user = new User({
        username, email, password
    })

    user.save().then((data) => {
        if (!data) res.status(400).json({ message: "Something went wrong!" });

        res.send(data);
    }).catch(err => res.status(500).json({ message: "Internal server error!" }));
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