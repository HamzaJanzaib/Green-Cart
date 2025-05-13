const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Import And Call DB function
const dBconnect = require('./config/DB/ConnectDB');
dBconnect(process.env.MONGO_URI);
// -------------- Import And Call DB function end

// import and cors config
const cors = require('cors');
app.use(cors(
    {
        origin: "http://localhost:5173", methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ], allowedHeaders: [
            "Content-Type",
            "Authorization",
            "cache-Control",
            "Expires",
            "pragma"
        ],
        credentials: true
    }
));
// -------------- import and cors config end

// Basic For Http Data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------- Basic For Http Data transfer end

// import CookieParser For Sending Cookie For Client Browser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// -------------- import CookieParser For Sending Cookie For Client Browser end

// imports routes and use
const {
     AuthRouter,
    AdminRouter } = require('./Routes/index');
app.use("/api/auth/user", AuthRouter);
app.use("/api/auth/admin", AdminRouter);
// -------------- imports routes and use end

const startServer = async () => {
    try {
        await app.listen(port);
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();



// first Api Register ? http://localhost:8080/api/auth/user/register Post Api
// first Api Login ? http://localhost:8080/api/auth/user/Login Post Api
// first Api Logout ? http://localhost:8080/api/auth/user/Logout get Api
// first Api checkauth uservalid or not ? http://localhost:8080/api/auth/user/check-auth get Api


// first Api Admin-login ? http://localhost:8080/api/auth/admin/login Post Api
// first Api logoutAdmin ? http://localhost:8080/api/auth/admin/logout get Api