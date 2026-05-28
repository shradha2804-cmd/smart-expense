import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaBell,
  FaCheckCircle,
  FaWallet,
  FaMoneyBillWave,
  FaUserEdit,
  FaUserShield,
} from "react-icons/fa";

const Notifications = () => {

  const [notifications,
    setNotifications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // FETCH NOTIFICATIONS
  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const { data } =
          await API.get(
            "/notifications"
          );

        setNotifications(
          data
        );

        // UPDATE NAVBAR
        window.dispatchEvent(
          new Event(
            "notificationUpdate"
          )
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
            "Failed to load notifications"
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchNotifications();

  }, []);

  // MARK AS READ
  const markAsRead =
    async (id) => {

      // STORE OLD STATE
      const oldNotifications =
        [...notifications];

      try {

        // OPTIMISTIC UPDATE
        setNotifications(
          (prev) =>
            prev.map(
              (item) =>
                item._id === id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
            )
        );

        await API.put(
          `/notifications/${id}/read`
        );

        // UPDATE NAVBAR RED DOT
        window.dispatchEvent(
          new Event(
            "notificationUpdate"
          )
        );

      } catch (error) {

        console.log(error);

        // RESTORE IF FAILED
        setNotifications(
          oldNotifications
        );

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update notification"
        );

      }

    };

  // ICON
  const getIcon = (
    message,
    sender
  ) => {

    // ADMIN
    if (
      sender === "admin"
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl shrink-0">

          <FaUserShield />

        </div>
      );

    }

    // EXPENSE
    if (
      message
        ?.toLowerCase()
        .includes("expense")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-2xl shrink-0">

          <FaWallet />

        </div>
      );

    }

    // INCOME
    if (
      message
        ?.toLowerCase()
        .includes("income")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center text-2xl shrink-0">

          <FaMoneyBillWave />

        </div>
      );

    }

    // PROFILE
    if (
      message
        ?.toLowerCase()
        .includes("profile")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl shrink-0">

          <FaUserEdit />

        </div>
      );

    }

    // DEFAULT
    return (
      <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center text-2xl shrink-0">

        <FaBell />

      </div>
    );

  };

  // UNREAD COUNT
  const unreadCount =
    notifications.filter(
      (item) =>
        !item.isRead
    ).length;

  // LOADING
  if (loading) {

    return (
      <div className="text-center py-20 text-xl font-bold text-[#0B132B]">

        Loading...

      </div>
    );

  }

  return (
    <section className="w-full overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#0B132B] break-words">

            Notifications

          </h1>

          <p className="mt-2 text-gray-500 text-sm md:text-base">

            Stay updated with your latest activities

          </p>

        </div>

        {/* UNREAD */}
        <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-md w-fit">

          {unreadCount} Unread

        </div>

      </div>

      {/* BODY */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-4 md:p-8 overflow-hidden">

        {
          notifications.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-20">

              <div className="h-24 w-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl">

                <FaBell />

              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#0B132B]">

                No Notifications

              </h2>

            </div>

          ) : (

            <div className="space-y-5">

              {
                notifications.map(
                  (
                    item
                  ) => (

                    <div
                      key={item._id}
                      onClick={() =>
                        !item.isRead &&
                        markAsRead(
                          item._id
                        )
                      }
                      className={`w-full max-w-full flex flex-col sm:flex-row items-start gap-4 border rounded-3xl p-4 md:p-5 transition cursor-pointer overflow-hidden break-words
                      ${
                        item.isRead
                          ? "bg-gray-50 border-gray-100 opacity-70"
                          : "bg-white border-blue-100 hover:bg-blue-50/40"
                      }`}
                    >

                      {/* ICON */}
                      {getIcon(
                        item.message,
                        item.sender
                      )}

                      {/* CONTENT */}
                      <div className="flex-1 w-full min-w-0 max-w-full overflow-hidden">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                          <div className="min-w-0 flex-1">

                            <h3 className="text-sm md:text-base font-semibold text-[#0B132B] leading-relaxed break-words whitespace-normal w-full overflow-hidden">

                              {item.message}

                            </h3>

                            {/* ADMIN */}
                            {
                              item.sender ===
                                "admin" && (

                                <p className="mt-1 text-sm text-purple-600 font-medium">

                                  Sent by Admin

                                </p>

                              )
                            }

                          </div>

                          {/* NEW */}
                          {
                            !item.isRead && (

                              <div className="flex items-center gap-2 text-green-600 text-sm font-medium shrink-0">

                                <FaCheckCircle />

                                NEW

                              </div>

                            )
                          }

                        </div>

                        {/* DATE */}
                        <p className="mt-3 text-xs md:text-sm text-gray-500 break-words">

                          {
                            new Date(
                              item.createdAt
                            ).toLocaleString()
                          }

                        </p>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </div>

    </section>
  );
};

export default Notifications;