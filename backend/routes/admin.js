const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Crear usuario (admin)
router.post('/create-user', adminController.createUser);

// Subir imagen asociada a un usuario (admin)
router.post('/upload-image', adminController.uploadImage);

module.exports = router;
