// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  updateUser,
} = require("../controllers/authController");
const auth = require("../middleware/auth");
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store files in the 'uploads/' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Save file with unique name
  }
});

// Initialize multer
const upload = multer({ storage: storage });

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", upload.single('avatar'), auth, updateUser);
router.get("/preview/:id", getUser);

module.exports = router;
