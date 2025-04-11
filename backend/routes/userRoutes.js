const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:dni/images', userController.getUserImages);

module.exports = router;