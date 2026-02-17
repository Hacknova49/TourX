import express from "express";
import dotenv from "dotenv";
import touristRoutes from "./routes/touristRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tourist", touristRoutes);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
