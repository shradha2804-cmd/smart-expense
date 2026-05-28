import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaUsers,
  FaWallet,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";

const AdminDashboard = () => {

  const [loading,
    setLoading] =
    useState(true);

  const [dashboardData,
    setDashboardData] =
    useState(null);

  // FETCH
  const fetchDashboard =
    async () => {

      try {

        const { data } =
          await API.get(
            "/admin/dashboard"
          );

        setDashboardData(
          data
        );

      } catch (error) {

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (loading) {

    return (
      <div className="text-center py-20 text-xl font-bold text-[#2E1065]">

        Loading...

      </div>
    );

  }

  return (
    <section>

      {/* TITLE */}
      <div>

        <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065] break-words">

          Dashboard Overview

        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-500">

          Monitor platform analytics and users

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

        {/* CARD */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500 text-sm">

                Total Users

              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#2E1065] break-words">

                {
                  dashboardData?.totalUsers
                }

              </h1>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl shrink-0">

              <FaUsers />

            </div>

          </div>

        </div>

        {/* INCOME */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500 text-sm">

                Total Income

              </p>

              <h1 className="mt-2 text-3xl font-bold text-green-600 break-words">

                ₹{
                  dashboardData?.totalIncome
                }

              </h1>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl shrink-0">

              <FaWallet />

            </div>

          </div>

        </div>

        {/* EXPENSE */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500 text-sm">

                Total Expenses

              </p>

              <h1 className="mt-2 text-3xl font-bold text-red-500 break-words">

                ₹{
                  dashboardData?.totalExpenses
                }

              </h1>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-2xl shrink-0">

              <FaMoneyBillWave />

            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-gray-500 text-sm">

                Transactions

              </p>

              <h1 className="mt-2 text-3xl font-bold text-blue-600 break-words">

                {
                  dashboardData?.totalTransactions
                }

              </h1>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">

              <FaExchangeAlt />

            </div>

          </div>

        </div>

      </div>

      {/* TABLES */}
      <div className="grid xl:grid-cols-2 gap-5 mt-8">

        {/* USERS */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <h2 className="text-xl font-bold text-[#2E1065]">

            Recent Users

          </h2>

          <div className="mt-5 space-y-4">

            {
              dashboardData?.recentUsers
                ?.length === 0 ? (

                <p className="text-gray-500">

                  No users found

                </p>

              ) : (

                dashboardData?.recentUsers
                  ?.map(
                    (user) => (

                      <div
                        key={user._id}
                        className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 gap-4 overflow-hidden"
                      >

                        <div className="flex items-center gap-3 min-w-0 flex-1">

                          {/* IMAGE */}
                          {
                            user.profileImage ? (

                              <img
                                src={
                                  user.profileImage
                                }
                                alt=""
                                className="h-12 w-12 rounded-full object-cover shrink-0"
                              />

                            ) : (

                              <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase shrink-0">

                                {
                                  user.name?.charAt(
                                    0
                                  )
                                }

                              </div>

                            )
                          }

                          <div className="min-w-0 flex-1">

                            <h3 className="font-semibold text-sm md:text-base text-[#2E1065] break-words">

                              {
                                user.name
                              }

                            </h3>

                            <p className="text-xs md:text-sm text-gray-500 break-all">

                              {
                                user.email
                              }

                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )

              )
            }

          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-3xl p-5 shadow-sm overflow-hidden">

          <h2 className="text-xl font-bold text-[#2E1065]">

            Recent Transactions

          </h2>

          <div className="mt-5 space-y-4">

            {
              dashboardData?.recentTransactions
                ?.length === 0 ? (

                <p className="text-gray-500">

                  No transactions found

                </p>

              ) : (

                dashboardData?.recentTransactions
                  ?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-4 overflow-hidden"
                      >

                        <div className="min-w-0 flex-1">

                          <h3 className="font-semibold text-sm md:text-base text-[#2E1065] break-words">

                            {
                              item.title
                            }

                          </h3>

                          <p className={`text-xs md:text-sm capitalize break-words ${
                            item.type ===
                            "income"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}>

                            {
                              item.type
                            }

                          </p>

                        </div>

                        <h2 className={`text-lg md:text-2xl font-bold shrink-0 ${
                          item.type ===
                          "income"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}>

                          ₹{
                            item.amount
                          }

                        </h2>

                      </div>

                    )
                  )

              )
            }

          </div>

        </div>

      </div>

    </section>
  );
};

export default AdminDashboard;