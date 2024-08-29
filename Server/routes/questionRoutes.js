import express from "express";
import { getQuestion, getSkipQuestion } from "../controllers/questionController.js";


const router = express.Router();

router.post("/:id", getQuestion);
router.get("/skip/:id", getSkipQuestion);


export default router;