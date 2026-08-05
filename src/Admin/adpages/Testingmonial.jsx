import React, { useEffect, useState } from "react";
import {
    Plus,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    X,
    Star,
    Upload,
} from "lucide-react";

const Testingmonial = () => {
    const emptyForm = {
        name: "",
        profession: "",
        rating: 5,
        message: "",
        image: "",
        status: "Active",
    };

    const [testimonials, setTestimonials] = useState([
        {
            id: 1,
            name: "Jessica Brown",
            profession: "Marketing Manager",
            rating: 5,
            message:
                "The trainers are amazing and the classes have completely changed my fitness routine.",
            image: "https://i.pravatar.cc/150?img=47",
            status: "Active",
        },
        {
            id: 2,
            name: "Michael Smith",
            profession: "Software Developer",
            rating: 5,
            message:
                "Great environment, professional trainers and excellent workout programs.",
            image: "https://i.pravatar.cc/150?img=12",
            status: "Active",
        },
        {
            id: 3,
            name: "Sarah Wilson",
            profession: "Designer",
            rating: 4,
            message:
                "I have seen a huge improvement in my strength and overall fitness.",
            image: "https://i.pravatar.cc/150?img=32",
            status: "Inactive",
        },
        {
            id: 4,
            name: "David Miller",
            profession: "Business Owner",
            rating: 5,
            message:
                "Amazing trainers and a very friendly environment. Highly recommended.",
            image: "https://i.pravatar.cc/150?img=11",
            status: "Active",
        },
    ]);

    const [form, setForm] = useState(emptyForm);
    const [selected, setSelected] = useState(null);
    const [modal, setModal] = useState(null);
    const [menu, setMenu] = useState(null);

    /* =========================
       IMAGE UPLOAD
    ========================= */

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    /* =========================
       SUBMIT
    ========================= */

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Please enter client name.");
            return;
        }

        if (!form.profession.trim()) {
            alert("Please enter profession.");
            return;
        }

        if (!form.message.trim()) {
            alert("Please enter testimonial.");
            return;
        }

        if (selected) {
            setTestimonials((prev) =>
                prev.map((item) =>
                    item.id === selected.id
                        ? {
                              ...item,
                              ...form,
                          }
                        : item
                )
            );
        } else {
            setTestimonials((prev) => [
                {
                    ...form,
                    id: Date.now(),
                },
                ...prev,
            ]);
        }

        closeModal();
    };

    /* =========================
       EDIT
    ========================= */

    const handleEdit = (item) => {
        setSelected(item);

        setForm({
            name: item.name,
            profession: item.profession,
            rating: item.rating,
            message: item.message,
            image: item.image,
            status: item.status,
        });

        setModal("form");
        setMenu(null);
    };

    /* =========================
       DELETE
    ========================= */

    const handleDelete = (item) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${item.name}" testimonial?`
        );

        if (!confirmDelete) return;

        setTestimonials((prev) =>
            prev.filter((testimonial) => testimonial.id !== item.id)
        );

        setMenu(null);
    };

    /* =========================
       OPEN ADD MODAL
    ========================= */

    const openAddModal = () => {
        setSelected(null);
        setForm(emptyForm);
        setMenu(null);
        setModal("form");
    };

    /* =========================
       CLOSE MODAL
    ========================= */

    const closeModal = () => {
        setModal(null);
        setSelected(null);
        setForm(emptyForm);
        setMenu(null);
    };

    /* =========================
       ESCAPE KEY
    ========================= */

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 p-3 dark:bg-darkTheme-bg sm:p-4 md:p-6">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">
                    <h1 className="truncate text-xl font-bold text-gray-800 dark:text-darkTheme-text sm:text-2xl">
                        Testimonials
                    </h1>

                    <p className="mt-1 text-xs text-gray-500 dark:text-darkTheme-muted sm:text-sm">
                        Manage client reviews and testimonials
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] sm:w-auto sm:px-5"
                >
                    <Plus size={18} />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {/* =====================================================
                TABLE CONTAINER

                IMPORTANT:
                - Table never changes into cards.
                - Mobile gets horizontal scrolling.
                - min-width keeps table structure intact.
            ====================================================== */}

            <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">

                <div
                    className="w-full overflow-x-auto"
                    style={{
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <table className="w-full min-w-[900px] border-collapse text-left text-sm">

                        {/* TABLE HEADER */}

                        <thead className="bg-gray-50 dark:bg-darkTheme-border/30">
                            <tr className="border-b border-gray-200 dark:border-darkTheme-border">

                                <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Client
                                </th>

                                <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Profession
                                </th>

                                <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Rating
                                </th>

                                <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Testimonial
                                </th>

                                <th className="whitespace-nowrap px-4 py-4 font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Status
                                </th>

                                <th className="whitespace-nowrap px-4 py-4 text-center font-semibold text-gray-600 sm:px-5 dark:text-darkTheme-muted">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        {/* TABLE BODY */}

                        <tbody>

                            {testimonials.length > 0 ? (
                                testimonials.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-100 transition last:border-b-0 hover:bg-gray-50 dark:border-darkTheme-border dark:hover:bg-darkTheme-border/20"
                                    >

                                        {/* CLIENT */}

                                        <td className="px-4 py-4 sm:px-5">
                                            <div className="flex min-w-[210px] items-center gap-3">

                                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-darkTheme-border dark:bg-darkTheme-border/30">

                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                            N/A
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-gray-800 dark:text-darkTheme-text">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-darkTheme-muted">
                                                        Client
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        {/* PROFESSION */}

                                        <td className="whitespace-nowrap px-4 py-4 text-gray-700 sm:px-5 dark:text-darkTheme-text">
                                            {item.profession}
                                        </td>

                                        {/* RATING */}

                                        <td className="px-4 py-4 sm:px-5">
                                            <div className="flex items-center gap-1 whitespace-nowrap">

                                                <Star
                                                    size={15}
                                                    className="fill-yellow-400 text-yellow-400"
                                                />

                                                <span className="font-semibold text-gray-700 dark:text-darkTheme-text">
                                                    {item.rating}/5
                                                </span>

                                            </div>
                                        </td>

                                        {/* TESTIMONIAL */}

                                        <td className="px-4 py-4 sm:px-5">
                                            <p className="max-w-[360px] truncate text-gray-600 dark:text-darkTheme-muted">
                                                "{item.message}"
                                            </p>
                                        </td>

                                        {/* STATUS */}

                                        <td className="px-4 py-4 sm:px-5">
                                            <span
                                                className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                                                    item.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* ACTIONS */}

                                        <td className="relative px-4 py-4 sm:px-5">

                                            <div className="flex justify-center">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setMenu(
                                                            menu === item.id
                                                                ? null
                                                                : item.id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border/30 dark:hover:text-darkTheme-text"
                                                >
                                                    <MoreVertical size={18} />
                                                </button>

                                            </div>

                                            {/* ACTION MENU */}

                                            {menu === item.id && (
                                                <div className="absolute right-3 top-[calc(100%-4px)] z-40 w-36 rounded-xl border border-gray-200 bg-white p-1 text-left shadow-2xl dark:border-darkTheme-border dark:bg-darkTheme-card sm:right-5">

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelected(item);
                                                            setModal("view");
                                                            setMenu(null);
                                                        }}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-darkTheme-text dark:hover:bg-darkTheme-border/30"
                                                    >
                                                        <Eye size={15} />
                                                        View
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-darkTheme-text dark:hover:bg-darkTheme-border/30"
                                                    >
                                                        <Pencil size={15} />
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
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
                                        colSpan="6"
                                        className="px-5 py-12 text-center text-gray-500 dark:text-darkTheme-muted"
                                    >
                                        No testimonials found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

            </div>

            {/* =====================================================
                MOBILE TABLE HINT
            ====================================================== */}

            <p className="mt-2 text-center text-[11px] text-gray-400 sm:hidden">
                ← Swipe horizontally to view the complete table →
            </p>

            {/* =====================================================
                ADD / EDIT MODAL
            ====================================================== */}

            {modal === "form" && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >

                    <div className="my-auto flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* MODAL HEADER */}

                        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-5 sm:py-5 dark:border-darkTheme-border">

                            <div className="min-w-0 pr-3">

                                <h2 className="truncate text-base font-bold text-gray-800 sm:text-lg dark:text-darkTheme-text">
                                    {selected
                                        ? "Edit Testimonial"
                                        : "Add Testimonial"}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500 dark:text-darkTheme-muted">
                                    Add client review details
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="shrink-0 rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border/30 dark:hover:text-darkTheme-text"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* MODAL FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="overflow-y-auto"
                        >

                            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">

                                {/* IMAGE */}

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Client Image
                                    </label>

                                    <div className="flex flex-wrap items-center gap-4">

                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-darkTheme-border dark:bg-darkTheme-border/30">

                                            {form.image ? (
                                                <img
                                                    src={form.image}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-gray-400">
                                                    <Upload size={22} />
                                                </div>
                                            )}

                                        </div>

                                        <label className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text">

                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
                                                className="hidden"
                                            />

                                        </label>

                                    </div>

                                </div>

                                {/* NAME */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Client Name
                                    </label>

                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter client name"
                                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    />

                                </div>

                                {/* PROFESSION */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Profession
                                    </label>

                                    <input
                                        type="text"
                                        value={form.profession}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                profession: e.target.value,
                                            }))
                                        }
                                        placeholder="e.g. Software Developer"
                                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    />

                                </div>

                                {/* RATING */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Rating
                                    </label>

                                    <select
                                        value={form.rating}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                rating: Number(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    >
                                        <option value={5}>
                                            5 Stars
                                        </option>

                                        <option value={4}>
                                            4 Stars
                                        </option>

                                        <option value={3}>
                                            3 Stars
                                        </option>

                                        <option value={2}>
                                            2 Stars
                                        </option>

                                        <option value={1}>
                                            1 Star
                                        </option>
                                    </select>

                                </div>

                                {/* STATUS */}

                                <div>

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Status
                                    </label>

                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    >
                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>
                                    </select>

                                </div>

                                {/* MESSAGE */}

                                <div className="sm:col-span-2">

                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                        Testimonial
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                message: e.target.value,
                                            }))
                                        }
                                        placeholder="Write client testimonial..."
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                    />

                                </div>

                            </div>

                            {/* FORM FOOTER */}

                            <div className="flex flex-col-reverse gap-2 border-t border-gray-200 p-4 sm:flex-row sm:justify-end sm:gap-3 sm:p-5 dark:border-darkTheme-border">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:w-auto dark:bg-darkTheme-border dark:text-darkTheme-text"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                                >
                                    {selected
                                        ? "Update Testimonial"
                                        : "Add Testimonial"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* =====================================================
                VIEW MODAL
            ====================================================== */}

            {modal === "view" && selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >

                    <div className="my-auto max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-darkTheme-card">

                        {/* HEADER */}

                        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-5 dark:border-darkTheme-border">

                            <h2 className="text-base font-bold text-gray-800 sm:text-lg dark:text-darkTheme-text">
                                Testimonial Details
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border/30"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* CONTENT */}

                        <div className="p-4 sm:p-6">

                            <div className="flex items-center gap-3 sm:gap-4">

                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gray-200 sm:h-16 sm:w-16 dark:border-darkTheme-border">

                                    {selected.image ? (
                                        <img
                                            src={selected.image}
                                            alt={selected.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                            N/A
                                        </div>
                                    )}

                                </div>

                                <div className="min-w-0">

                                    <h3 className="truncate font-bold text-gray-800 dark:text-darkTheme-text">
                                        {selected.name}
                                    </h3>

                                    <p className="truncate text-sm text-gray-500 dark:text-darkTheme-muted">
                                        {selected.profession}
                                    </p>

                                    <div className="mt-1 flex items-center gap-1">

                                        <Star
                                            size={15}
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                        <span className="text-sm font-semibold text-gray-700 dark:text-darkTheme-text">
                                            {selected.rating}/5
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* MESSAGE */}

                            <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-darkTheme-border/30">

                                <p className="break-words text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                                    "{selected.message}"
                                </p>

                            </div>

                            {/* STATUS */}

                            <div className="mt-4">

                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                        selected.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {selected.status}
                                </span>

                            </div>

                        </div>

                        {/* FOOTER */}

                        <div className="flex justify-end border-t border-gray-200 p-4 dark:border-darkTheme-border sm:p-5">

                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 sm:w-auto dark:bg-darkTheme-border dark:text-darkTheme-text"
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

export default Testingmonial;