const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a transaction
router.post("/", async (req, res) => {
  const { amount, category, type, date } = req.body;
  try {
    const newTransaction = new Transaction({ amount, category, type, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction" });
  }
});

module.exports = router;
