import { createUser, getUsers } from "../controller/user.controller.js";

export function routes(app) {
    app.post("/api/signup", createUser);
    app.get("/api/signup", getUsers);
}
