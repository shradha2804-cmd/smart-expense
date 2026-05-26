import Income from "../models/IncomeModel.js";


// ADD INCOME
export const addIncome = async (req, res) => {

  try {

    const {
      source,
      category,
      amount,
      date,
    } = req.body;

    const income = await Income.create({
      user: req.user._id,
      source,
      category,
      amount,
      date,
    });

    res.status(201).json(income);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET INCOMES
export const getIncomes = async (req, res) => {

  try {

    const incomes = await Income.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(incomes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE INCOME
export const deleteIncome = async (req, res) => {

  try {

    const income = await Income.findById(
      req.params.id
    );

    if (!income) {

      return res.status(404).json({
        message: "Income not found",
      });

    }

    await income.deleteOne();

    res.json({
      message: "Income deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};