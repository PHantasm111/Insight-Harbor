import express from "express";
import { initialHistory } from "../controllers/historyController.js";


const router = express.Router();

router.get("/:id", initialHistory)

export default router;