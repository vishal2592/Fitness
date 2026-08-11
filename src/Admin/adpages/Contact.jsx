
import React from "react";
import { useSelector } from "react-redux";
import gymContactQueries from "../Data/Gym/contactQueryData";
import yogaContactQueries from "../Data/Yoga/contactQueryData";

const Contact = () => {
    const currentMode = useSelector((state) => state.mode.currentMode);

    const contactQueries =
        currentMode === "gym" ? gymContactQueries : yogaContactQueries;

    return (
        <>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                        {currentMode === "gym"
                            ? "Gym Contact"
                            : "Yoga Contact"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                        {currentMode === "gym"
                            ? "Manage all gym Contact ."
                            : "Manage all yoga Contact ."}
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Subject
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Message
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Priority
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {contactQueries.length > 0 ? (
                                    contactQueries.map((query) => (
                                        <tr
                                            key={query.id}
                                            className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {query.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {query.source}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {query.email}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    {query.phone}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                                                {query.subject}
                                            </td>

                                            <td className="max-w-xs px-6 py-4">
                                                <p className="truncate text-gray-600 dark:text-gray-400">
                                                    {query.message}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${query.status === "new"
                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                        : query.status === "in-progress"
                                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                                            : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                                                        }`}
                                                >
                                                    {query.status.replace("-", " ")}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${query.priority === "high"
                                                        ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                        : query.priority === "medium"
                                                            ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                                                            : "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {query.priority}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {query.createdAt}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            No contact queries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Contact;
