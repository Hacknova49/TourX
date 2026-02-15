import express from "express";
import touristRoutes from "./routes/touristRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/tourists", touristRoutes);

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
