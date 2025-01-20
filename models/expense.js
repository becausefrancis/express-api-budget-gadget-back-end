const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
});

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  dayOfWeek: { type: String, required: true },
  budget: { type: Number, required: true },
  expenses: {
    type: [
      {
        name: String,
        amount: Number,
      },
    ],
    required: true,
  },
  comments: [commentSchema]
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;