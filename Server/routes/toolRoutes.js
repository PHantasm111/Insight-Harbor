import express from "express";
import { getTools } from "../controllers/toolController.js";


const router = express.Router();

router.get("/getTools", getTools);

export default router;