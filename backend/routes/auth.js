const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint para login con DNI
router.post('/login', authController.login);

module.exports = router;
