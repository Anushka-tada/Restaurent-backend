const UserModel = require('../models/User');
const Booking = require('../models/Booking');
const Contact = require("../models/Contact");

const  getDashboardStats = async (req , res) => {

  try{

    const totalUser = await UserModel.countDocuments({role: user});

    const totalBooking = await Booking.countDocuments();

    const pendingBooking = await Booking.countDocuments({ status: pending});

    const confirmedBooking = await Booking.countDocuments({ status: confirmed});

const cancelledBooking = await Booking.countDocuments({ status: cancelled});

const contactQueries = await Contact.countDocuments();


res.status(200).json({
    totalUser , totalBooking , pendingBooking , confirmedBooking , cancelledBooking , contactQueries , 
    message :  "dashboard stats fetched successfully",
    statusCode: "200"
}, 
)


  }
  catch(err){
    console.log("getting err in fetching dashboard stats" , err);
      res.status(500).json({ message: "Internal server error" });
  }

}

module.exports = {getDashboardStats}