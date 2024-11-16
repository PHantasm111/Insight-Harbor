import express from "express";
import { initialHistory, saveFinalResult, deleteHistoryById, getRecordById, updateStatuts } from "../controllers/historyController.js";


const router = express.Router();

router.post("/save", saveFinalResult)
router.patch("/record/:id", updateStatuts)

router.get("/:uid", initialHistory)
router.get("/record/:id", getRecordById)
router.delete("/:idR", deleteHistoryById)

export default router;