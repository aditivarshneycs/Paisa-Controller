const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalBalance: { type: Number, required: true },
  monthlyBudget: { type: Number, required: true },
  savingsGoal: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
