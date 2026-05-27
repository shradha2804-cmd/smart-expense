import Income from "../models/IncomeModel.js";

import Notification from "../models/NotificationModel.js";


// ADD INCOME
export const addIncome =
  async (req, res) => {

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

        return res
          .status(400)
          .json({
            message:
              "Please fill all fields",
          });

      }

      // CREATE INCOME
      const income =
        await Income.create({

          user:
            req.user._id,

          source,

          category,

          amount,

          date,

        });

      // CREATE NOTIFICATION
      await Notification.create({

        user:
          req.user._id,

        title:
          "Income Added",

        message:
          `New income added: ₹${amount} from ${source}`,

        sender:
          "system",

      });

      res.status(201).json(
        income
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// GET INCOMES
export const getIncomes =
  async (req, res) => {

    try {

      const incomes =
        await Income.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        incomes
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// DELETE INCOME
export const deleteIncome =
  async (req, res) => {

    try {

      const income =
        await Income.findById(
          req.params.id
        );

      if (!income) {

        return res
          .status(404)
          .json({
            message:
              "Income not found",
          });

      }

      await income.deleteOne();

      res.json({
        message:
          "Income deleted",
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          error.message,
      });

    }

  };