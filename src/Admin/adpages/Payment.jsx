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
    CheckCircle2,
    Clock3,
    XCircle,
    IndianRupee,
    Receipt,
    CalendarDays,
} from "lucide-react";
import { useSelector } from "react-redux";

import gymPaymentData from "../Data/Gym/paymentData";
import yogaPaymentData from "../Data/Yoga/paymentData";

const Payment = () => {
    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );

    const payments =
        currentMode === "gym"
            ? gymPaymentData
            : yogaPaymentData;

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [planFilter, setPlanFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const itemsPerPage = 6;

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    const successfulPayments = payments.filter(
        (payment) => payment.status === "Success"
    );

    const pendingPayments = payments.filter(
        (payment) => payment.status === "Pending"
    );

    const failedPayments = payments.filter(
        (payment) =>
            payment.status === "Failed" ||
            payment.status === "Refunded"
    );

    const totalRevenue = successfulPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const summaryCards = [
        {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: <IndianRupee size={21} />,
            bg: "bg-blue-500",
        },
        {
            title: "Successful",
            value: successfulPayments.length,
            icon: <CheckCircle2 size={21} />,
            bg: "bg-green-500",
        },
        {
            title: "Pending",
            value: pendingPayments.length,
            icon: <Clock3 size={21} />,
            bg: "bg-orange-500",
        },
        {
            title: "Failed / Refunded",
            value: failedPayments.length,
            icon: <XCircle size={21} />,
            bg: "bg-red-500",
        },
    ];

    // --------------------------------------------------
    // Filter
    // --------------------------------------------------

    const filteredPayments = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return payments.filter((payment) => {
            const matchesSearch =
                payment.member.toLowerCase().includes(search) ||
                payment.email.toLowerCase().includes(search) ||
                payment.paymentId.toLowerCase().includes(search) ||
                payment.transactionId
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                statusFilter === "All" ||
                payment.status === statusFilter;

            const matchesPlan =
                planFilter === "All" ||
                payment.plan === planFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPlan
            );
        });
    }, [
        payments,
        searchTerm,
        statusFilter,
        planFilter,
    ]);

    // --------------------------------------------------
    // Pagination
    // --------------------------------------------------

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPayments.length / itemsPerPage)
    );

    const paginatedPayments = filteredPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // --------------------------------------------------
    // Status
    // --------------------------------------------------

    const getStatusStyle = (status) => {
        switch (status) {
            case "Success":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

            case "Pending":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";

            case "Failed":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

            case "Refunded":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen space-y-6 p-4 md:p-6 dark:bg-darkTheme-bg">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                    {currentMode === "gym"
                        ? "Gym Payments"
                        : "Yoga Payments"}
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                    {currentMode === "gym"
                        ? "Manage all gym payment transactions."
                        : "Manage all yoga payment transactions."}
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
                PAYMENT INFO
            ================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                        <Receipt size={20} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                            Payment Transactions
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-darkTheme-muted">
                            Track payments made by members for monthly,
                            quarterly and yearly subscription plans.
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
                            placeholder="Search member, payment ID or transaction ID..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        />

                    </div>

                    {/* Plan Filter */}

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

                    {/* Status Filter */}

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

                            <option value="Success">
                                Success
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Failed">
                                Failed
                            </option>

                            <option value="Refunded">
                                Refunded
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
                                    Amount
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Payment Method
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Date
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

                            {paginatedPayments.length > 0 ? (
                                paginatedPayments.map((payment) => (
                                    <tr
                                        key={payment.id}
                                        className="border-b border-gray-100 transition last:border-none hover:bg-gray-50 dark:border-darkTheme-border dark:hover:bg-darkTheme-border/20"
                                    >

                                        {/* Member */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {payment.member
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                        {payment.member}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                                        {payment.email}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        {/* Plan */}

                                        <td className="px-4 py-4">

                                            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                {payment.plan}
                                            </span>

                                        </td>

                                        {/* Amount */}

                                        <td className="px-4 py-4">

                                            <span className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                ₹
                                                {payment.amount.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </td>

                                        {/* Method */}

                                        <td className="px-4 py-4 text-gray-600 dark:text-darkTheme-muted">
                                            {payment.method}
                                        </td>

                                        {/* Date */}

                                        <td className="px-4 py-4 text-gray-600 dark:text-darkTheme-muted">
                                            {payment.date}
                                        </td>

                                        {/* Status */}

                                        <td className="px-4 py-4">

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                                    payment.status
                                                )}`}
                                            >
                                                {payment.status}
                                            </span>

                                        </td>

                                        {/* Action */}

                                        <td className="px-5 py-4 text-center">

                                            <button
                                                onClick={() =>
                                                    setSelectedPayment(
                                                        payment
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-600"
                                            >
                                                <Eye size={14} />
                                                View
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center text-gray-500 dark:text-darkTheme-muted"
                                    >
                                        No payments found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                {filteredPayments.length > 0 && (
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row dark:border-darkTheme-border">

                        <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
                            Showing{" "}
                            {(currentPage - 1) *
                                itemsPerPage +
                                1}{" "}
                            to{" "}
                            {Math.min(
                                currentPage * itemsPerPage,
                                filteredPayments.length
                            )}{" "}
                            of {filteredPayments.length}
                        </span>

                        <div className="flex items-center gap-1">

                            <button
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(page - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-darkTheme-border"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() =>
                                        setCurrentPage(page)
                                    }
                                    className={`h-9 w-9 rounded-lg text-sm font-medium ${currentPage === page
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-600 hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(
                                            page + 1,
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

            {/* ==================================================
                MOBILE CARDS
            ================================================== */}

            <div className="space-y-4 md:hidden">

                {paginatedPayments.length > 0 ? (
                    paginatedPayments.map((payment) => (
                        <div
                            key={payment.id}
                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {payment.member
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                            {payment.member}
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            {payment.email}
                                        </p>
                                    </div>

                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                        payment.status
                                    )}`}
                                >
                                    {payment.status}
                                </span>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Plan
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                        {payment.plan}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Amount
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        ₹
                                        {payment.amount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Method
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                                        {payment.method}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Date
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                                        {payment.date}
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedPayment(payment)
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                            >
                                <Eye size={16} />
                                View Payment
                            </button>

                        </div>
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-white py-12 text-center text-gray-500 dark:border-darkTheme-border dark:bg-darkTheme-card dark:text-darkTheme-muted">
                        No payments found.
                    </div>
                )}

            </div>

            {/* ==================================================
                PAYMENT DETAILS MODAL
            ================================================== */}

            {selectedPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <div>
                                <h2 className="font-bold text-gray-800 dark:text-darkTheme-text">
                                    Payment Details
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                    {selectedPayment.paymentId}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setSelectedPayment(null)
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        <div className="p-5">

                            {/* Member */}

                            <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    {selectedPayment.member
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.member}
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                        {selectedPayment.email}
                                    </p>
                                </div>

                            </div>

                            {/* Amount */}

                            <div className="mt-4 rounded-xl bg-blue-50 p-5 text-center dark:bg-blue-900/10">

                                <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                    Amount Paid
                                </p>

                                <p className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    ₹
                                    {selectedPayment.amount.toLocaleString(
                                        "en-IN"
                                    )}
                                </p>

                            </div>

                            {/* Details */}

                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Plan
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.plan}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Payment Method
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.method}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-darkTheme-muted">
                                        <Receipt size={14} />
                                        <p className="text-xs">
                                            Payment ID
                                        </p>
                                    </div>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.paymentId}
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-darkTheme-muted">
                                        <Receipt size={14} />
                                        <p className="text-xs">
                                            Transaction ID
                                        </p>
                                    </div>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.transactionId}
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <div className="flex items-center gap-2 text-gray-500 dark:text-darkTheme-muted">
                                        <CalendarDays size={14} />
                                        <p className="text-xs">
                                            Payment Date
                                        </p>
                                    </div>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedPayment.date}
                                    </p>

                                </div>

                                <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                            selectedPayment.status
                                        )}`}
                                    >
                                        {selectedPayment.status}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end border-t border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <button
                                onClick={() =>
                                    setSelectedPayment(null)
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

export default Payment;