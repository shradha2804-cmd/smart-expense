import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBell,
  FaCheckCircle,
  FaWallet,
  FaMoneyBillWave,
  FaUserEdit,
} from "react-icons/fa";

const Notifications = () => {

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    setNotifications(
      user?.notifications || []
    );

  }, []);

  // READ
  const markAsRead = (
    index
  ) => {

    const updated =
      [...notifications];

    updated[index].read = true;

    setNotifications(
      updated
    );

    const user =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    user.notifications =
      updated;

    localStorage.setItem(
      "userInfo",
      JSON.stringify(user)
    );

    window.dispatchEvent(
      new Event(
        "notificationUpdate"
      )
    );

  };

  // ICON
  const getIcon = (message) => {

    if (
      message
        .toLowerCase()
        .includes("expense")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-2xl">

          <FaWallet />

        </div>
      );

    }

    if (
      message
        .toLowerCase()
        .includes("income")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-green-100 text-green-500 flex items-center justify-center text-2xl">

          <FaMoneyBillWave />

        </div>
      );

    }

    if (
      message
        .toLowerCase()
        .includes("profile")
    ) {

      return (
        <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl">

          <FaUserEdit />

        </div>
      );

    }

    return (
      <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center text-2xl">

        <FaBell />

      </div>
    );

  };

  return (
    <section>

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>

          <h1 className="text-3xl font-bold text-[#0B132B]">

            Notifications

          </h1>

          <p className="mt-2 text-gray-500">

            Stay updated with your latest activities

          </p>

        </div>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-md">

          {
            notifications.filter(
              (item) =>
                !item.read
            ).length
          }{" "}
          Unread

        </div>

      </div>

      {/* BODY */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 md:p-8">

        {notifications.length === 0 ? (

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

            {notifications.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  onClick={() =>
                    markAsRead(
                      index
                    )
                  }
                  className={`flex items-start gap-5 border rounded-3xl p-5 transition cursor-pointer
                  ${
                    item.read
                      ? "bg-gray-50 border-gray-100 opacity-70"
                      : "bg-white border-blue-100 hover:bg-blue-50/40"
                  }`}
                >

                  {getIcon(
                    item.message
                  )}

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-4 flex-wrap">

                      <h3 className="text-lg font-semibold text-[#0B132B]">

                        {item.message}

                      </h3>

                      {!item.read && (

                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">

                          <FaCheckCircle />

                          NEW

                        </div>

                      )}

                    </div>

                    <p className="mt-3 text-sm text-gray-500">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
};

export default Notifications;