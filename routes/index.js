const express = require('express');
const router = express.Router();

// Define the base URL for all routes
router.use('/api', require('./api'));

module.exports = router;
