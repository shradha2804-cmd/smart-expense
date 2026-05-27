import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#7C3AED",
  "#16A34A",
  "#DC2626",
  "#2563EB",
];

const data = [
  {
    name: "Users",
    value: 120,
  },

  {
    name: "Income",
    value: 500,
  },

  {
    name: "Expenses",
    value: 320,
  },
];

const monthly = [
  {
    month: "Jan",
    income: 400,
    expense: 240,
  },

  {
    month: "Feb",
    income: 300,
    expense: 180,
  },

  {
    month: "Mar",
    income: 500,
    expense: 260,
  },

  {
    month: "Apr",
    income: 700,
    expense: 390,
  },
];

const AdminAnalytics =
  () => {

    return (
      <section>

        {/* TOP */}
        <div>

          <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065]">

            Analytics

          </h1>

          <p className="mt-2 text-gray-500">

            Platform analytics overview

          </p>

        </div>

        {/* CHARTS */}
        <div className="grid xl:grid-cols-2 gap-6 mt-8">

          {/* PIE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#2E1065]">

              Platform Overview

            </h2>

            <div className="mt-6 h-[350px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={data}
                    dataKey="value"
                    outerRadius={120}
                    label
                  >

                    {
                      data.map(
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

            </div>

          </div>

          {/* BAR */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#2E1065]">

              Monthly Analytics

            </h2>

            <div className="mt-6 h-[350px]">

              <ResponsiveContainer>

                <BarChart
                  data={monthly}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

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

            </div>

          </div>

        </div>

      </section>
    );

  };

export default AdminAnalytics;