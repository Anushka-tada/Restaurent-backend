const express = require('express');
const authMidleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
const {getDashboardStats} = require("../controllers/dashboardStats")


const router = express.Router();

router.get("/stats" , authMidleware , roleMiddleware , getDashboardStats );

module.exports = router;