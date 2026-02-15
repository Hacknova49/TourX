import express from "express";
import { registerTourist, getTourist } from "../controllers/touristController.js";

const router = express.Router();

router.post("/register", registerTourist);
router.get("/:walletAddress", getTourist);

export default router;
