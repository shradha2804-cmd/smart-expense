import React, {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../../utils/api";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#F59E0B",
  "#9333EA",
];

const Analytics = () => {

  const [loading,
    setLoading] =
    useState(true);

  const [pieChartData,
    setPieChartData] =
    useState([]);

  const [barChartData,
    setBarChartData] =
    useState([]);

  const [summary,
    setSummary] =
    useState({
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    });

  // FETCH ANALYTICS
  const fetchAnalytics =
    async () => {

      try {

        const { data } =
          await API.get(
            "/dashboard"
          );

        setPieChartData(
          data.pieChartData || []
        );

        setBarChartData(
          data.barChartData || []
        );

        setSummary({
          totalIncome:
            data.totalIncome || 0,

          totalExpense:
            data.totalExpense || 0,

          balance:
            data.totalBalance || 0,
        });

      } catch (error) {

        toast.error(
          "Failed to load analytics"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  if (loading) {

    return (
      <div className="text-center py-20 text-xl font-bold text-[#0B132B]">

        Loading...

      </div>
    );

  }

  return (

    <section>

      {/* TOP */}
      <div>

        <h1 className="text-2xl md:text-4xl font-bold text-[#0B132B] break-words">

          Analytics

        </h1>

        <p className="mt-2 text-gray-500">

          Financial insights and reports

        </p>

      </div>

      {/* SUMMARY */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

        {/* INCOME */}
        <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

          <p className="text-gray-500">

            Total Income

          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600 break-words">

            ₹{summary.totalIncome}

          </h2>

        </div>

        {/* EXPENSE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

          <p className="text-gray-500">

            Total Expenses

          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-500 break-words">

            ₹{summary.totalExpense}

          </h2>

        </div>

        {/* BALANCE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

          <p className="text-gray-500">

            Current Balance

          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600 break-words">

            ₹{summary.balance}

          </h2>

        </div>

      </div>

      {/* CHARTS */}
      <div className="grid xl:grid-cols-2 gap-6 mt-8">

        {/* PIE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

          <h2 className="text-2xl font-bold text-[#0B132B]">

            Expense Categories

          </h2>

          <div className="mt-6 h-[350px] w-full overflow-hidden">

            {
              pieChartData.length === 0 ? (

                <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">

                  No expense data found

                </div>

              ) : (

                <ResponsiveContainer>

                  <PieChart>

                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      outerRadius={120}
                      label
                    >

                      {
                        pieChartData.map(
                          (
                            entry,
                            index
                          ) => (

                            <Cell
                              key={
                                index
                              }
                              fill={
                                COLORS[
                                  index %
                                  COLORS.length
                                ]
                              }
                            />

                          )
                        )
                      }

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              )
            }

          </div>

        </div>

        {/* BAR */}
        <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

          <h2 className="text-2xl font-bold text-[#0B132B]">

            Monthly Overview

          </h2>

          <div className="mt-6 h-[350px] w-full overflow-x-auto">

            {
              barChartData.length === 0 ? (

                <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">

                  No monthly data found

                </div>

              ) : (

                <ResponsiveContainer>

                  <BarChart
                    data={barChartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 0,
                    }}
                  >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="income"
                      fill="#16A34A"
                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}
                    />

                    <Bar
                      dataKey="expense"
                      fill="#DC2626"
                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              )
            }

          </div>

        </div>

      </div>

    </section>

  );

};

export default Analytics;