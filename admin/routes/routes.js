const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/customer', authController.registerCustomer);
router.post('/register/admin', authController.registerAdmin);
router.post('/login/admin', authController.loginAdmin);

module.exports = router;