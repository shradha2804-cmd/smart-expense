import Expense from "../models/ExpenseModel.js";

import User from "../models/UserModel.js";


// ADD EXPENSE
export const addExpense = async (
  req,
  res
) => {

  try {

    const {
      title,
      category,
      amount,
      date,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !category ||
      !amount ||
      !date
    ) {

      return res.status(400).json({
        message:
          "Please fill all fields",
      });

    }

    // CREATE EXPENSE
    const expense =
      await Expense.create({
        user: req.user._id,
        title,
        category,
        amount,
        date,
      });

    // NOTIFICATION
    const user =
      await User.findById(
        req.user._id
      );

    user.notifications.unshift({
      message:
        `Expense added: ₹${amount} for ${title}`,
      read: false,
    });

    await user.save();

    res.status(201).json(
      expense
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET EXPENSES
export const getExpenses = async (
  req,
  res
) => {

  try {

    const expenses =
      await Expense.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE EXPENSE
export const deleteExpense = async (
  req,
  res
) => {

  try {

    const expense =
      await Expense.findById(
        req.params.id
      );

    if (!expense) {

      return res.status(404).json({
        message:
          "Expense not found",
      });

    }

    // SECURITY CHECK
    if (
      expense.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message:
          "Not authorized",
      });

    }

    await expense.deleteOne();

    res.json({
      message:
        "Expense deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};