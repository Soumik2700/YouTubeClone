import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");

    // ✅ Handle missing token properly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // ✅ Extract token safely
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user data to request
        next(); // ✅ Move to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
}
