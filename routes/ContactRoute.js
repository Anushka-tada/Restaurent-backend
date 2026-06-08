const express = require('express');
const authMidleware = require("../middleware/auth.middleware")
const roleMiddleware = require("../middleware/role.middleware")
const { createContact , getContact , getSingleContact , deleteContact} = require('../controllers/contact.controller');

const router = express.Router();

router.post('/create' , createContact);
router.get('/all' , authMidleware , roleMiddleware, getContact);
router.get('/:id' , authMidleware , roleMiddleware , getSingleContact);
router.delete('/:id' , authMidleware , roleMiddleware , deleteContact);

module.exports = router;