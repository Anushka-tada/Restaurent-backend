const Booking = require("../models/Booking");

const myBookings = async (req , res) => {
    try {
        const userId = req.user?.id;
        const bookings = await Booking.find({user: userId}).sort({ createdAt: -1 });

        res.status(200).json({
            message: "My bookings retrieved successfully",
            bookings,
        }); 

    }
    catch (err) {
        console.log("Error in my bookings", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    myBookings,
}