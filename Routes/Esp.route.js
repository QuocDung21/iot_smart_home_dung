const express = require('express');
const router = express.Router();
const Esp = require('../Controllers/Esp.Controller');

router.post('/', Esp.createEsp);




module.exports = router;
