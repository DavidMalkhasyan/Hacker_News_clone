const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes.js");
const userRoutes = require("./routes/authRoutes.js");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackernews')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const app = express();
app.use(express.json()); 

app.use("/posts", postRoutes);
app.use("/auth", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});