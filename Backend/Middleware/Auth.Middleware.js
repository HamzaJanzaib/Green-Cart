const { verifyToken } = require("../Utils/Index");

module.exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided"
        });
    }

    try {
        const decoded = await verifyToken(token);
        console.log(decoded);
        req.user = { id: decoded.id };
        req.token = token;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        });
    }
};
