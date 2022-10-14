const express = require('express');

const wrapper = require('../utils/wrapper'); // async Wrapper

const { piDataService } = require('../services/pi');
const pi = new piDataService();

const router = express.Router();


router.post('', wrapper(async (req, res) => {
    const insertPiSensorDto = {imei: req.body.imei, timestamp:req.body.timestamp, raw: req.body.raw}
    const state = pi.SaveData(insertPiSensorDto);
    return res.json({ state: state })
}))

module.exports = router;

