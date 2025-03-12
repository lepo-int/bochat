const express = require("express");
const { signup, login, getProfile } = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
