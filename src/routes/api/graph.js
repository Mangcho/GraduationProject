import express from "express";
import { header, body, validationResult } from "express-validator";
import { wrapper } from "../../utils/wrapper.js"; // async wrapper
import { GraphService } from "../../services/graph.js";

const graphService = new GraphService();
const router = express.Router();

router.post(
    "/liveState",
    wrapper(async (req, res) => {
        // session 감지 불가능
        if(req.session.imei === null){
            return res.json(null);
        } 
        //"73ff34fce1"req.session.imei
        const getStatusDto = { imei: "73ff34fce1" }
        const calDataPerSecond = await graphService.sendLiveStatus(getStatusDto);
        return res.json(calDataPerSecond);
    })
)

router.post(
    "/usage",
    //header('session.imei').notEmpty(), 
    wrapper(async (req, res) => {
        /*
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        */
        if(req.session.imei === null){
            return res.json(null);
        }
        const getUsageDto = { imei: "73ff34fce1" }
        const usagePerDay = await graphService.getUsage(getUsageDto);
        return res.json(usagePerDay);
    })
)

router.post(
    "/original",
    //header('session.imei').notEmpty(), 
    wrapper(async (req, res) => {
        /*
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        */
        if(req.session.imei === null){
            return res.json(null);
        }
        const getOriginalDto = { imei: "73ff34fce1" }
        const usagePerDay = await graphService.getUsage(getOriginalDto);
        return res.json(usagePerDay);
    })
)

export { router as graphRouter };
