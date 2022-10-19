import express from "express";
import { body, validationResult } from "express-validator";
import { wrapper } from "../../utils/wrapper.js"; // async wrapper
import { GraphService } from "../../services/graph.js";

const graph = new GraphService();
const router = express.Router();

export { router as graphRouter };
