import React, {
  useEffect,
  useState,
} from "react";

import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";

import AnalyticsCharts from "../../components/dashboard/AnalyticsCharts";

import toast from "react-hot-toast";

import API from "../../utils/api";

const Dashboard = () => {

  const [user,
    setUser] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [dashboardData,
    setDashboardData] =
    useState({
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      recentTransactions: [],
      pieChartData: [],
      barChartData: [],
    });

  // FETCH DASHBOARD DATA
  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

        // FETCH BOTH APIs TOGETHER
        const [
          profileRes,
          dashboardRes,
        ] = await Promise.all([

          API.get(
            "/users/profile"
          ),

          API.get(
            "/dashboard"
          ),

        ]);

        // PROFILE
        setUser(
          profileRes.data
        );

        // DASHBOARD
        setDashboardData(
          dashboardRes.data
        );

      } catch (error) {

        console.log(error);

        // TOKEN EXPIRED
        if (
          error.response?.status === 401
        ) {

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "isAdmin"
          );

          window.location.href =
            "/login";

        }

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load dashboard"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // LOADING
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
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-[#0B132B] break-words">

          Hello, {user?.name} 👋

        </h1>

        <p className="mt-2 text-gray-500">

          Welcome back to Smart Expense TRacker Dashboard

        </p>

      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* BALANCE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500">

                Total Balance

              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#0B132B] break-words">

                ₹
                {dashboardData.totalBalance}

              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl shrink-0">

              <FaWallet />

            </div>

          </div>

        </div>

        {/* INCOME */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500">

                Total Income

              </p>

              <h2 className="mt-3 text-4xl font-bold text-green-600 break-words">

                ₹
                {dashboardData.totalIncome}

              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-3xl shrink-0">

              <FaArrowUp />

            </div>

          </div>

        </div>

        {/* EXPENSE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500">

                Total Expenses

              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-500 break-words">

                ₹
                {dashboardData.totalExpense}

              </h2>

            </div>

            <div className="h-16 w-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-3xl shrink-0">

              <FaArrowDown />

            </div>

          </div>

        </div>

      </div>

      {/* TRANSACTIONS */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 overflow-hidden">

        <h2 className="text-2xl font-bold text-[#0B132B]">

          Recent Transactions

        </h2>

        <div className="mt-6 space-y-4">

          {
            dashboardData.recentTransactions
              .length === 0 ? (

              <p className="text-gray-500">

                No transactions found

              </p>

            ) : (

              dashboardData.recentTransactions.map(
                (item, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 bg-[#F5F7FF] p-4 rounded-2xl"
                  >

                    <div className="min-w-0">

                      <h3 className="font-semibold text-[#0B132B] break-words">

                        {item.title}

                      </h3>

                      <p className="text-sm text-gray-500 mt-1 break-words">

                        {item.type}

                      </p>

                    </div>

                    <h2
                      className={`font-bold text-lg shrink-0 ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >

                      {
                        item.type === "income"
                          ? "+"
                          : "-"
                      }

                      ₹{item.amount}

                    </h2>

                  </div>

                )
              )

            )
          }

        </div>

        {/* CHARTS */}
        <div className="mt-8 overflow-x-auto">

          <AnalyticsCharts
            pieChartData={
              dashboardData.pieChartData
            }
            barChartData={
              dashboardData.barChartData
            }
          />

        </div>

      </div>

    </section>
  );
};

export default Dashboard;