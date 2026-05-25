import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const pieData = [
  { name: "Food", value: 400 },
  { name: "Bills", value: 300 },
  { name: "Travel", value: 300 },
  { name: "Shopping", value: 200 },
];

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#F59E0B",
];

const barData = [
  {
    month: "Jan",
    income: 50000,
    expense: 20000,
  },

  {
    month: "Feb",
    income: 42000,
    expense: 18000,
  },

  {
    month: "Mar",
    income: 60000,
    expense: 25000,
  },

  {
    month: "Apr",
    income: 55000,
    expense: 23000,
  },

  {
    month: "May",
    income: 70000,
    expense: 30000,
  },
];

const AnalyticsCharts = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-6">

      {/* PIE CHART */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#0B132B]">
            Expense Categories
          </h2>

        </div>

        <div className="mt-8 h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* BAR CHART */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#0B132B]">
            Monthly Overview
          </h2>

        </div>

        <div className="mt-8 h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="income"
                fill="#16A34A"
                radius={[10, 10, 0, 0]}
              />

              <Bar
                dataKey="expense"
                fill="#DC2626"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default AnalyticsCharts;