const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes = require("../routes/authroute");
const bookingRoutes = require("../routes/BookingRoute");
const contactRoutes = require("../routes/ContactRoute");
const statsRoute = require("../routes/dashboard.routes");

const app = express();

// 1. CORS sabse pehle
app.use(cors({
    origin: ["http://localhost:3000", "https://delish-six.vercel.app"],
    credentials: true
}));

// 2. Phir parsers
app.use(express.json());
app.use(cookieParser());

// 3. Phir routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', statsRoute);

app.get('/', (req, res) => {
    res.send("Welcome to the restaurant backend API");
});

module.exports = app;