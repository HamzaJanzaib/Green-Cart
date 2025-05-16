import { UserModel } from "../models/Index.js";
import { hashedPassword, comparePassword, createToken } from "../Utils/Index.js";

// Controller For User Register
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hash = await hashedPassword(password);

        const newUser = await UserModel.create({
            fullname,
            email,
            password: hash,
        });

        const token = await createToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: {
                email: newUser.email,
                name: newUser.fullname
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//------------------- Controller For User Register end

// Controller For User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = await createToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//-------------------- Controller For User Login end

// Controller For User Logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//----------------- Controller For User Logout end

// Controller For User VerifyUser
export const verifiedUser = async (req, res) => {
    try {
        const id = req.user?.id;

        if (!id) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = await UserModel.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//---------------- Controller For User VerifyUser end

// Controller For Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Email and password are required"
            });
        }

        // Find Admin by email
        const Admin = await UserModel.findOne({ email });

        if (!Admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check if the Admin is an admin
        if (Admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin access only"
            });
        }

        // Check if password is correct
        const isPasswordValid = await comparePassword(password, Admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create a token for the admin Admin
        const token = await createToken(Admin);

        // Send response with token and Admin data
        res.cookie('AdminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week expiration
        });

        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
            Admin: {
                id: Admin._id,
                fullname: Admin.fullname,
                email: Admin.email,
                role: Admin.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
};
//-------------------- Controller For Admin Login end

// Controller For Admin Logout
export const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('AdminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//------------------- Controller For Admin Logout end

// Controller For Admin verifiedAdmin
export const verifiedAdmin = async (req, res) => {
    try {
        // Retrieve the admin id from the request object
        const id = req.admin?.id;

        // If no admin ID is found, return an error response
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // Find the admin by their ID, excluding the password field
        const admin = await UserModel.findById(id).select("-password");

        // If no admin is found, return an error response
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // If the user is not an admin, return a forbidden response
        if (admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Only admins can access this resource"
            });
        }

        // Successfully return the admin details
        return res.status(200).json({
            success: true,
            message: "Admin verified successfully",
            data: admin
        });
    } catch (error) {
        // Handle any unexpected errors and log them for debugging
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
//---------------- Controller For Admin verifiedAdmin end


export const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID missing from token",
            });
        }

        const user = await UserModel.findById(userId)
            .select("-password")


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error in getProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



