import Expense from "../models/ExpenseModel.js";

import Income from "../models/IncomeModel.js";

export const getDashboardData =
  async (req, res) => {

    try {

      // FETCH DATA
      const expenses =
        await Expense.find({
          user: req.user._id,
        });

      const incomes =
        await Income.find({
          user: req.user._id,
        });

      // ================= TOTALS =================

      const totalExpense =
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

      const totalBalance =
        totalIncome -
        totalExpense;

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
          .slice(0, 5);

      // ================= PIE CHART =================

      const categoryMap =
        {};

      expenses.forEach(
        (item) => {

          const category =
            item.category ||
            "Other";

          if (
            categoryMap[
              category
            ]
          ) {

            categoryMap[
              category
            ] += Number(
              item.amount || 0
            );

          } else {

            categoryMap[
              category
            ] = Number(
              item.amount || 0
            );

          }

        }
      );

      const pieChartData =
        Object.keys(
          categoryMap
        ).map((key) => ({
          name: key,
          value:
            categoryMap[
              key
            ],
        }));

      // ================= BAR CHART =================

      const monthlyMap =
        {};

      // HELPER
      const addMonthlyData =
        (
          items,
          type
        ) => {

          items.forEach(
            (item) => {

              const date =
                new Date(
                  item.date
                );

              const month =
                date.toLocaleString(
                  "default",
                  {
                    month:
                      "short",
                  }
                );

              if (
                !monthlyMap[
                  month
                ]
              ) {

                monthlyMap[
                  month
                ] = {
                  month,
                  income: 0,
                  expense: 0,
                  sortDate:
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      1
                    ),
                };

              }

              monthlyMap[
                month
              ][type] +=
                Number(
                  item.amount || 0
                );

            }
          );

        };

      addMonthlyData(
        incomes,
        "income"
      );

      addMonthlyData(
        expenses,
        "expense"
      );

      const barChartData =
        Object.values(
          monthlyMap
        )
          .sort(
            (a, b) =>
              a.sortDate -
              b.sortDate
          )
          .map(
            ({
              sortDate,
              ...rest
            }) => rest
          );

      // ================= RESPONSE =================

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
        message:
          error.message,
      });

    }

  };