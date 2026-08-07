import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Pencil,
    Trash2,
    Eye,
    X,
    CalendarDays,
    Dumbbell,
    UserRound,
    Clock3,
    Layers,
    CheckCircle2,
} from "lucide-react";
import gymProgramData from "../Data/Gym/programData";
import yogaProgramData from "../Data/Yoga/programData";
import { useSelector } from "react-redux";


const Program = () => {


    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );

    const sourcePrograms =
        currentMode === "gym"
            ? gymProgramData
            : yogaProgramData;

    const [programs, setPrograms] = useState(sourcePrograms);

    const categories = [
        "Strength Training",
        "HIIT & Cardio",
        "Yoga & Flexibility",
        "Zumba",
        "Pilates",
        "Weight Loss",
    ];

    const trainers = [
        "Alex Johnson",
        "Mike Wilson",
        "Sarah Miller",
        "Emma Davis",
    ];

    const levels = ["Beginner", "Intermediate", "Advanced"];

    // ==================================================
    // STATES
    // ==================================================

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [selectedProgram, setSelectedProgram] = useState(null);
    const [editingProgram, setEditingProgram] = useState(null);

    const [openMenu, setOpenMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setPrograms(sourcePrograms);
        setCurrentPage(1);
    }, [currentMode]);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        trainer: "",
        duration: "",
        level: "Beginner",
        access: "Premium",
        description: "",
    });

    // ==================================================
    // FILTER
    // ==================================================

    const filteredPrograms = useMemo(() => {
        const search = searchTerm.toLowerCase().trim();

        return programs.filter((program) => {
            const matchesSearch =
                program.name.toLowerCase().includes(search) ||
                program.category.toLowerCase().includes(search) ||
                program.trainer.toLowerCase().includes(search);

            const matchesCategory =
                categoryFilter === "All" ||
                program.category === categoryFilter;

            const matchesStatus =
                statusFilter === "All" ||
                program.status === statusFilter;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [
        programs,
        searchTerm,
        categoryFilter,
        statusFilter,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPrograms.length / itemsPerPage)
    );
    const paginatedPrograms = filteredPrograms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ==================================================
    // SUMMARY
    // ==================================================

    const activePrograms = programs.filter(
        (program) => program.status === "Active"
    ).length;

    const premiumPrograms = programs.filter(
        (program) => program.access === "Premium"
    ).length;

    const totalWorkouts = programs.reduce(
        (total, program) => total + program.workouts,
        0
    );

    // ==================================================
    // FORM
    // ==================================================

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            category: "",
            trainer: "",
            duration: "",
            level: "Beginner",
            access: "Premium",
            description: "",
        });

        setEditingProgram(null);
    };

    const handleCreateProgram = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.duration) {
            return;
        }

        if (editingProgram) {
            setPrograms((prev) =>
                prev.map((program) =>
                    program.id === editingProgram.id
                        ? {
                            ...program,
                            ...formData,
                            duration: Number(formData.duration),
                        }
                        : program
                )
            );
        } else {
            const newProgram = {
                id: Date.now(),
                name: formData.name,
                category: formData.category,
                trainer: formData.trainer || "Not Assigned",
                duration: Number(formData.duration),
                level: formData.level,
                workouts: 0,
                access: formData.access,
                status: "Draft",
                description: formData.description,
            };

            setPrograms((prev) => [newProgram, ...prev]);
        }

        setShowCreateModal(false);
        resetForm();
    };

    // ==================================================
    // EDIT
    // ==================================================

    const handleEdit = (program) => {
        setEditingProgram(program);

        setFormData({
            name: program.name,
            category: program.category,
            trainer: program.trainer,
            duration: program.duration,
            level: program.level,
            access: program.access,
            description: program.description,
        });

        setShowCreateModal(true);
        setOpenMenu(null);
    };

    // ==================================================
    // DELETE
    // ==================================================

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this program?"
        );

        if (!confirmed) return;

        setPrograms((prev) =>
            prev.filter((program) => program.id !== id)
        );

        setOpenMenu(null);
    };

    // ==================================================
    // STATUS STYLE
    // ==================================================

    const getStatusStyle = (status) => {
        if (status === "Active") {
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
        }

        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    };

    // ==================================================
    // ACCESS STYLE
    // ==================================================

    const getAccessStyle = (access) => {
        if (access === "Premium") {
            return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
        }

        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    };

    return (
        <div className="min-h-screen w-full min-w-0 max-w-full space-y-6 p-3 sm:p-4 md:p-6">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                        {currentMode === "gym"
                            ? "Gym Program"
                            : "Yoga Program"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                        {currentMode === "gym"
                            ? "Manage all gym Program ."
                            : "Manage all yoga Program ."}
                    </p>
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setShowCreateModal(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 sm:w-auto"
                >
                    <Plus size={18} />
                    Create Program
                </button>

            </div>

            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                Total Programs
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                {programs.length}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white">
                            <Layers size={21} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                Active Programs
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                {activePrograms}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white">
                            <CheckCircle2 size={21} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                Premium Programs
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                {premiumPrograms}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500 text-white">
                            <Dumbbell size={21} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500 dark:text-darkTheme-muted">
                                Workout Videos
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-darkTheme-text">
                                {totalWorkouts}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white">
                            <CalendarDays size={21} />
                        </div>

                    </div>

                </div>

            </div>

            {/* ==================================================
                INFO
            ================================================== */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">

                <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
                        <Dumbbell size={19} />
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                            Structured Workout Programs
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                            Create programs such as 7-Day, 30-Day or
                            60-Day workout journeys. Existing workout
                            videos can be arranged into weeks and days
                            inside each program.
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
                            placeholder="Search programs..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        />

                    </div>

                    {/* Category */}

                    <div className="relative lg:w-56">

                        <select
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        >
                            <option value="All">
                                All Categories
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                    </div>

                    {/* Status */}

                    <div className="relative lg:w-44">

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="Active">
                                Active
                            </option>

                            <option value="Draft">
                                Draft
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

            <div className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div className="w-full max-w-full overflow-x-auto overscroll-x-contain [touch-action:pan-x]">

                    <table className="min-w-[1050px] w-full text-sm">

                        <thead className="bg-gray-50 dark:bg-darkTheme-border/30">

                            <tr className="text-left text-gray-500 dark:text-darkTheme-muted">

                                <th className="px-5 py-4 font-semibold">
                                    Program
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Category
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Trainer
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Duration
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Level
                                </th>

                                <th className="px-4 py-4 font-semibold">
                                    Access
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

                            {paginatedPrograms.length > 0 ? (
                                paginatedPrograms.map((program) => (
                                    <tr
                                        key={program.id}
                                        className="border-b border-gray-100 last:border-none hover:bg-gray-50 dark:border-darkTheme-border dark:hover:bg-darkTheme-border/20"
                                    >

                                        {/* Program */}

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                    <Dumbbell size={19} />
                                                </div>

                                                <div>

                                                    <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                                        {program.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                                        {program.workouts} workouts
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Category */}

                                        <td className="px-4 py-4 text-gray-600 dark:text-darkTheme-muted">
                                            {program.category}
                                        </td>

                                        {/* Trainer */}

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <UserRound
                                                    size={16}
                                                    className="text-gray-400"
                                                />

                                                <span className="text-gray-700 dark:text-darkTheme-text">
                                                    {program.trainer}
                                                </span>

                                            </div>

                                        </td>

                                        {/* Duration */}

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2 text-gray-600 dark:text-darkTheme-muted">

                                                <Clock3 size={15} />

                                                {program.duration} Days

                                            </div>

                                        </td>

                                        {/* Level */}

                                        <td className="px-4 py-4">

                                            <span className="text-gray-700 dark:text-darkTheme-text">
                                                {program.level}
                                            </span>

                                        </td>

                                        {/* Access */}

                                        <td className="px-4 py-4">

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getAccessStyle(
                                                    program.access
                                                )}`}
                                            >
                                                {program.access}
                                            </span>

                                        </td>

                                        {/* Status */}

                                        <td className="px-4 py-4">

                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                                    program.status
                                                )}`}
                                            >
                                                {program.status}
                                            </span>

                                        </td>

                                        {/* Action */}

                                        <td className="relative px-5 py-4 text-center">

                                            <button
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            program.id
                                                            ? null
                                                            : program.id
                                                    )
                                                }
                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {openMenu === program.id && (
                                                <div className="absolute right-5 top-12 z-20 w-36 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl dark:border-darkTheme-border dark:bg-darkTheme-card">

                                                    <button
                                                        onClick={() => {
                                                            setSelectedProgram(
                                                                program
                                                            );
                                                            setShowViewModal(
                                                                true
                                                            );
                                                            setOpenMenu(null);
                                                        }}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-darkTheme-text dark:hover:bg-darkTheme-border"
                                                    >
                                                        <Eye size={15} />
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                program
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-darkTheme-text dark:hover:bg-darkTheme-border"
                                                    >
                                                        <Pencil size={15} />
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                program.id
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 size={15} />
                                                        Delete
                                                    </button>

                                                </div>
                                            )}

                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-5 py-14 text-center text-gray-500 dark:text-darkTheme-muted"
                                    >
                                        No programs found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                {filteredPrograms.length > 0 && (
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-4 py-4 sm:flex-row dark:border-darkTheme-border">
                        <span className="text-sm text-gray-500 dark:text-darkTheme-muted">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPrograms.length)} of {filteredPrograms.length} programs
                        </span>

                        <div className="flex items-center gap-1">
                            <button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-darkTheme-border">
                                <ChevronLeft size={18} />
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`h-9 w-9 rounded-lg text-sm font-medium ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"}`}>
                                    {page}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-darkTheme-border">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* ==================================================
                MOBILE CARDS
            ================================================== */}

            <div className="hidden">

                {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((program) => (
                        <div
                            key={program.id}
                            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Dumbbell size={19} />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                            {program.name}
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            {program.category}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        setOpenMenu(
                                            openMenu === program.id
                                                ? null
                                                : program.id
                                        )
                                    }
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                                >
                                    <MoreVertical size={18} />
                                </button>

                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Duration
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {program.duration} Days
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Workouts
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {program.workouts}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Level
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {program.level}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Access
                                    </p>

                                    <span
                                        className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${getAccessStyle(
                                            program.access
                                        )}`}
                                    >
                                        {program.access}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-4 flex gap-2">

                                <button
                                    onClick={() => {
                                        setSelectedProgram(program);
                                        setShowViewModal(true);
                                    }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
                                >
                                    <Eye size={16} />
                                    View
                                </button>

                                <button
                                    onClick={() =>
                                        handleEdit(program)
                                    }
                                    className="rounded-xl border border-gray-200 px-4 text-gray-600 hover:bg-gray-50 dark:border-darkTheme-border dark:text-darkTheme-muted dark:hover:bg-darkTheme-border"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(program.id)
                                    }
                                    className="rounded-xl border border-red-100 px-4 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 size={16} />
                                </button>

                            </div>

                        </div>
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-white py-12 text-center text-gray-500 dark:border-darkTheme-border dark:bg-darkTheme-card dark:text-darkTheme-muted">
                        No programs found.
                    </div>
                )}

            </div>

            {/* ==================================================
                CREATE / EDIT MODAL
            ================================================== */}

            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

                    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                    {editingProgram
                                        ? "Edit Program"
                                        : "Create Program"}
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                    Create a structured workout journey
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    resetForm();
                                }}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleCreateProgram}
                            className="space-y-5 p-5"
                        >

                            {/* Program Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                    Program Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="e.g. 30-Day Weight Loss"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />

                            </div>

                            {/* Category + Trainer */}

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Category
                                    </label>

                                    <div className="relative">

                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleFormChange}
                                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-9 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                        >
                                            <option value="">
                                                Select Category
                                            </option>

                                            {categories.map(
                                                (category) => (
                                                    <option
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </option>
                                                )
                                            )}

                                        </select>

                                        <ChevronDown
                                            size={16}
                                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                    </div>

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Trainer
                                    </label>

                                    <div className="relative">

                                        <select
                                            name="trainer"
                                            value={formData.trainer}
                                            onChange={handleFormChange}
                                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-9 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                        >
                                            <option value="">
                                                Select Trainer
                                            </option>

                                            {trainers.map(
                                                (trainer) => (
                                                    <option
                                                        key={trainer}
                                                        value={trainer}
                                                    >
                                                        {trainer}
                                                    </option>
                                                )
                                            )}

                                        </select>

                                        <ChevronDown
                                            size={16}
                                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* Duration + Level + Access */}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Duration
                                    </label>

                                    <div className="relative">

                                        <input
                                            type="number"
                                            name="duration"
                                            min="1"
                                            value={formData.duration}
                                            onChange={handleFormChange}
                                            placeholder="30"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-14 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                        />

                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                            Days
                                        </span>

                                    </div>

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Level
                                    </label>

                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleFormChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    >
                                        {levels.map((level) => (
                                            <option
                                                key={level}
                                                value={level}
                                            >
                                                {level}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                        Access
                                    </label>

                                    <select
                                        name="access"
                                        value={formData.access}
                                        onChange={handleFormChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    >
                                        <option value="Free">
                                            Free
                                        </option>

                                        <option value="Premium">
                                            Premium
                                        </option>
                                    </select>

                                </div>

                            </div>

                            {/* Description */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows="4"
                                    placeholder="Describe what members will achieve through this program..."
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />

                            </div>

                            {/* Workout Structure Info */}

                            <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/10">

                                <div className="flex gap-3">

                                    <CalendarDays
                                        size={20}
                                        className="mt-0.5 shrink-0 text-blue-500"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-gray-800 dark:text-darkTheme-text">
                                            Add Workout Schedule
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-darkTheme-muted">
                                            After creating the program,
                                            you can arrange existing
                                            workout videos into weeks
                                            and days.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Buttons */}

                            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-darkTheme-border">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        resetForm();
                                    }}
                                    className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
                                >
                                    {editingProgram
                                        ? "Update Program"
                                        : "Create Program"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* ==================================================
                VIEW PROGRAM MODAL
            ================================================== */}

            {showViewModal && selectedProgram && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                    Program Details
                                </h2>

                                <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                    {selectedProgram.name}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowViewModal(false)
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-darkTheme-border"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        <div className="space-y-5 p-5">

                            {/* Title */}

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Dumbbell size={24} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-darkTheme-text">
                                        {selectedProgram.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                        {selectedProgram.category}
                                    </p>
                                </div>

                            </div>

                            {/* Stats */}

                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Duration
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedProgram.duration} Days
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Workouts
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedProgram.workouts}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Level
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800 dark:text-darkTheme-text">
                                        {selectedProgram.level}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Access
                                    </p>

                                    <span
                                        className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${getAccessStyle(
                                            selectedProgram.access
                                        )}`}
                                    >
                                        {selectedProgram.access}
                                    </span>
                                </div>

                            </div>

                            {/* Trainer */}

                            <div className="rounded-xl border border-gray-100 p-4 dark:border-darkTheme-border">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-darkTheme-border dark:text-darkTheme-muted">
                                        <UserRound size={18} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                            Trainer
                                        </p>

                                        <p className="mt-0.5 font-semibold text-gray-800 dark:text-darkTheme-text">
                                            {selectedProgram.trainer}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Description */}

                            <div>

                                <h4 className="mb-2 font-semibold text-gray-800 dark:text-darkTheme-text">
                                    About this Program
                                </h4>

                                <p className="text-sm leading-6 text-gray-500 dark:text-darkTheme-muted">
                                    {selectedProgram.description}
                                </p>

                            </div>

                            {/* Workout Schedule */}

                            <div>

                                <div className="mb-3 flex items-center justify-between">

                                    <h4 className="font-semibold text-gray-800 dark:text-darkTheme-text">
                                        Workout Schedule
                                    </h4>

                                    <span className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        {selectedProgram.workouts} Videos
                                    </span>

                                </div>

                                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center dark:border-darkTheme-border dark:bg-darkTheme-border/20">

                                    <CalendarDays
                                        size={28}
                                        className="mx-auto text-gray-400"
                                    />

                                    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Workout schedule will appear here
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Add existing videos to Week 1,
                                        Week 2, Week 3 and so on.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="flex justify-end border-t border-gray-100 px-5 py-4 dark:border-darkTheme-border">

                            <button
                                onClick={() =>
                                    setShowViewModal(false)
                                }
                                className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:bg-darkTheme-border dark:text-darkTheme-text"
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

export default Program;
