const express = require('express');
const router = express.Router();

const Home = require('../Controllers/Home.Controller');

router.get('/', Home.getDataHome);

router.post('/', Home.updateDataHome)

module.exports = router;
