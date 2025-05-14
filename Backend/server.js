import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dBconnect from './config/DB/ConnectDB.js';
import ConnectCloudinary from './Config/cloudinary.js';
import {
    AuthRouter,
    AdminRouter,
    CategorysRoutes,
    ProductsRoutes,
    AddressRoutes
} from './Routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Import And Call DB function
dBconnect(process.env.MONGO_URI);
// -------------- Import And Call DB function end

// Import And Call Cloudinary function
ConnectCloudinary();
// -------------- Import And Call Cloudinary function end

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true
}));
// -------------- CORS config end

// Basic HTTP Data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------- Basic HTTP Data transfer end

// Cookie parser configuration
app.use(cookieParser());
// -------------- CookieParser end

// Routes
app.use("/api/user", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/products", ProductsRoutes);
app.use("/api/Category", CategorysRoutes);
app.use("/api/Address", AddressRoutes);
// -------------- Routes end

const startServer = async () => {
    try {
        await app.listen(port);
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
