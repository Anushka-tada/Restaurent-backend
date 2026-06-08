const express = require('express');
const {createBooking , getBookings , getSingleBooking , updateBookingStatus , deleteBooking} = require('../controllers/booking.controller');
const {myBookings} = require('../controllers/myBookings.controller');
const authMidleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")

const router = express.Router();

router.post('/create' , authMidleware , createBooking);
router.get('/all' , authMidleware , roleMiddleware("admin"), getBookings);
router.get('/my-bookings' , authMidleware ,  myBookings);
router.get('/:id' , authMidleware , getSingleBooking);
router.put('/:id/status' , authMidleware , roleMiddleware("admin"), updateBookingStatus);
router.delete('/:id' , authMidleware , roleMiddleware("admin"), deleteBooking);

module.exports = router;