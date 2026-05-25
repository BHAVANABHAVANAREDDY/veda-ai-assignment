const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("VedaAI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});