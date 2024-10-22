import express from "express";
import { initialHistory, saveFinalResult } from "../controllers/historyController.js";


const router = express.Router();

router.post("/save", saveFinalResult)
router.get("/:id", initialHistory)

export default router;