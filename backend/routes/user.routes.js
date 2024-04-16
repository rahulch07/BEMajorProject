// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const historyController = require('../controllers/history.controller');
const { historyStore } = require('../controllers/historyStore.controller');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/history', historyController.history);
router.post('/historyStore', historyStore)

module.exports = router;
