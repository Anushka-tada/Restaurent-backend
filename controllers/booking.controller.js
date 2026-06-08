const Booking = require('../models/Booking');

const createBooking = async (req , res) => {
    try{
        const {name , phone , email , date , time , guests , message } = req.body;

        const booking = await Booking.create({
      name,
      phone,
      email,
      date,
      time,
      guests,
      message,
      user: req.user?.id, 
    });

     res.status(201).json({
      message: "Table booked successfully",
      booking,
    });

    }
    catch (err) {
    console.log("Error in booking table", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getBookings = async (req, res) => {
    try {
       const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

      res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings,
      });
    } 

catch (err){
    console.log("Error in getting bookings", err);
    res.status(500).json({ message: "Internal server error" });
}
}

const getSingleBooking = async (req, res) => {
    try {
        const { id } = req.params;  
        const booking = await Booking.findById(id).populate("user", "name email");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        } 
        res.status(200).json({
            message: "Booking retrieved successfully",
            booking,
        });
    }
    catch (err) {
        console.log("Error in getting booking", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;  
        const { status } = req.body;
         const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }       
        res.status(200).json({
            message: "Booking status updated successfully",
            booking,
        });
    }
    catch (err) {

        console.log("Error in updating booking status", err);
        res.status(500).json({ message: "Internal server error" });
    }

}

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;  
        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        } 
        res.status(200).json({
            message: "Booking deleted successfully",
        });
    }
    catch (err) {
        console.log("Error in deleting booking", err);
        res.status(500).json({ message: "Internal server error" });
    }

}



module.exports = { createBooking , getBookings , getSingleBooking , updateBookingStatus , deleteBooking };