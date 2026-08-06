import React, { useMemo, useState } from "react";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    X,
    CreditCard,
    Users,
    CheckCircle2,
    Clock3,
    XCircle,
    CalendarDays,
    IndianRupee,
    ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";


import yogaSubscriptionData from "../Data/Yoga/subscriptionData";
import gymSubscriptionData from "../Data/Gym/subscriptionData";

const Subscription = () => {
    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );

    const subscriptions =
        currentMode === "gym"
            ? gymSubscriptionData
            : yogaSubscriptionData;

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [planFilter, setPlanFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedSubscription, setSelectedSubscription] =
        useState(null);

    const itemsPerPage = 6;

    // --------------------------------------------------
    // Filter
    // --------------------------------------------------

    const filteredSubscriptions = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return subscriptions.filter((subscription) => {
            const matchesSearch =
                subscription.member
                    .toLowerCase()
                    .includes(search) ||
                subscription.email
                    .toLowerCase()
                    .includes(search) ||
                subscription.paymentId
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === "All" ||
                subscription.status === statusFilter;

            const matchesPlan =
                planFilter === "All" ||
                subscription.plan === planFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPlan
            );
        });
    }, [
        subscriptions,
        searchTerm,
        statusFilter,
        planFilter,
    ]);

    // --------------------------------------------------
    // Pagination
    // --------------------------------------------------

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredSubscriptions.length / itemsPerPage
        )
    );

    const paginatedSubscriptions =
        filteredSubscriptions.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    const activeSubscriptions = subscriptions.filter(
        (item) => item.status === "Active"
    ).length;

    const expiredSubscriptions = subscriptions.filter(
        (item) => item.status === "Expired"
    ).length;

    const totalRevenue = subscriptions.reduce(
        (total, item) => total + item.amount,
        0
    );

    const summaryCards = [
        {
            title: "Total Subscriptions",
            value: subscriptions.length,
            icon: <CreditCard size={22} />,
            bg: "bg-blue-500",
        },
        {
            title: "Active Subscriptions",
            value: activeSubscriptions,
            icon: <CheckCircle2 size={22} />,
            bg: "bg-green-500",
        },
        {
            title: "Expired",
            value: expiredSubscriptions,
            icon: <Clock3 size={22} />,
            bg: "bg-orange-500",
        },
        {
            title: "Subscription Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: <IndianRupee size={22} />,
            bg: "bg-purple-500",
        },
    ];

    // --------------------------------------------------
    // Status Badge
    // --------------------------------------------------

    const getStatusStyle = (status) => {
        if (status === "Active") {
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
        }

        if (status === "Expired") {
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
        }

        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    };

    return (
        <div className="min-h-screen space-y-6 p-4 md:p-6 dark:bg-darkTheme-bg">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                    {currentMode === "gym"
                        ? "Gym Subscriptions"
                        : "Yoga Subscriptions"}
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                    {currentMode === "gym"
                        ? "Manage all gym member subscriptions."
                        : "Manage all yoga member subscriptions."}
                </p>
            </div>

            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {summaryCards.map((card, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-darkTheme-border dark:bg-darkTheme-card"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-darkTheme-muted">
                                    {card.title}
                                </p>

                                <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                    {card.value}
                                </p>
                            </div>

                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg ${card.bg}`}
                            >
                                {card.icon}
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {/* ==================================================
                ACCESS INFO
            ================================================== */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                        <ShieldCheck size={21} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                            Premium Video Access
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                            Members with an active subscription can access
                            premium workout videos. Demo videos remain free
                            for all users.
                        </p>
                    </div>

                </div>

            </div>

            {/* ==================================================
                SEARCH & FILTER
            ================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5 dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="flex flex-col gap-4 lg:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search member, email or payment ID..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        />

                    </div>

                    {/* Plan */}

                    <div className="relative lg:w-48">

                        <CreditCard
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <select
                            value={planFilter}
                            onChange={(e) => {
                                setPlanFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        >
                            <option value="All">
                                All Plans
                            </option>
                            <option value="Monthly">
                                Monthly
                            </option>
                            <option value="Quarterly">
                                Quarterly
                            </option>
                            <option value="Yearly">
                                Yearly
                            </option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                    </div>

                    {/* Status */}

                    <div className="relative lg:w-48">

                        <Filter
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        >
                            <option value="All">
                                All Status
                            </option>
                            <option value="Active">
                                Active
                            </option>
                            <option value="Expired">
                                Expired
                            </option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                    </div>

                </div>

            </div>

            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-50 dark:bg-darkTheme-border/30">

                            <tr className="text-left text-gray-500 dark:text-darkTheme-muted">

                                <th className="px-5 py-4 font-semibold">
                                    Member
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Plan
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Start Date
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Expiry Date
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Amount
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center font-semibold">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paginatedSubscriptions.length > 0 ? (

                                paginatedSubscriptions.map(
                                    (subscription) => (

                                        <tr
                                            key={subscription.id}
                                            className="border-b border-gray-100 transition last:border-none hover:bg-gray-50 dark:border-darkTheme-border dark:hover:bg-darkTheme-border/20"
                                        >

                                            {/* Member */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {subscription.member
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                            {subscription.member}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                                            {subscription.email}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Plan */}

                                            <td className="px-4 py-4">

                                                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                    {subscription.plan}
                                                </span>

                                            </td>

                                            {/* Start */}

                                            <td className="px-4 py-4 text-gray-600 dark:text-darkTheme-muted">
                                                {subscription.startDate}
                                            </td>

                                            {/* Expiry */}

                                            <td className="px-4 py-4 text-gray-600 dark:text-darkTheme-muted">
                                                {subscription.expiryDate}
                                            </td>

                                            {/* Amount */}

                                            <td className="px-4 py-4">

                                                <span className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                    ₹
                                                    {subscription.amount.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                                        subscription.status
                                                    )}`}
                                                >
                                                    {subscription.status}
                                                </span>

                                            </td>

                                            {/* Action */}

                                            <td className="px-5 py-4 text-center">

                                                <button
                                                    onClick={() =>
                                                        setSelectedSubscription(
                                                            subscription
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-600"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center text-gray-500 dark:text-darkTheme-muted"
                                    >
                                        No subscriptions found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                {filteredSubscriptions.length > 0 && (

                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row dark:border-darkTheme-border">

                        <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
                            Showing{" "}
                            {(currentPage - 1) *
                                itemsPerPage +
                                1}{" "}
                            to{" "}
                            {Math.min(
                                currentPage * itemsPerPage,
                                filteredSubscriptions.length
                            )}{" "}
                            of {filteredSubscriptions.length}
                        </span>

                        <div className="flex items-center gap-1">

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.max(p - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-darkTheme-border"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {[...Array(totalPages)].map(
                                (_, index) => {
                                    const page = index + 1;

                                    return (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                setCurrentPage(
                                                    page
                                                )
                                            }
                                            className={`h-9 w-9 rounded-lg text-sm font-medium ${currentPage ===
                                                page
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-600 hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                }
                            )}

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(
                                            p + 1,
                                            totalPages
                                        )
                                    )
                                }
                                disabled={
                                    currentPage === totalPages
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-darkTheme-border"
                            >
                                <ChevronRight size={18} />
                            </button>

                        </div>

                    </div>

                )}

            </div>

            <div className="space-y-4 md:hidden">

                {paginatedSubscriptions.length > 0 ? (
                    paginatedSubscriptions.map((subscription) => (
                        <div
                            key={subscription.id}
                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card"
                        >
                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {subscription.member
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                            {subscription.member}
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            {subscription.email}
                                        </p>
                                    </div>

                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                        subscription.status
                                    )}`}
                                >
                                    {subscription.status}
                                </span>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Plan
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                        {subscription.plan}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Amount
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        ₹
                                        {subscription.amount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Start Date
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                                        {subscription.startDate}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Expiry
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                                        {subscription.expiryDate}
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedSubscription(subscription)
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                            >
                                <Eye size={16} />
                                View Subscription
                            </button>

                        </div>
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-white py-12 text-center text-gray-500 dark:border-darkTheme-border dark:bg-darkTheme-card dark:text-darkTheme-muted">
                        No subscriptions found.
                    </div>
                )}

            </div>
            {/* ==================================================
                VIEW MODAL
            ================================================== */}

            {selectedSubscription && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* Modal Header */}

                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <div>
                                <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                                    Subscription Details
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                    {selectedSubscription.paymentId}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setSelectedSubscription(
                                        null
                                    )
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        {/* Member */}

                        <div className="p-5">

                            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    {selectedSubscription.member
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {
                                            selectedSubscription.member
                                        }
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                        {
                                            selectedSubscription.email
                                        }
                                    </p>
                                </div>

                            </div>

                            {/* Details */}

                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Subscription Plan
                                    </p>

                                    <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                                        {
                                            selectedSubscription.plan
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Amount Paid
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800 dark:text-darkTheme-text">
                                        ₹
                                        {selectedSubscription.amount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-darkTheme-muted">
                                        <CalendarDays size={15} />
                                        <p className="text-xs">
                                            Start Date
                                        </p>
                                    </div>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {
                                            selectedSubscription.startDate
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-darkTheme-muted">
                                        <CalendarDays size={15} />
                                        <p className="text-xs">
                                            Expiry Date
                                        </p>
                                    </div>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {
                                            selectedSubscription.expiryDate
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Payment Method
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {
                                            selectedSubscription.paymentMethod
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Payment ID
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {
                                            selectedSubscription.paymentId
                                        }
                                    </p>

                                </div>

                            </div>

                            {/* Access */}

                            <div
                                className={`mt-4 flex items-center gap-3 rounded-xl p-4 ${selectedSubscription.status ===
                                    "Active"
                                    ? "bg-green-50 dark:bg-green-900/10"
                                    : "bg-red-50 dark:bg-red-900/10"
                                    }`}
                            >

                                {selectedSubscription.status ===
                                    "Active" ? (
                                    <CheckCircle2
                                        size={20}
                                        className="text-green-500"
                                    />
                                ) : (
                                    <XCircle
                                        size={20}
                                        className="text-red-500"
                                    />
                                )}

                                <div>

                                    <p
                                        className={`text-sm font-semibold ${selectedSubscription.status ===
                                            "Active"
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-red-700 dark:text-red-400"
                                            }`}
                                    >
                                        {selectedSubscription.status ===
                                            "Active"
                                            ? "Premium Access Active"
                                            : "Premium Access Expired"}
                                    </p>

                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                        {selectedSubscription.status ===
                                            "Active"
                                            ? "Member can access premium workout videos."
                                            : "Member cannot access premium workout videos."}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end border-t border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <button
                                onClick={() =>
                                    setSelectedSubscription(
                                        null
                                    )
                                }
                                className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Subscription;