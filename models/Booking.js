const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true,
     },
     phone: {
            type: String,
            required: true,
     },
     email: {
        type: String,
        required: true,

     },
     date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    message: {
        type: String,
    },

      status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},

 {
    timestamps: true,
  }
)

const  Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;