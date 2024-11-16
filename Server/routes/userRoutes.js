import express from "express";
import { getUserStatisticData,UpdateUserData } from "../controllers/userController.js";

const router = express.Router();

router.get("/statistics/:id", getUserStatisticData);
router.patch("/:id", UpdateUserData);

export default router