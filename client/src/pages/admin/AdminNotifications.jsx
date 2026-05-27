import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

const AdminNotifications = () => {

  const [users,
    setUsers] =
    useState([]);

  const [filteredUsers,
    setFilteredUsers] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [sendType,
    setSendType] =
    useState("all");

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [title,
    setTitle] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const { data } =
          await API.get(
            "/admin/users"
          );

        setUsers(data);

        setFilteredUsers(
          data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  // SEARCH USERS
  useEffect(() => {

    const filtered =
      users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredUsers(
      filtered
    );

  }, [search, users]);

  // SEND
  const submitHandler =
    async (e) => {

      e.preventDefault();

      // VALIDATION
      if (
        sendType ===
          "specific" &&
        !selectedUser
      ) {

        return toast.error(
          "Please select user"
        );

      }

      try {

        setLoading(true);

        await API.post(
          "/notifications",
          {
            title,
            message,
            userId:
              sendType ===
              "specific"
                ? selectedUser._id
                : null,
          }
        );

        toast.success(
          "Notification sent"
        );

        setTitle("");

        setMessage("");

        setSearch("");

        setSelectedUser(
          null
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to send"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <section>

      {/* TOP */}
      <div>

        <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065]">

          Notifications

        </h1>

        <p className="mt-2 text-gray-500">

          Send notifications to users

        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={
          submitHandler
        }
        className="mt-8 bg-white rounded-3xl p-5 md:p-6 shadow-sm space-y-5"
      >

        {/* SEND TYPE */}
        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">

            Send To

          </label>

          <select
            value={sendType}
            onChange={(e) => {

              setSendType(
                e.target.value
              );

              setSelectedUser(
                null
              );

              setSearch("");

            }}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-purple-600"
          >

            <option value="all">

              All Users

            </option>

            <option value="specific">

              Specific User

            </option>

          </select>

        </div>

        {/* SEARCH USER */}
        {
          sendType ===
            "specific" && (

            <div>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                Search User

              </label>

              {/* SEARCH */}
              <div className="relative">

                <input
                  type="text"
                  placeholder="Search user..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-purple-600"
                />

                <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />

              </div>

              {/* USERS LIST */}
              <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden max-h-[250px] overflow-y-auto">

                {
                  filteredUsers
                    .length === 0 ? (

                    <div className="p-5 text-center text-gray-500">

                      No users found

                    </div>

                  ) : (

                    filteredUsers.map(
                      (
                        user
                      ) => (

                        <div
                          key={
                            user._id
                          }
                          onClick={() =>
                            setSelectedUser(
                              user
                            )
                          }
                          className={`cursor-pointer px-4 py-3 flex items-center gap-4 border-b border-gray-100 hover:bg-purple-50 transition
                          ${
                            selectedUser?._id ===
                            user._id
                              ? "bg-purple-100"
                              : ""
                          }`}
                        >

                          {/* IMAGE */}
                          {
                            user.profileImage ? (

                              <img
                                src={
                                  user.profileImage
                                }
                                alt=""
                                className="h-12 w-12 rounded-full object-cover"
                              />

                            ) : (

                              <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase">

                                {
                                  user.name?.charAt(
                                    0
                                  )
                                }

                              </div>

                            )
                          }

                          {/* INFO */}
                          <div>

                            <h3 className="font-semibold text-[#2E1065]">

                              {
                                user.name
                              }

                            </h3>

                            <p className="text-sm text-gray-500">

                              {
                                user.email
                              }

                            </p>

                          </div>

                        </div>

                      )
                    )

                  )
                }

              </div>

              {/* SELECTED */}
              {
                selectedUser && (

                  <div className="mt-4 bg-purple-100 text-purple-700 px-5 py-3 rounded-2xl">

                    Selected User:
                    {" "}

                    <span className="font-bold">

                      {
                        selectedUser.name
                      }

                    </span>

                  </div>

                )
              }

            </div>

          )
        }

        {/* TITLE */}
        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">

            Title

          </label>

          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-purple-600"
            required
          />

        </div>

        {/* MESSAGE */}
        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">

            Message

          </label>

          <textarea
            rows="5"
            placeholder="Write notification..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-purple-600 resize-none"
            required
          ></textarea>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-8 py-3 rounded-2xl flex items-center gap-3 disabled:opacity-70"
        >

          <FaBell />

          {
            loading
              ? "Sending..."
              : "Send Notification"
          }

        </button>

      </form>

    </section>
  );
};

export default
AdminNotifications;