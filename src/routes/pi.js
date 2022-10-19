import express from "express";
import { wrapper } from "../utils/wrapper.js"; // async wrapper
import { piDataService } from "../services/pi.js";
import { body, validationResult } from "express-validator";

const pi = new piDataService();
const router = express.Router();

router.post(
  "",
  body("imei").notEmpty().isAlphanumeric(),
  body("raw").notEmpty(),
  body("result").notEmpty(),
  body("createdAt").notEmpty(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const insertPiSensorDto = {
      imei: req.body.imei,
      raw: req.body.raw,
      result: req.body.result,
      createdAt: req.body.createdAt,
    };
    const state = await pi.SaveData(insertPiSensorDto);
    //console.log(state);
    return res.json({ state });
  })
);

export { router as piRouter };
