import Expense from "../models/ExpenseModel.js";

import Income from "../models/IncomeModel.js";

export const getDashboardData = async (
  req,
  res
) => {

  try {

    const expenses = await Expense.find({
      user: req.user._id,
    });

    const incomes = await Income.find({
      user: req.user._id,
    });

    // TOTALS
    const totalExpense = expenses.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

    const totalIncome = incomes.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

    const totalBalance =
      totalIncome - totalExpense;

    // RECENT TRANSACTIONS
    const recentExpenses = expenses.map(
      (item) => ({
        title: item.title,
        amount: item.amount,
        type: "expense",
        createdAt: item.createdAt,
      })
    );

    const recentIncome = incomes.map(
      (item) => ({
        title: item.source,
        amount: item.amount,
        type: "income",
        createdAt: item.createdAt,
      })
    );

    const recentTransactions = [
      ...recentExpenses,
      ...recentIncome,
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

    // PIE CHART DATA
    const categoryMap = {};

    expenses.forEach((item) => {

      if (categoryMap[item.category]) {

        categoryMap[item.category] +=
          Number(item.amount);

      } else {

        categoryMap[item.category] =
          Number(item.amount);

      }

    });

    const pieChartData =
      Object.keys(categoryMap).map(
        (key) => ({
          name: key,
          value: categoryMap[key],
        })
      );

    // BAR CHART DATA
    const monthlyMap = {};

    incomes.forEach((item) => {

      const month = new Date(
        item.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) {

        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };

      }

      monthlyMap[month].income +=
        Number(item.amount);

    });

    expenses.forEach((item) => {

      const month = new Date(
        item.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) {

        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };

      }

      monthlyMap[month].expense +=
        Number(item.amount);

    });

    const barChartData =
      Object.values(monthlyMap);

    // FINAL RESPONSE
    res.json({
      totalBalance,
      totalIncome,
      totalExpense,
      recentTransactions,
      pieChartData,
      barChartData,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};