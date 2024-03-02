
const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/controller_auth');
const verifyToken = require('../middleware/middleware.auth');

router.post('/signin',verifyToken, controllerAuth.signin);



module.exports = router;