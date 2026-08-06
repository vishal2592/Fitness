
import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Filter,
    ChevronDown,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Dumbbell,
    Flame,
    HeartPulse,
    Activity,
    Bike,
    PersonStanding,
    PlayCircle,
    LockKeyhole,
    Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


import gymCategoryData from "../Data/gym/categoryData";
import yogaCategoryData from "../Data/yoga/categoryData";

const Category = () => {

    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );

    const [categories, setCategories] = useState(
        currentMode === "gym"
            ? gymCategoryData
            : yogaCategoryData
    );

    useEffect(() => {
        setCategories(
            currentMode === "gym"
                ? gymCategoryData
                : yogaCategoryData
        );
    }, [currentMode]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const itemsPerPage = 6;

    // --------------------------------------------------
    // Category Icon
    // --------------------------------------------------

    const getCategoryIcon = (icon) => {
        const className = "text-blue-500 dark:text-blue-400";

        switch (icon) {
            case "flame":
                return <Flame size={22} className={className} />;

            case "heart":
                return <HeartPulse size={22} className={className} />;

            case "activity":
                return <Activity size={22} className={className} />;

            case "bike":
                return <Bike size={22} className={className} />;

            case "person":
                return <PersonStanding size={22} className={className} />;

            default:
                return <Dumbbell size={22} className={className} />;
        }
    };

    // --------------------------------------------------
    // Total videos per category
    // --------------------------------------------------

    const getTotalVideos = (category) => {
        return category.demoVideos + category.premiumVideos;
    };

    // --------------------------------------------------
    // Search + Filter
    // --------------------------------------------------

    const filteredCategories = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return categories.filter((category) => {
            const matchesSearch =
                category.name.toLowerCase().includes(search) ||
                category.shortDescription.toLowerCase().includes(search) ||
                category.fullDescription.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "All" ||
                category.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [categories, searchTerm, statusFilter]);

    // --------------------------------------------------
    // Pagination
    // --------------------------------------------------

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCategories.length / itemsPerPage)
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // --------------------------------------------------
    // Delete
    // --------------------------------------------------

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!selectedCategory) return;

        setCategories((prev) =>
            prev.filter(
                (category) => category.id !== selectedCategory.id
            )
        );

        setShowDeleteModal(false);
        setSelectedCategory(null);

        const remaining = filteredCategories.length - 1;
        const newTotalPages = Math.max(
            1,
            Math.ceil(remaining / itemsPerPage)
        );

        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        }
    };

    // --------------------------------------------------
    // Summary
    // --------------------------------------------------

    const totalCategories = categories.length;

    const activeCategories = categories.filter(
        (category) => category.status === "Active"
    ).length;

    const totalDemoVideos = categories.reduce(
        (total, category) => total + category.demoVideos,
        0
    );

    const totalPremiumVideos = categories.reduce(
        (total, category) => total + category.premiumVideos,
        0
    );

    const totalVideos = totalDemoVideos + totalPremiumVideos;

    const summaryCards = [
        {
            title: "Total Categories",
            value: totalCategories,
            icon: <Dumbbell size={22} />,
            color: "bg-blue-500",
        },
        {
            title: "Active Categories",
            value: activeCategories,
            icon: <Activity size={22} />,
            color: "bg-green-500",
        },
        {
            title: "Demo Videos",
            value: totalDemoVideos,
            icon: <PlayCircle size={22} />,
            color: "bg-orange-500",
        },
        {
            title: "Premium Videos",
            value: totalPremiumVideos,
            icon: <LockKeyhole size={22} />,
            color: "bg-purple-500",
        },
    ];

    return (
        <div className="min-h-screen space-y-6 p-4 md:p-6 dark:bg-darkTheme-bg">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {currentMode === "gym"
                            ? "Gym Categories"
                            : "Yoga Categories"}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Manage {currentMode} categories and their videos.
                    </p>
                </div>

                <Link
                    to="/admin/create-category"
                    className="flex w-fit items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-600"
                >
                    <Plus size={20} />
                    Add Category
                </Link>
            </div>

            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

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
                                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg ${card.color}`}
                            >
                                {card.icon}
                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {/* ==================================================
                TOTAL VIDEO INFO
            ================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="flex items-center gap-2">
                            <Video
                                size={20}
                                className="text-blue-500"
                            />

                            <h2 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                Video Library
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                            All workout videos are linked with their respective categories.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                            <PlayCircle size={14} />
                            {totalDemoVideos} Demo
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                            <LockKeyhole size={14} />
                            {totalPremiumVideos} Premium
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                            <Video size={14} />
                            {totalVideos} Total
                        </span>

                    </div>

                </div>

            </div>

            {/* ==================================================
                SEARCH + FILTER
            ================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5 dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="flex flex-col gap-4 md:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted"
                        />

                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text dark:placeholder:text-darkTheme-muted"
                        />

                    </div>

                    {/* Status */}

                    <div className="relative md:w-48">

                        <Filter
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-darkTheme-muted"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
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
                                    Category
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Description
                                </th>

                                <th className="px-4 py-4 text-center font-semibold">
                                    Total
                                </th>

                                <th className="px-4 py-4 text-center font-semibold">
                                    Demo
                                </th>

                                <th className="px-4 py-4 text-center font-semibold">
                                    Premium
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-center font-semibold">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paginatedCategories.length > 0 ? (

                                paginatedCategories.map((category) => (

                                    <tr
                                        key={category.id}
                                        className="border-b border-gray-100 transition last:border-none hover:bg-gray-50 dark:border-darkTheme-border dark:hover:bg-darkTheme-border/20"
                                    >

                                        {/* Category */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                                    {getCategoryIcon(category.icon)}
                                                </div>

                                                <div>

                                                    <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                        {category.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                                        {category.shortDescription}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Description */}

                                        <td className="max-w-xs px-5 py-4">

                                            <p className="line-clamp-2 text-gray-600 dark:text-darkTheme-muted">
                                                {category.fullDescription}
                                            </p>

                                        </td>

                                        {/* Total */}

                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1 font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                {getTotalVideos(category)}
                                            </span>

                                        </td>

                                        {/* Demo */}

                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1 font-semibold text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                                                <PlayCircle size={14} />
                                                {category.demoVideos}
                                            </span>

                                        </td>

                                        {/* Premium */}

                                        <td className="px-4 py-4 text-center">

                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 font-semibold text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                                <LockKeyhole size={14} />
                                                {category.premiumVideos}
                                            </span>

                                        </td>

                                        {/* Status */}

                                        <td className="px-4 py-4">

                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${category.status === "Active"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                    }`}
                                            >
                                                {category.status}
                                            </span>

                                        </td>

                                        {/* Actions */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center justify-center gap-2">

                                                <Link
                                                    to={`/admin/videos?category=${category.id}`}
                                                    className="flex items-center gap-1.5 rounded-lg bg-purple-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-purple-600"
                                                >
                                                    <Video size={14} />
                                                    Videos
                                                </Link>

                                                <Link
                                                    to={`/admin/edit-category/${category.id}`}
                                                    className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-600"
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(category)
                                                    }
                                                    className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center text-gray-500 dark:text-darkTheme-muted"
                                    >
                                        No categories found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Desktop Pagination */}

                {filteredCategories.length > 0 && (

                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row dark:border-darkTheme-border">

                        <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
                            Showing{" "}
                            {(currentPage - 1) * itemsPerPage + 1}{" "}
                            to{" "}
                            {Math.min(
                                currentPage * itemsPerPage,
                                filteredCategories.length
                            )}{" "}
                            of {filteredCategories.length} categories
                        </span>

                        <div className="flex items-center gap-1">

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.max(p - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {[...Array(totalPages)].map((_, index) => {

                                const page = index + 1;

                                return (
                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`h-9 w-9 rounded-lg text-sm font-medium transition ${currentPage === page
                                            ? "bg-blue-500 text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(p + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-40 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
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

                {paginatedCategories.length > 0 ? (

                    paginatedCategories.map((category) => (

                        <div
                            key={category.id}
                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card"
                        >

                            {/* Header */}

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                        {getCategoryIcon(category.icon)}
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                            {category.name}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                            {category.shortDescription}
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${category.status === "Active"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                        }`}
                                >
                                    {category.status}
                                </span>

                            </div>

                            {/* Description */}

                            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                                {category.fullDescription}
                            </p>

                            {/* Video Stats */}

                            <div className="mt-4 grid grid-cols-3 gap-2">

                                <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-900/10">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Total
                                    </p>

                                    <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                                        {getTotalVideos(category)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-orange-50 p-3 dark:bg-orange-900/10">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Demo
                                    </p>

                                    <p className="mt-1 font-semibold text-orange-600 dark:text-orange-400">
                                        {category.demoVideos}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-purple-50 p-3 dark:bg-purple-900/10">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Premium
                                    </p>

                                    <p className="mt-1 font-semibold text-purple-600 dark:text-purple-400">
                                        {category.premiumVideos}
                                    </p>
                                </div>

                            </div>

                            {/* Actions */}

                            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 dark:border-darkTheme-border">

                                <Link
                                    to={`/admin/videos?category=${category.id}`}
                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-purple-500 px-2 py-2.5 text-xs font-medium text-white transition hover:bg-purple-600"
                                >
                                    <Video size={14} />
                                    Videos
                                </Link>

                                <Link
                                    to={`/admin/edit-category/${category.id}`}
                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-2 py-2.5 text-xs font-medium text-white transition hover:bg-blue-600"
                                >
                                    <Edit size={14} />
                                    Edit
                                </Link>

                                <button
                                    onClick={() =>
                                        handleDelete(category)
                                    }
                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-red-500 px-2 py-2.5 text-xs font-medium text-white transition hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="rounded-2xl border border-gray-100 bg-white py-10 text-center text-gray-500 dark:border-darkTheme-border dark:bg-darkTheme-card dark:text-darkTheme-muted">
                        No categories found.
                    </div>

                )}

                {/* Mobile Pagination */}

                {filteredCategories.length > 0 && (

                    <div className="flex items-center justify-between px-2 py-3">

                        <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
                            Page {currentPage} of {totalPages}
                        </span>

                        <div className="flex gap-1">

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.max(p - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-darkTheme-border"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(p + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-darkTheme-border"
                            >
                                <ChevronRight size={18} />
                            </button>

                        </div>

                    </div>

                )}

            </div>

            {/* ==================================================
                DELETE MODAL
            ================================================== */}

            {showDeleteModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-darkTheme-border dark:bg-darkTheme-card">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            <Trash2 size={22} />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                            Delete Category?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">

                            Are you sure you want to delete{" "}

                            <strong className="text-gray-800 dark:text-darkTheme-text">
                                {selectedCategory?.name}
                            </strong>

                            ?

                            <br />

                            <span className="text-red-500">
                                This will also affect the videos associated with this category.
                            </span>

                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedCategory(null);
                                }}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Category;

