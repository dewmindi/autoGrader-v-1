import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_Key);
        req.user = decoded; // Attach user info to request
        
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token. Authentication failed." });
    }
};
