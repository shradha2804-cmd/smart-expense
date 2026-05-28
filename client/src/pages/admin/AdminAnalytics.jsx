import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

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

const AdminAnalytics =
  () => {

    const [loading,
      setLoading] =
      useState(true);

    const [overviewData,
      setOverviewData] =
      useState([]);

    const [monthlyData,
      setMonthlyData] =
      useState([]);

    // HANDLE AUTH ERROR
    const handleAuthError =
      () => {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "isAdmin"
        );

        window.location.href =
          "/login";

      };

    // FETCH ANALYTICS
    const fetchAnalytics =
      async () => {

        try {

          setLoading(true);

          const { data } =
            await API.get(
              "/admin/dashboard"
            );

          // PIE DATA
          setOverviewData([
            {
              name: "Users",
              value:
                data.totalUsers || 0,
            },

            {
              name: "Income",
              value:
                data.totalIncome || 0,
            },

            {
              name: "Expenses",
              value:
                data.totalExpenses || 0,
            },
          ]);

          // MONTHLY DATA
          setMonthlyData(
            data.monthlyData || []
          );

        } catch (error) {

          console.log(error);

          // TOKEN EXPIRED
          if (
            error.response?.status === 401
          ) {

            handleAuthError();

          }

          toast.error(
            error.response?.data
              ?.message ||
              "Failed to load analytics"
          );

        } finally {

          setLoading(false);

        }

      };

    useEffect(() => {

      fetchAnalytics();

    }, []);

    // LOADING
    if (loading) {

      return (
        <div className="text-center py-20 text-xl font-bold text-[#2E1065]">

          Loading...

        </div>
      );

    }

    return (
      <section>

        {/* TOP */}
        <div>

          <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065] break-words">

            Analytics

          </h1>

          <p className="mt-2 text-gray-500">

            Platform analytics overview

          </p>

        </div>

        {/* CHARTS */}
        <div className="grid xl:grid-cols-2 gap-6 mt-8">

          {/* PIE */}
          <div className="bg-white rounded-3xl p-6 shadow-sm overflow-hidden">

            <h2 className="text-xl font-bold text-[#2E1065]">

              Platform Overview

            </h2>

            <div className="mt-6 h-[350px] w-full overflow-hidden">

              {
                overviewData.length === 0 ? (

                  <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">

                    No analytics data found

                  </div>

                ) : (

                  <ResponsiveContainer>

                    <PieChart>

                      <Pie
                        data={overviewData}
                        dataKey="value"
                        outerRadius={120}
                        label
                      >

                        {
                          overviewData.map(
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

            <h2 className="text-xl font-bold text-[#2E1065]">

              Monthly Analytics

            </h2>

            <div className="mt-6 h-[350px] w-full overflow-x-auto">

              {
                monthlyData.length === 0 ? (

                  <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">

                    No monthly analytics found

                  </div>

                ) : (

                  <ResponsiveContainer>

                    <BarChart
                      data={monthlyData}
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

export default AdminAnalytics;