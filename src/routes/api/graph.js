import express from "express";
import { header, body, validationResult } from "express-validator";
import { wrapper } from "../../utils/wrapper.js"; // async wrapper
import { GraphService } from "../../services/graph.js";

const graph = new GraphService();
const router = express.Router();

router.post(
    "/liveState",
    header('session.imei').notEmpty(),
    wrapper(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        const getStatusDto = { imei: req.session.data.imei }
        const calDataPerSecond = await graph.sendLiveStatus(getStatusDto);
        return res.json(calDataPerSecond);
    })
)

export { router as graphRouter };
