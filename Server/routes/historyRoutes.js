import express from "express";
import { initialHistory, saveFinalResult, deleteHistoryById } from "../controllers/historyController.js";


const router = express.Router();

router.post("/save", saveFinalResult)

router.get("/:uid", initialHistory)
router.delete("/:idR", deleteHistoryById)

export default router;