import express from "express";
import wrapper from "../utils/wrapper.js"; // async wrapper
import piDataService from "../services/pi.js";

const pi = new piDataService();

const router = express.Router();

router.post('', wrapper(async (req, res) => {
    const insertPiSensorDto = { imei: req.body.imei, timestamp: req.body.timestamp, raw: req.body.raw }
    const state = pi.SaveData(insertPiSensorDto);
    return res.json({ state: state })
}))

export default router
