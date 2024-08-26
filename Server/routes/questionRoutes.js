import express from "express";
import { getQuestion } from "../controllers/questionController.js";


const router = express.Router();

router.post("/:id", getQuestion);


export default router;