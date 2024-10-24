import express from "express";
import {
    calculResultEachStep,
    getNextQuestion,
    getQuestionById,
    getSkipQuestion,
    saveQuestionData,
    getOverwriteData,
    getArrayPreference
} from "../controllers/questionController.js";


const router = express.Router();

// state
router.post("/save", saveQuestionData);
router.post("/getArrayPreference", getArrayPreference)
router.get("/overwrite", getOverwriteData)

// dynamique
router.get("/skip/:id", getSkipQuestion);
router.post("/result/:step", calculResultEachStep);
router.get("/:id", getQuestionById);
router.post("/:id", getNextQuestion);

export default router;