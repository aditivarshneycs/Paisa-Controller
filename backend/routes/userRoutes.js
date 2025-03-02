const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, totalBalance, monthlyBudget, savingsGoal } = req.body;
    const newUser = new User({ name, email, totalBalance, monthlyBudget, savingsGoal });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
