
import React, { useMemo, useState } from "react";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaEdit,
    FaPercent,
    FaPlus,
    FaSearch,
    FaTags,
    FaTimesCircle,
    FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { gymOfferData } from "../Data/Gym/offerData";
import { yogaOfferData } from "../Data/Yoga/offerData";
import { Link } from "react-router-dom";

const Offer = () => {
    const currentMode = useSelector((state) => state.mode.currentMode);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const offers = currentMode === "gym" ? gymOfferData : yogaOfferData;

    const filteredOffers = useMemo(() => {
        return offers.filter((offer) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                offer.title.toLowerCase().includes(searchValue) ||
                offer.code.toLowerCase().includes(searchValue) ||
                offer.applicableTo.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "All" || offer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [offers, search, statusFilter]);

    const totalOffers = offers.length;

    const activeOffers = offers.filter(
        (item) => item.status === "Active",
    ).length;

    const scheduledOffers = offers.filter(
        (item) => item.status === "Scheduled",
    ).length;

    const expiredOffers = offers.filter(
        (item) => item.status === "Expired",
    ).length;

    const totalRedemptions = offers.reduce(
        (total, offer) => total + offer.usedCount,
        0,
    );

    const getStatusStyle = (status) => {
        if (status === "Active") {
            return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
        }

        if (status === "Scheduled") {
            return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
        }

        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
    };

    const getStatusIcon = (status) => {
        if (status === "Active") {
            return <FaCheckCircle size={11} />;
        }

        if (status === "Scheduled") {
            return <FaCalendarAlt size={11} />;
        }

        return <FaTimesCircle size={11} />;
    };

    const getDiscountText = (offer) => {
        return offer.discountType === "Percentage"
            ? `${offer.discountValue}%`
            : `₹${offer.discountValue}`;
    };

    return (
        <>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                            {currentMode === "gym"
                                ? "Gym Offers & Coupons"
                                : "Yoga Offers & Coupons"}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                            {currentMode === "gym"
                                ? "Manage all gym offers and discount coupons."
                                : "Manage all yoga offers and discount coupons."}
                        </p>
                    </div>

                    <Link to ="add-offers"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        <FaPlus size={12} />
                        Add New Offer
                    </Link>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {/* Total */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Total Offers
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                    {totalOffers}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <FaTags size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Active */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Active Offers
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                                    {activeOffers}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                <FaCheckCircle size={16} />
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
                                    {scheduledOffers}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <FaCalendarAlt size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Expired */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Expired
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                                    {expiredOffers}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                                <FaTimesCircle size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Redemptions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Redemptions
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {totalRedemptions.toLocaleString()}
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                <FaPercent size={15} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {/* Toolbar */}
                    <div className="flex flex-col gap-3 border-b border-gray-200 p-4 dark:border-gray-700 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-sm">
                            <FaSearch
                                size={13}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                            />

                            <input
                                type="text"
                                placeholder="Search offer, code or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-blue-400"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {["All", "Active", "Scheduled", "Expired"].map(
                                (status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
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
                                        Offer
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Code
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Discount
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Applicable To
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Validity
                                    </th>

                                    <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                                        Usage
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
                                {filteredOffers.length > 0 ? (
                                    filteredOffers.map((offer) => {
                                        const usagePercentage =
                                            offer.usageLimit > 0
                                                ? Math.min(
                                                      (offer.usedCount /
                                                          offer.usageLimit) *
                                                          100,
                                                      100,
                                                  )
                                                : 0;

                                        return (
                                            <tr
                                                key={offer.id}
                                                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
                                            >
                                                {/* Offer */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                                            <FaTags size={13} />
                                                        </div>

                                                        <div>
                                                            <p className="max-w-[220px] truncate font-medium text-gray-900 dark:text-white">
                                                                {offer.title}
                                                            </p>

                                                            <p className="mt-1 max-w-[240px] truncate text-xs text-gray-500 dark:text-gray-400">
                                                                {
                                                                    offer.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Code */}
                                                <td className="px-6 py-4">
                                                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                                        {offer.code}
                                                    </span>
                                                </td>

                                                {/* Discount */}
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                                            {getDiscountText(
                                                                offer,
                                                            )}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                            {
                                                                offer.discountType
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Applicable */}
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-700 dark:text-gray-300">
                                                        {offer.applicableTo}
                                                    </span>
                                                </td>

                                                {/* Validity */}
                                                <td className="px-6 py-4">
                                                    <div className="whitespace-nowrap text-xs">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            {offer.startDate}
                                                        </p>

                                                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                                                            to{" "}
                                                            {offer.endDate}
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Usage */}
                                                <td className="px-6 py-4">
                                                    <div className="w-28">
                                                        <div className="mb-1 flex justify-between text-xs">
                                                            <span className="text-gray-700 dark:text-gray-300">
                                                                {
                                                                    offer.usedCount
                                                                }
                                                            </span>

                                                            <span className="text-gray-400 dark:text-gray-500">
                                                                {
                                                                    offer.usageLimit
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                            <div
                                                                className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
                                                                style={{
                                                                    width: `${usagePercentage}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                                                            offer.status,
                                                        )}`}
                                                    >
                                                        {getStatusIcon(
                                                            offer.status,
                                                        )}

                                                        {offer.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            title="Edit Offer"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                        >
                                                            <FaEdit
                                                                size={12}
                                                            />
                                                        </button>

                                                        <button
                                                            title="Delete Offer"
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                        >
                                                            <FaTrash
                                                                size={11}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex flex-col items-center">
                                                <FaTags
                                                    size={24}
                                                    className="mb-3 text-gray-400 dark:text-gray-500"
                                                />

                                                <p className="font-medium">
                                                    No offers found.
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
                                {filteredOffers.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                {offers.length}
                            </span>{" "}
                            offers
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

export default Offer;

