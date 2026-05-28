import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const Users = () => {

  const [users,
    setUsers] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const { data } =
          await API.get(
            "/admin/users"
          );

        setUsers(data);

      } catch (error) {

        toast.error(
          "Failed to load users"
        );

      } finally {

        setLoading(false);

      }

    };

  // DELETE USER
  const deleteHandler =
    async (id) => {

      if (
        !window.confirm(
          "Delete this user?"
        )
      ) return;

      try {

        await API.delete(
          `/admin/users/${id}`
        );

        toast.success(
          "User deleted"
        );

        // REFRESH
        fetchUsers();

      } catch (error) {

        toast.error(
          "Delete failed"
        );

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  // FILTER USERS
  const filteredUsers =
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065] break-words">

            Users Management

          </h1>

          <p className="mt-2 text-gray-500">

            Manage all platform users

          </p>

        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-[350px]">

          <input
            type="text"
            placeholder="Search users..."
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

      </div>

      {/* USERS TABLE */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-[#F3F0FF]">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#2E1065]">

                  User

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#2E1065]">

                  Phone

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#2E1065]">

                  Role

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-[#2E1065]">

                  Joined

                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-[#2E1065]">

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >

                      No users found

                    </td>

                  </tr>

                ) : (

                  filteredUsers.map(
                    (user) => (

                      <tr
                        key={user._id}
                        className="border-t border-gray-100"
                      >

                        {/* USER */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-4 min-w-0">

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

                            <div className="min-w-0">

                              <h3 className="font-semibold text-[#2E1065] break-words">

                                {
                                  user.name
                                }

                              </h3>

                              <p className="text-sm text-gray-500 break-all">

                                {
                                  user.email
                                }

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* PHONE */}
                        <td className="px-6 py-4 text-gray-600 break-words">

                          {
                            user.phone ||
                            "N/A"
                          }

                        </td>

                        {/* ROLE */}
                        <td className="px-6 py-4">

                          {
                            user.isAdmin ? (

                              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">

                                Admin

                              </span>

                            ) : (

                              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

                                User

                              </span>

                            )
                          }

                        </td>

                        {/* DATE */}
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">

                          {
                            new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          }

                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-4 text-center">

                          <button
                            onClick={() =>
                              deleteHandler(
                                user._id
                              )
                            }
                            className="h-11 w-11 rounded-xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition inline-flex items-center justify-center"
                          >

                            <FaTrash />

                          </button>

                        </td>

                      </tr>

                    )
                  )

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
};

export default Users;