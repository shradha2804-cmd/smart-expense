import React, {
  useEffect,
  useState,
} from "react";

import API from "../../utils/api";

import toast from "react-hot-toast";

import {
  FaEnvelopeOpenText,
  FaTrash,
} from "react-icons/fa";

const AdminMessages =
  () => {

    const [messages,
      setMessages] =
      useState([]);

    const [loading,
      setLoading] =
      useState(true);

    // FETCH MESSAGES
    const fetchMessages =
      async () => {

        try {

          const { data } =
            await API.get(
              "/contact"
            );

          setMessages(data);

        } catch (error) {

          toast.error(
            "Failed to load messages"
          );

        } finally {

          setLoading(false);

        }

      };

    // MARK AS READ
    const markAsRead =
      async (id) => {

        try {

          await API.put(
            `/contact/${id}/read`
          );

          setMessages(
            messages.map(
              (item) =>

                item._id === id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
            )
          );

        } catch (error) {

          console.log(error);

        }

      };

    // DELETE MESSAGE
    const deleteMessage =
      async (id) => {

        try {

          await API.delete(
            `/contact/${id}`
          );

          setMessages(
            messages.filter(
              (item) =>
                item._id !== id
            )
          );

          toast.success(
            "Message deleted"
          );

        } catch (error) {

          toast.error(
            "Delete failed"
          );

        }

      };

    useEffect(() => {

      fetchMessages();

    }, []);

    return (
      <section>

        {/* TOP */}
        <div>

          <h1 className="text-2xl md:text-4xl font-bold text-[#2E1065]">

            Contact Messages

          </h1>

          <p className="mt-2 text-gray-500">

            Manage guest contact messages

          </p>

        </div>

        {/* CONTENT */}
        <div className="mt-8 space-y-5">

          {
            loading ? (

              <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow-sm">

                Loading messages...

              </div>

            ) : messages.length === 0 ? (

              <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow-sm">

                No contact messages found

              </div>

            ) : (

              messages.map(
                (item) => (

                  <div
                    key={item._id}
                    className={`bg-white rounded-3xl p-6 shadow-sm border transition ${
                      !item.isRead
                        ? "border-red-200"
                        : "border-transparent"
                    }`}
                  >

                    {/* TOP */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>

                        <div className="flex items-center gap-3 flex-wrap">

                          <h2 className="text-xl font-bold text-[#0B132B]">

                            {item.name}

                          </h2>

                          {
                            !item.isRead && (

                              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">

                                New

                              </span>

                            )
                          }

                        </div>

                        <p className="text-gray-500 mt-1 break-all">

                          {item.email}

                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        {/* READ */}
                        {
                          !item.isRead && (

                            <button
                              onClick={() =>
                                markAsRead(
                                  item._id
                                )
                              }
                              className="h-11 w-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
                            >

                              <FaEnvelopeOpenText />

                            </button>

                          )
                        }

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteMessage(
                              item._id
                            )
                          }
                          className="h-11 w-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </div>

                    {/* SUBJECT */}
                    <div className="mt-6">

                      <h3 className="font-semibold text-[#2E1065]">

                        Subject

                      </h3>

                      <p className="mt-2 text-gray-600">

                        {item.subject}

                      </p>

                    </div>

                    {/* MESSAGE */}
                    <div className="mt-6">

                      <h3 className="font-semibold text-[#2E1065]">

                        Message

                      </h3>

                      <p className="mt-2 text-gray-600 leading-relaxed whitespace-pre-wrap">

                        {item.message}

                      </p>

                    </div>

                    {/* DATE */}
                    <div className="mt-6 text-sm text-gray-400">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleString()
                      }

                    </div>

                  </div>

                )
              )

            )
          }

        </div>

      </section>
    );

  };

export default AdminMessages;