
import React, { useMemo, useState } from "react";
import {
    FaBell,
    FaCalendarAlt,
    FaCheckCircle,
    FaEdit,
    FaPlus,
    FaSearch,
    FaPaperPlane,
    FaTrash,
    FaTimesCircle,
    FaClock,
    FaBullhorn,
    FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { gymNotificationData } from "../Data/Gym/notificationData";
import { yogaNotificationData } from "../Data/Yoga/notificationData";

const Notification = () => {
    const currentMode = useSelector((state) => state.mode.currentMode);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const notifications =
        currentMode === "gym"
            ? gymNotificationData
            : yogaNotificationData;

    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                notification.title
                    .toLowerCase()
                    .includes(searchValue) ||
                notification.message
                    .toLowerCase()
                    .includes(searchValue) ||
                notification.audience
                    .toLowerCase()
                    .includes(searchValue) ||
                notification.type
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                notification.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [notifications, search, statusFilter]);

    const totalNotifications = notifications.length;

    const sentNotifications = notifications.filter(
        (item) => item.status === "Sent",
    ).length;

    const scheduledNotifications = notifications.filter(
        (item) => item.status === "Scheduled",
    ).length;

    const draftNotifications = notifications.filter(
        (item) => item.status === "Draft",
    ).length;

    const getStatusStyle = (status) => {
        if (status === "Sent") {
            return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        }

        if (status === "Scheduled") {
            return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        }

        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    };

    const getStatusIcon = (status) => {
        if (status === "Sent") {
            return <FaCheckCircle size={11} />;
        }

        if (status === "Scheduled") {
            return <FaCalendarAlt size={11} />;
        }

        return <FaClock size={11} />;
    };

    const getTypeStyle = (type) => {
        if (type === "Promotion") {
            return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
        }

        if (type === "Reminder") {
            return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
        }

        if (type === "Class") {
            return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        }

        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    };

    return (
        <>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                            {currentMode === "gym"
                                ? "Gym Notifications"
                                : "Yoga Notifications"}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                            {currentMode === "gym"
                                ? "Manage all gym notifications and member communications."
                                : "Manage all yoga notifications and member communications."}
                        </p>
                    </div>

                    <Link
                        to="sendnotification"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        <FaPlus size={12} />
                        Send Notification
                    </Link>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {/* Total */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Total Notifications
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                    {totalNotifications}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <FaBell size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Sent */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Sent
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                                    {sentNotifications}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                <FaPaperPlane size={15} />
                            </div>
                        </div>
                    </div>

                    {/* Scheduled */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Scheduled
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {scheduledNotifications}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <FaCalendarAlt size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Draft */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Drafts
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {draftNotifications}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                <FaBullhorn size={15} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-3 border-b border-gray-200 p-4 dark:border-gray-700 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-sm">
                            <FaSearch
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                            />

                            <input
                                type="text"
                                placeholder="Search notification, audience or type..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-400"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            {["All", "Sent", "Scheduled", "Draft"].map(
                                (status) => (
                                    <button
                                        key={status}
                                        onClick={() =>
                                            setStatusFilter(status)
                                        }
                                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                            statusFilter === status
                                                ? "bg-blue-600 text-white dark:bg-blue-500"
                                                : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1100px] text-left text-sm">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Notification
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Audience
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Type
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Date & Time
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-300">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredNotifications.length > 0 ? (
                                    filteredNotifications.map(
                                        (notification) => (
                                            <tr
                                                key={notification.id}
                                                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
                                            >
                                                {/* Notification */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                            <FaBell
                                                                size={13}
                                                            />
                                                        </div>

                                                        <div>
                                                            <p className="max-w-[300px] truncate font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    notification.title
                                                                }
                                                            </p>

                                                            <p className="mt-1 max-w-[360px] truncate text-xs text-gray-500 dark:text-gray-400">
                                                                {
                                                                    notification.message
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Audience */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FaUsers
                                                            size={12}
                                                            className="text-gray-400 dark:text-gray-500"
                                                        />

                                                        <span className="text-gray-700 dark:text-gray-300">
                                                            {
                                                                notification.audience
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Type */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTypeStyle(
                                                            notification.type,
                                                        )}`}
                                                    >
                                                        {notification.type}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4">
                                                    <div className="whitespace-nowrap text-xs">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            {
                                                                notification.date
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                                                            {
                                                                notification.time
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                            notification.status,
                                                        )}`}
                                                    >
                                                        {getStatusIcon(
                                                            notification.status,
                                                        )}

                                                        {notification.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            title="Edit Notification"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                        >
                                                            <FaEdit
                                                                size={12}
                                                            />
                                                        </button>

                                                        <button
                                                            title="Delete Notification"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                        >
                                                            <FaTrash
                                                                size={11}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex flex-col items-center">
                                                <FaBell
                                                    size={24}
                                                    className="mb-3 text-gray-400 dark:text-gray-500"
                                                />

                                                <p className="font-medium">
                                                    No notifications found.
                                                </p>

                                                <p className="mt-1 text-xs">
                                                    Try changing your search or
                                                    status filter.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                {filteredNotifications.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                {notifications.length}
                            </span>{" "}
                            notifications
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {currentMode === "gym" ? "Gym" : "Yoga"} Module
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
