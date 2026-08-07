import React, { useState } from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    X,
    Upload,
} from "lucide-react";
import { useSelector } from "react-redux";
import gymTrainers from "../Data/Gym/trainerData";
import yogaTrainers from "../Data/Yoga/trainerData";
import { useEffect } from "react";


const Trainers = () => {
    const currentMode = useSelector(
        (state) => state.mode.currentMode
    );
    const emptyForm = {
        name: "",
        profession: "",
        experience: "",
        specialization: "",
        phone: "",
        email: "",
        status: "Active",
        image: "",
        bio: "",
    };
    const [trainers, setTrainers] = useState(
        currentMode === "gym" ? gymTrainers : yogaTrainers
    );
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(null);
    const [selected, setSelected] = useState(null);
    const [menu, setMenu] = useState(null);

    const filteredTrainers = trainers.filter((trainer) =>
        `${trainer.name} ${trainer.profession} ${trainer.specialization}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        setTrainers(currentMode === "gym" ? gymTrainers : yogaTrainers);
    }, [currentMode]);

    const closeModal = () => {
        setModal(null);
        setSelected(null);
        setForm(emptyForm);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.profession || !form.specialization) {
            return;
        }

        if (selected) {
            setTrainers((prev) =>
                prev.map((trainer) =>
                    trainer.id === selected.id
                        ? { ...trainer, ...form }
                        : trainer
                )
            );
        } else {
            setTrainers((prev) => [
                {
                    ...form,
                    id: Date.now(),
                },
                ...prev,
            ]);
        }

        closeModal();
    };

    const handleEdit = (trainer) => {
        setSelected(trainer);
        setForm(trainer);
        setModal("form");
        setMenu(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this trainer?")) {
            setTrainers((prev) =>
                prev.filter((trainer) => trainer.id !== id)
            );
        }

        setMenu(null);
    };

    return (
        <div className="min-h-screen space-y-5 bg-gray-50 p-4 md:p-6 dark:bg-darkTheme-bg">

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                     <h1 className="text-2xl font-bold text-gray-800 dark:text-darkTheme-text md:text-3xl">
                        {currentMode === "gym"
                            ? "Gym Trainers"
                            : "Yoga Trainers"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                        {currentMode === "gym"
                            ? "Manage all Trainers"
                            : "Manage all Trainers"}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setForm(emptyForm);
                        setSelected(null);
                        setModal("form");
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Trainer
                </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">
                <div className="relative max-w-md">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search trainers..."
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-darkTheme-border dark:bg-darkTheme-card">
                <table className="min-w-[1050px] w-full text-left text-sm">

                    <thead className="bg-gray-50 dark:bg-darkTheme-border/30">
                        <tr className="text-gray-600 dark:text-darkTheme-muted">
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Trainer
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Profession
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Experience
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Specialization
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Contact
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Status
                            </th>

                            <th className="whitespace-nowrap px-5 py-4 text-center font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTrainers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-5 py-10 text-center text-gray-500 dark:text-darkTheme-muted"
                                >
                                    No trainers found
                                </td>
                            </tr>
                        ) : (
                            filteredTrainers.map((trainer) => (
                                <tr
                                    key={trainer.id}
                                    className="border-t border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-darkTheme-border dark:text-darkTheme-text dark:hover:bg-darkTheme-border/20"
                                >
                                    {/* Trainer */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    trainer.image ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                alt={trainer.name}
                                                className="h-11 w-11 shrink-0 rounded-full object-cover"
                                            />

                                            <div>
                                                <p className="whitespace-nowrap font-semibold text-gray-800 dark:text-darkTheme-text">
                                                    {trainer.name}
                                                </p>

                                                <p className="whitespace-nowrap text-xs text-gray-500 dark:text-darkTheme-muted">
                                                    {trainer.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Profession */}
                                    <td className="whitespace-nowrap px-5 py-4">
                                        {trainer.profession}
                                    </td>

                                    {/* Experience */}
                                    <td className="whitespace-nowrap px-5 py-4">
                                        {trainer.experience}
                                    </td>

                                    {/* Specialization */}
                                    <td className="whitespace-nowrap px-5 py-4">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {trainer.specialization}
                                        </span>
                                    </td>

                                    {/* Contact */}
                                    <td className="whitespace-nowrap px-5 py-4">
                                        {trainer.phone}
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4">
                                        <span
                                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${trainer.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {trainer.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="relative px-5 py-4 text-center">
                                        <button
                                            onClick={() =>
                                                setMenu(
                                                    menu === trainer.id
                                                        ? null
                                                        : trainer.id
                                                )
                                            }
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-darkTheme-muted dark:hover:bg-darkTheme-border/30"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {menu === trainer.id && (
                                            <div className="absolute right-5 top-12 z-30 w-32 rounded-xl border border-gray-200 bg-white p-1 text-left shadow-xl dark:border-darkTheme-border dark:bg-darkTheme-card">

                                                <button
                                                    onClick={() => {
                                                        setSelected(trainer);
                                                        setModal("view");
                                                        setMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-darkTheme-border/30"
                                                >
                                                    <Eye size={15} />
                                                    View
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleEdit(trainer)
                                                    }
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-darkTheme-border/30"
                                                >
                                                    <Pencil size={15} />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(trainer.id)
                                                    }
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 size={15} />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add / Edit Modal */}
            {modal === "form" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-darkTheme-card">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-darkTheme-border">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                    {selected
                                        ? "Edit Trainer"
                                        : "Add New Trainer"}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500 dark:text-darkTheme-muted">
                                    Add trainer profile and professional details
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-800 dark:text-darkTheme-muted dark:hover:text-darkTheme-text"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-4 p-5 md:grid-cols-2"
                        >

                            {/* Image Upload */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Trainer Image
                                </label>

                                <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 sm:flex-row dark:border-darkTheme-border">

                                    {form.image ? (
                                        <img
                                            src={form.image}
                                            alt="Preview"
                                            className="h-24 w-24 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-darkTheme-border/30">
                                            <Upload size={25} />
                                        </div>
                                    )}

                                    <div>
                                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text">
                                            <Upload size={16} />
                                            Choose Image

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
                                                className="hidden"
                                            />
                                        </label>

                                        <p className="mt-2 text-xs text-gray-500 dark:text-darkTheme-muted">
                                            JPG, PNG or WEBP
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Full Name
                                </label>

                                <input
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Alex Johnson"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Profession */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Profession
                                </label>

                                <input
                                    value={form.profession}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            profession: e.target.value,
                                        })
                                    }
                                    placeholder="Strength Coach"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Experience
                                </label>

                                <input
                                    value={form.experience}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            experience: e.target.value,
                                        })
                                    }
                                    placeholder="8 Years"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Specialization */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Specialization
                                </label>

                                <select
                                    value={form.specialization}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            specialization: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                >
                                    <option value="">
                                        Select Specialization
                                    </option>
                                    {[
                                        "Strength Training",
                                        "HIIT & Cardio",
                                        "Yoga & Flexibility",
                                        "Zumba",
                                        "Pilates",
                                        "Weight Loss",
                                        "CrossFit",
                                    ].map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Phone
                                </label>

                                <input
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                    placeholder="+91 98765 43210"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="trainer@gym.com"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-darkTheme-text">
                                    About Trainer
                                </label>

                                <textarea
                                    rows="4"
                                    value={form.bio}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            bio: e.target.value,
                                        })
                                    }
                                    placeholder="Write a short description about the trainer..."
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-blue-500 dark:border-darkTheme-border dark:bg-darkTheme-border/30 dark:text-darkTheme-text"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 md:col-span-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    {selected ? "Update Trainer" : "Add Trainer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {modal === "view" && selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-darkTheme-card">

                        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-darkTheme-border">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-darkTheme-text">
                                Trainer Details
                            </h2>

                            <button onClick={closeModal}>
                                <X
                                    size={20}
                                    className="text-gray-500 dark:text-darkTheme-muted"
                                />
                            </button>
                        </div>

                        <div className="p-5">

                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={
                                        selected.image ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt={selected.name}
                                    className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100 dark:ring-darkTheme-border"
                                />

                                <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-darkTheme-text">
                                    {selected.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500 dark:text-darkTheme-muted">
                                    {selected.profession}
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/20">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Experience
                                    </p>

                                    <p className="mt-1 text-sm font-semibold dark:text-darkTheme-text">
                                        {selected.experience || "—"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/20">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Specialization
                                    </p>

                                    <p className="mt-1 text-sm font-semibold dark:text-darkTheme-text">
                                        {selected.specialization || "—"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/20">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-semibold dark:text-darkTheme-text">
                                        {selected.phone || "—"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-3 dark:bg-darkTheme-border/20">
                                    <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${selected.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {selected.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                    Email
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-800 dark:text-darkTheme-text">
                                    {selected.email || "—"}
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-gray-500 dark:text-darkTheme-muted">
                                    About
                                </p>

                                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-darkTheme-muted">
                                    {selected.bio || "No description available."}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 p-5 text-right dark:border-darkTheme-border">
                            <button
                                onClick={closeModal}
                                className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-darkTheme-border dark:text-darkTheme-text"
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

export default Trainers;