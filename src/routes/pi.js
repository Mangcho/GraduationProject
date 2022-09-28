const express = require('express');

const wrapper = require('../utils/wrapper'); // async Wrapper


//named export vs default export
const { piDataService } = require('../services/pi');

// WHY????
const pi = new piDataService();

const router = express.Router();

router.all('/pi', wrapper(async (req, res) => {
    pi.SaveData(req.body);
    return res.status(200);
}))

module.exports = router;