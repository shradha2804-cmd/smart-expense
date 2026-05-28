import User from "../models/UserModel.js";

import Expense from "../models/ExpenseModel.js";

import Income from "../models/IncomeModel.js";

import Notification from "../models/NotificationModel.js";

// ADMIN DASHBOARD
export const getAdminDashboard =
  async (req, res) => {

    try {

      // USERS
      const users =
        await User.find()
          .sort({
            createdAt: -1,
          });

      // EXPENSES
      const expenses =
        await Expense.find();

      // INCOME
      const incomes =
        await Income.find();

      // ================= TOTALS =================

      const totalUsers =
        users.length;

      const totalExpenses =
        expenses.reduce(
          (acc, item) =>
            acc +
            Number(
              item.amount || 0
            ),
          0
        );

      const totalIncome =
        incomes.reduce(
          (acc, item) =>
            acc +
            Number(
              item.amount || 0
            ),
          0
        );

      const totalTransactions =
        expenses.length +
        incomes.length;

      // ================= RECENT USERS =================

      const recentUsers =
        users.slice(0, 5);

      // ================= RECENT TRANSACTIONS =================

      const recentExpenses =
        expenses.map(
          (item) => ({
            title:
              item.title,
            amount:
              item.amount,
            type:
              "expense",
            createdAt:
              item.createdAt,
          })
        );

      const recentIncome =
        incomes.map(
          (item) => ({
            title:
              item.source,
            amount:
              item.amount,
            type:
              "income",
            createdAt:
              item.createdAt,
          })
        );

      const recentTransactions =
        [
          ...recentExpenses,
          ...recentIncome,
        ]
          .sort(
            (a, b) =>
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
          )
          .slice(0, 8);

      // ================= RESPONSE =================

      res.json({

        totalUsers,

        totalIncome,

        totalExpenses,

        totalTransactions,

        recentUsers,

        recentTransactions,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// GET USERS
export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select(
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE USER
export const deleteUser =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res
          .status(404)
          .json({
            message:
              "User not found",
          });

      }

      // PREVENT ADMIN DELETE
      if (
        user.isAdmin
      ) {

        return res
          .status(400)
          .json({
            message:
              "Admin account cannot be deleted",
          });

      }

      // DELETE RELATED DATA
      await Expense.deleteMany({
        user:
          user._id,
      });

      await Income.deleteMany({
        user:
          user._id,
      });

      await Notification.deleteMany({
        user:
          user._id,
      });

      // DELETE USER
      await user.deleteOne();

      res.json({
        message:
          "User deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };