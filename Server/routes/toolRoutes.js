import express from "express";
import { getTools, searchTool, getInitialData } from "../controllers/toolController.js";


const router = express.Router();

// Initialize the content of sidebar 
router.get("/initializtion", getInitialData)
router.get("/getTools", getTools);

// search the tool by id
router.get("/:id", searchTool);

export default router;