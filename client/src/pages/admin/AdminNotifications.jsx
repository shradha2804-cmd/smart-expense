import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaTrash,
  FaBell,
} from "react-icons/fa";

const AdminNotifications =
  () => {

    const [title,
      setTitle] =
      useState("");

    const [message,
      setMessage] =
      useState("");

    const [
      notifications,
      setNotifications,
    ] = useState([]);

    // FETCH
    const fetchNotifications =
      async () => {

        try {

          const { data } =
            await API.get(
              "/notifications"
            );

          setNotifications(
            data
          );

        } catch (error) {

          toast.error(
            "Failed to load notifications"
          );

        }

      };

    // CREATE
    const submitHandler =
      async (e) => {

        e.preventDefault();

        try {

          await API.post(
            "/notifications",
            {
              title,
              message,
            }
          );

          toast.success(
            "Notification sent"
          );

          setTitle("");

          setMessage("");

          fetchNotifications();

        } catch (error) {

          toast.error(
            "Failed to send"
          );

        }

      };

    // DELETE
    const deleteHandler =
      async (id) => {

        try {

          await API.delete(
            `/notifications/${id}`
          );

          toast.success(
            "Deleted"
          );

          fetchNotifications();

        } catch (error) {

          toast.error(
            "Delete failed"
          );

        }

      };

    useEffect(() => {

      fetchNotifications();

    }, []);

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
          className="mt-8 bg-white rounded-3xl p-6 shadow-sm space-y-5"
        >

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

          <textarea
            rows="4"
            placeholder="Write notification message..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 outline-none focus:border-purple-600 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-2xl hover:bg-purple-700 transition"
          >

            Send Notification

          </button>

        </form>

        {/* LIST */}
        <div className="mt-8 space-y-4">

          {
            notifications.map(
              (
                item
              ) => (

                <div
                  key={
                    item._id
                  }
                  className="bg-white rounded-3xl p-5 shadow-sm flex items-start justify-between gap-4"
                >

                  <div className="flex gap-4">

                    <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">

                      <FaBell />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-[#2E1065]">

                        {
                          item.title
                        }

                      </h2>

                      <p className="mt-1 text-gray-500">

                        {
                          item.message
                        }

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteHandler(
                        item._id
                      )
                    }
                    className="h-11 w-11 rounded-xl bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center"
                  >

                    <FaTrash />

                  </button>

                </div>

              )
            )
          }

        </div>

      </section>
    );

  };

export default AdminNotifications;