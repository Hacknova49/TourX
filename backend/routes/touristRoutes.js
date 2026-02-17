import express from "express";
import multer from "multer";
import { registerTourist } from "../controllers/touristController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/register",
  upload.fields([
    { name: "kyc", maxCount: 1 },
    { name: "itinerary", maxCount: 1 }
  ]),
  registerTourist
);

export default router;
