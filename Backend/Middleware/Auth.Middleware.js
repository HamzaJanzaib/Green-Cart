import { UserModel } from '../models/Index.js';
import { verifyToken } from '../Utils/Index.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }
    try {
        const decoded = await verifyToken(token);
        req.user = { id: decoded.id };
        req.token = token;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }
};

export const IsAdmin = async (req, res, next) => {
    const token = req.cookies.AdminToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    try {
        const decoded = await verifyToken(token);

        // Find the user by ID
        const user = await UserModel.findById(decoded.id).select('-password');

        // Check if the user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Admin access only'
            });
        }

        // Attach the admin data to the request object for use in the next middleware
        req.admin = { id: user._id, role: user.role };
        req.token = token;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }
};
