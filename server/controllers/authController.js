// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const fs = require('fs'); // For file system operations


dotenv.config();

// Register User
exports.register = async (req, res) => {
  const {  email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT payload
    const payload = { user: { id: user.id } };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Convert user to plain object and remove password field
    user = user.toObject();
    delete user.password;

    // Send the token and user info without the password
    res.json({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get User
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by email
    let user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "No Such User!" });

    user = user.toObject();
    delete user.password;

    // Send the token and user info without the password
    res.json(user);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Server error");
  }
};






// Update User

exports.updateUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from query parameters
  const updates = req.body; // Capture the update data from the request body

  console.log(updates)

  try {
    // Find user by ID
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "No Such User!" });

    // Handle avatar upload if present
    if (req.file) {
      // Remove old avatar if it exists
      if (user.avatar) {
        fs.unlink(user.avatar, (err) => {
          if (err) console.log("Error deleting old avatar:", err);
        });
      }
      
      // Save the new avatar path
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    // Update user properties with the data from the request
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save(); // Save the updated user document

    // Convert user to object and remove the password field
    const userResponse = user.toObject();
    delete userResponse.password;

    // Send the updated user info without the password
    res.json(userResponse);
  } catch (err) {
    console.log("Error:", err); // Improved error logging
    res.status(500).send("Server error");
  }
};