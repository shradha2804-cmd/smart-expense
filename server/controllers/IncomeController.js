import Income from "../models/IncomeModel.js";

import User from "../models/UserModel.js";


// ADD INCOME
export const addIncome = async (
  req,
  res
) => {

  try {

    const {
  source,
  category,
  amount,
  date,
} = req.body;

    // VALIDATION
    if (
  !source ||
  !category ||
  !amount ||
  !date
) {

      return res.status(400).json({
        message:
          "Please fill all fields",
      });

    }

    // CREATE INCOME
   const income =
  await Income.create({
    user: req.user._id,
    source,
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
        `Income added: ₹${amount} from ${source}`,
      read: false,
    });

    await user.save();

    res.status(201).json(
      income
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET INCOME
export const getIncome = async (
  req,
  res
) => {

  try {

    const income =
      await Income.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(income);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE INCOME
export const deleteIncome = async (
  req,
  res
) => {

  try {

    const income =
      await Income.findById(
        req.params.id
      );

    if (!income) {

      return res.status(404).json({
        message:
          "Income not found",
      });

    }

    // SECURITY CHECK
    if (
      income.user.toString() !==
      req.user._id.toString()
    ) {

      return res.status(401).json({
        message:
          "Not authorized",
      });

    }

    await income.deleteOne();

    res.json({
      message:
        "Income deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};