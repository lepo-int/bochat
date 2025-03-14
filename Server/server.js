require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db_connect");
const authRoutes = require("./Routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
