import express from "express";
import cors from 'cors';
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/comentsRoutes.js";
import connectDB from "./config/db.js";
import envConfig from "./config/env.js";

envConfig();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use("/posts", postRoutes);
app.use("/auth", userRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});