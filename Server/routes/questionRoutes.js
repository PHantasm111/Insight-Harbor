import express from "express";
import { calculResultEachStep, getNextQuestion, getQuestionById, getSkipQuestion } from "../controllers/questionController.js";


const router = express.Router();

router.post("/:id", getNextQuestion);
router.get("/skip/:id", getSkipQuestion);
router.get("/:id",getQuestionById);
router.post("/result/:step", calculResultEachStep)

export default router;