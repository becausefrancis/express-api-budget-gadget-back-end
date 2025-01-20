const express = require('express');
const Expense = require('../models/expense');  
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');

router.use(verifyToken);

router.post("/", async (req, res) => {
  const { date, dayOfWeek, budget, expenses } = req.body;
  const newExpense = new Expense({ date, dayOfWeek, budget, expenses });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { date, dayOfWeek, budget, expenses } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { date, dayOfWeek, budget, expenses },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/:expenseId/comments', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    expense.comments.push(req.body);
    await expense.save();
    const newComment = expense.comments[expense.comments.length - 1];
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  };
});

module.exports = router;