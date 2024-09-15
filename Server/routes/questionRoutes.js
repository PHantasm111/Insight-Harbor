import express from "express";
import { calculResultEachStep, getNextQuestion, getQuestionById, getSkipQuestion, saveQuestionData } from "../controllers/questionController.js";


const router = express.Router();

// state
router.post("/save", saveQuestionData);

// dynamique
router.get("/skip/:id", getSkipQuestion);
router.get("/:id", getQuestionById);
router.post("/:id", getNextQuestion);
router.post("/result/:step", calculResultEachStep);


export default router;