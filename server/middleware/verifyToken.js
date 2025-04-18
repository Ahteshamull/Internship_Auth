import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({    
            success: false,
            message: "Unauthorized: No token provided",
        });
    }
    try {
        if(!decoded) return res.status(401).json({success: false, message: "Unauthorized: Invalid token"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
       return res.status(500).json({success: false, message: "Internal server error"});
    }
    }