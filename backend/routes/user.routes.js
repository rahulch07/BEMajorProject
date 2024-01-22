// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const historyController = require('../controllers/history.controller')

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/history', historyController.history);

module.exports = router;
