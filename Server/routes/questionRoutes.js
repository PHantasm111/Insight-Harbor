import express from "express";
import { getNextQuestion, getQuestionById, getSkipQuestion } from "../controllers/questionController.js";


const router = express.Router();

router.post("/:id", getNextQuestion);
router.get("/skip/:id", getSkipQuestion);
router.get("/:id",getQuestionById);

export default router;