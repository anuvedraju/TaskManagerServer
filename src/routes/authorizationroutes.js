const express = require('express');
const { signup, login, refreshToken, changeUserProfileDetails } = require('../controllers/authorizationcontrollers');
const authenticateToken = require('../middlewares/authmiddleware');
const router = express.Router();

// Define routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/updateuserprofiledetails',authenticateToken, changeUserProfileDetails);

module.exports = router;
