import Expense from "../models/ExpenseModel.js";


// ADD EXPENSE
export const addExpense = async (req, res) => {

  try {

    const {
      title,
      category,
      amount,
      date,
    } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      category,
      amount,
      date,
    });

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET EXPENSES
export const getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE EXPENSE
export const deleteExpense = async (req, res) => {

  try {

    const expense = await Expense.findById(
      req.params.id
    );

    if (!expense) {

      return res.status(404).json({
        message: "Expense not found",
      });

    }

    await expense.deleteOne();

    res.json({
      message: "Expense removed",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};