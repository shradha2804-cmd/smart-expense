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

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#F59E0B",
  "#9333EA",
];

const AnalyticsCharts = ({
  pieChartData = [],
  barChartData = [],
}) => {

  return (
    <div className="grid xl:grid-cols-2 gap-6">

      {/* PIE CHART */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold text-[#0B132B]">

          Expense Categories

        </h2>

        <div className="mt-8">

          {pieChartData.length === 0 ? (

            <div className="h-[350px] flex items-center justify-center text-gray-500">

              No expense data found

            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {pieChartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

      {/* BAR CHART */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold text-[#0B132B]">

          Monthly Overview

        </h2>

        <div className="mt-8">

          {barChartData.length === 0 ? (

            <div className="h-[350px] flex items-center justify-center text-gray-500">

              No monthly data found

            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={barChartData}>

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

          )}

        </div>

      </div>

    </div>
  );
};

export default AnalyticsCharts;